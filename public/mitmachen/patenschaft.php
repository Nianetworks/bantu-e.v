<?php
/**
 * Bantu e.V.: sponsorship request handler for "Education into the Future" (decision of the chair, 09.11.2026).
 *
 * The website is static; this is its second and last server-side script, built like shop/bestellung.php.
 * .htaccess lets through POST requests over HTTPS to exactly this file. The script
 *   - checks every field, rejects bots (honeypot, minimum fill time) and limits requests per visitor,
 *   - gives the request a short reference,
 *   - e-mails the request to info@bantu-ev.org and a confirmation to the sponsor,
 *   - keeps a backup line outside the web root (../bantu-patenschaften/patenschaften.jsonl, readable only by the account),
 *   - answers with a confirmation (JSON for the page script, a simple HTML page without JavaScript).
 * No payment data is collected: Bantu e.V. sends the bank details by e-mail; a standing order is set up by the sponsor.
 * Written for PHP 7.4 and newer.
 */
declare(strict_types=1);

const ORG_MAIL = 'info@bantu-ev.org';
const MAX_BODY = 12000;    // bytes
const MIN_DWELL_MS = 4000; // a person needs at least this long to fill the form
const RATE_MAX = 3;        // requests per visitor ...
const RATE_WINDOW = 900;   // ... per 15 minutes

date_default_timezone_set('Europe/Berlin');
if (!function_exists('mb_strlen')) { function mb_strlen($s, $enc = null) { return (int) preg_match_all('/./us', (string) $s); } }

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

$wantsJson = stripos((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json') !== false;
$lang = in_array($_POST['lang'] ?? '', ['de', 'en', 'fr'], true) ? (string) $_POST['lang'] : 'de';

/* ---------- texts ---------- */
$T = [
  'de' => [
    'err' => [
      'method' => 'Bitte nutzen Sie das Formular auf unserer Website.',
      'size' => 'Ihre Angaben sind zu lang.',
      'spam' => 'Ihre Anfrage konnte nicht angenommen werden. Bitte versuchen Sie es noch einmal.',
      'rate' => 'Sie haben in kurzer Zeit mehrere Anfragen abgeschickt. Bitte warten Sie einige Minuten.',
      'amount' => 'Bitte wählen Sie einen Betrag oder geben Sie einen eigenen Betrag zwischen 5 und 10.000 Euro ein.',
      'choice' => 'Bitte treffen Sie eine Auswahl.',
      'name' => 'Bitte geben Sie Ihren Namen an.',
      'email' => 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'address' => 'Für die Zuwendungsbestätigung brauchen wir Ihre vollständige Postanschrift.',
      'consent' => 'Bitte bestätigen Sie, dass wir Ihre Angaben zur Bearbeitung verwenden dürfen.',
      'text' => 'Bitte kürzen Sie Ihre Nachricht.',
      'server' => 'Ihre Anfrage konnte leider nicht gespeichert werden. Bitte schreiben Sie uns an ' . ORG_MAIL . '.',
    ],
    'title' => 'Vielen Dank für Ihre Patenschaftsanfrage!',
    'intro' => 'Wir melden uns innerhalb weniger Tage bei Ihnen, bestätigen Förderung und Zahlungsweise und schicken Ihnen die Bankverbindung. Ihre Referenz:',
    'mailNote' => 'Eine Bestätigung haben wir Ihnen auch per E-Mail geschickt.',
    'back' => 'Zurück zur Seite Bildungspatenschaft',
    'subject' => 'Ihre Patenschaftsanfrage bei Bantu e.V.: %s',
    'hello' => 'Guten Tag %s,',
    'thanks' => 'vielen Dank, dass Sie eine Bildungspatenschaft im Programm „Education into the Future“ übernehmen möchten!',
    'summary' => 'Ihre Angaben:',
    'nextSteps' => 'Wir melden uns innerhalb weniger Tage bei Ihnen, bestätigen die Förderung und schicken Ihnen die Bankverbindung für Ihre Überweisung oder Ihren Dauerauftrag. Dieses Formular ist kein Lastschriftmandat.',
    'questions' => 'Fragen? Antworten Sie einfach auf diese E-Mail oder schreiben Sie an ' . ORG_MAIL . '.',
    'regards' => 'Herzliche Grüße',
    'labels' => ['amount' => 'Betrag je Zahlung', 'frequency' => 'Zahlungsrhythmus', 'stage' => 'Bildungsstufe', 'priorities' => 'Weitere Förderinteressen', 'method' => 'Zahlungsweise', 'receipt' => 'Zuwendungsbestätigung', 'updates' => 'Projektinformationen per E-Mail', 'yes' => 'ja', 'no' => 'nein', 'message' => 'Nachricht'],
    'frequencies' => ['monthly' => 'monatlich', 'quarterly' => 'vierteljährlich', 'annually' => 'jährlich', 'once' => 'einmalig'],
    'stages' => ['greatest' => 'Dort, wo die Unterstützung am dringendsten gebraucht wird', 'early' => 'Frühe Bildung (Pearl Kindergarten Kampala)', 'primary' => 'Grundschule und barrierefreies Lernen', 'secondary' => 'Weiterführende Schule (Royal College Namugongo)', 'vocational' => 'Berufliche Ausbildung, Pflege- und Hebammenausbildung'],
    'priorities' => ['costs' => 'Schulgebühren, Materialien, Mahlzeiten, Unterkunft oder Transport', 'accessibility' => 'Barrierefreiheit und Kommunikationsunterstützung', 'menstrual' => 'Menstruationsgesundheit und barrierefreie Sanitäranlagen', 'parents' => 'Weiterlernen und Wiedereinstieg für schwangere Lernende und junge Eltern'],
    'methods' => ['transfer' => 'Überweisung', 'standing' => 'Dauerauftrag', 'discuss' => 'Bitte beraten'],
  ],
  'en' => [
    'err' => [
      'method' => 'Please use the form on our website.',
      'size' => 'Your details are too long.',
      'spam' => 'Your request could not be accepted. Please try again.',
      'rate' => 'You have sent several requests in a short time. Please wait a few minutes.',
      'amount' => 'Please choose an amount or enter your own amount between 5 and 10,000 euros.',
      'choice' => 'Please make a selection.',
      'name' => 'Please enter your name.',
      'email' => 'Please enter a valid e-mail address.',
      'address' => 'For a donation receipt we need your full postal address.',
      'consent' => 'Please confirm that we may use your details to process your request.',
      'text' => 'Please shorten your message.',
      'server' => 'Sorry, your request could not be saved. Please write to us at ' . ORG_MAIL . '.',
    ],
    'title' => 'Thank you for your sponsorship request!',
    'intro' => 'We will get back to you within a few days, confirm the sponsorship and payment arrangements and send you our bank details. Your reference:',
    'mailNote' => 'We have also sent you a confirmation by e-mail.',
    'back' => 'Back to the education sponsorship page',
    'subject' => 'Your sponsorship request with Bantu e.V.: %s',
    'hello' => 'Dear %s,',
    'thanks' => 'thank you for wanting to take on an education sponsorship in our programme “Education into the Future”!',
    'summary' => 'Your details:',
    'nextSteps' => 'We will get back to you within a few days, confirm the sponsorship and send you the bank details for your transfer or standing order. This form is not a direct debit mandate.',
    'questions' => 'Questions? Simply reply to this e-mail or write to ' . ORG_MAIL . '.',
    'regards' => 'Kind regards',
    'labels' => ['amount' => 'Amount per payment', 'frequency' => 'Payment frequency', 'stage' => 'Education stage', 'priorities' => 'Additional priorities', 'method' => 'Payment arrangement', 'receipt' => 'Donation receipt', 'updates' => 'Programme updates by e-mail', 'yes' => 'yes', 'no' => 'no', 'message' => 'Message'],
    'frequencies' => ['monthly' => 'monthly', 'quarterly' => 'quarterly', 'annually' => 'annually', 'once' => 'one-off'],
    'stages' => ['greatest' => 'Where the need is greatest', 'early' => 'Early childhood (Pearl Kindergarten Kampala)', 'primary' => 'Primary and accessible learning', 'secondary' => 'Secondary education (Royal College Namugongo)', 'vocational' => 'Vocational, nursing and midwifery training'],
    'priorities' => ['costs' => 'School fees, materials, meals, boarding or transport', 'accessibility' => 'Disability accessibility and communication support', 'menstrual' => 'Menstrual health and accessible sanitation', 'parents' => 'Continuation or return for pregnant learners and young parents'],
    'methods' => ['transfer' => 'Bank transfer', 'standing' => 'Standing order', 'discuss' => 'Discuss the options with me'],
  ],
  'fr' => [
    'err' => [
      'method' => 'Veuillez utiliser le formulaire de notre site.',
      'size' => 'Vos indications sont trop longues.',
      'spam' => 'Votre demande n’a pas pu être acceptée. Veuillez réessayer.',
      'rate' => 'Vous avez envoyé plusieurs demandes en peu de temps. Veuillez patienter quelques minutes.',
      'amount' => 'Veuillez choisir un montant ou indiquer un montant entre 5 et 10 000 euros.',
      'choice' => 'Veuillez faire un choix.',
      'name' => 'Veuillez indiquer votre nom.',
      'email' => 'Veuillez indiquer une adresse e-mail valide.',
      'address' => 'Pour le reçu fiscal, nous avons besoin de votre adresse postale complète.',
      'consent' => 'Veuillez confirmer que nous pouvons utiliser vos données pour traiter votre demande.',
      'text' => 'Veuillez raccourcir votre message.',
      'server' => 'Votre demande n’a malheureusement pas pu être enregistrée. Écrivez-nous à ' . ORG_MAIL . '.',
    ],
    'title' => 'Merci pour votre demande de parrainage !',
    'intro' => 'Nous vous recontactons sous quelques jours, confirmons le parrainage et le mode de paiement et vous envoyons nos coordonnées bancaires. Votre référence :',
    'mailNote' => 'Nous vous avons aussi envoyé une confirmation par e-mail.',
    'back' => 'Retour à la page du parrainage éducatif',
    'subject' => 'Votre demande de parrainage chez Bantu e.V. : %s',
    'hello' => 'Bonjour %s,',
    'thanks' => 'merci de vouloir prendre un parrainage éducatif dans notre programme « Education into the Future » !',
    'summary' => 'Vos indications :',
    'nextSteps' => 'Nous vous recontactons sous quelques jours, confirmons le parrainage et vous envoyons les coordonnées bancaires pour votre virement ou votre ordre permanent. Ce formulaire n’est pas un mandat de prélèvement.',
    'questions' => 'Des questions ? Répondez simplement à cet e-mail ou écrivez à ' . ORG_MAIL . '.',
    'regards' => 'Cordialement',
    'labels' => ['amount' => 'Montant par versement', 'frequency' => 'Rythme de paiement', 'stage' => 'Étape éducative', 'priorities' => 'Autres priorités', 'method' => 'Mode de paiement', 'receipt' => 'Reçu fiscal', 'updates' => 'Informations par e-mail', 'yes' => 'oui', 'no' => 'non', 'message' => 'Message'],
    'frequencies' => ['monthly' => 'mensuel', 'quarterly' => 'trimestriel', 'annually' => 'annuel', 'once' => 'unique'],
    'stages' => ['greatest' => 'Là où le besoin est le plus grand', 'early' => 'Petite enfance (jardin d’enfants Pearl, Kampala)', 'primary' => 'Primaire et apprentissage accessible', 'secondary' => 'Enseignement secondaire (Royal College Namugongo)', 'vocational' => 'Formation professionnelle, soins infirmiers et obstétricaux'],
    'priorities' => ['costs' => 'Frais de scolarité, matériel, repas, internat ou transport', 'accessibility' => 'Accessibilité et aide à la communication', 'menstrual' => 'Santé menstruelle et sanitaires accessibles', 'parents' => 'Poursuite ou reprise des études pour les élèves enceintes et les jeunes parents'],
    'methods' => ['transfer' => 'Virement', 'standing' => 'Ordre permanent', 'discuss' => 'À discuter'],
  ],
];
$L = $T[$lang];
$PAGE = ['de' => '/mitmachen/bildungspatenschaft/', 'en' => '/en/get-involved/education-sponsorship/', 'fr' => '/fr/s-engager/parrainage-educatif/'];

/* ---------- helpers ---------- */
function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

function line(string $key, int $max): ?string {
  $v = trim((string) ($_POST[$key] ?? ''));
  if ($v === '') return '';
  if (!preg_match('//u', $v) || preg_match('/[\x00-\x1F\x7F]/u', $v) || mb_strlen($v, 'UTF-8') > $max) return null;
  return $v;
}
function block(string $key, int $max): ?string {
  $v = str_replace(["\r\n", "\r"], "\n", trim((string) ($_POST[$key] ?? '')));
  if ($v === '') return '';
  if (!preg_match('//u', $v) || preg_match('/[\x00-\x09\x0B-\x1F\x7F]/u', $v) || mb_strlen($v, 'UTF-8') > $max) return null;
  return preg_replace("/\n{3,}/", "\n\n", $v) ?? $v;
}
/** One of the allowed keys, or null. */
function choice(string $key, array $allowed): ?string {
  $v = (string) ($_POST[$key] ?? '');
  return array_key_exists($v, $allowed) ? $v : null;
}
function money(int $cents, string $lang): string {
  $s = number_format($cents / 100, 2, $lang === 'en' ? '.' : ',', $lang === 'en' ? ',' : '.');
  return ($lang === 'fr' ? str_replace('.', "\u{202F}", $s) : $s) . ' EUR';
}
function parse_amount(string $raw): ?int {
  $v = preg_replace('/\s+|€|EUR/iu', '', $raw) ?? '';
  if (preg_match('/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/', $v)) $v = str_replace('.', '', $v);
  elseif (preg_match('/^\d{1,3}(,\d{3})+(\.\d{1,2})?$/', $v)) $v = str_replace(',', '', $v);
  $v = str_replace(',', '.', $v);
  if (!preg_match('/^(\d{1,6})(?:\.(\d{1,2}))?$/', $v, $m)) return null;
  return (int) $m[1] * 100 + (int) str_pad($m[2] ?? '0', 2, '0');
}
function data_dir(): ?string {
  $root = realpath((string) ($_SERVER['DOCUMENT_ROOT'] ?? '')) ?: realpath(__DIR__ . '/..');
  if (!$root) return null;
  $dir = dirname($root) . '/bantu-patenschaften';
  if (!is_dir($dir) && !@mkdir($dir, 0700, true)) return null;
  return is_writable($dir) ? $dir : null;
}
function rate_limited(?string $dataDir): bool {
  $base = sys_get_temp_dir() . '/bantu-patenschaften-rl';
  if (!is_dir($base) && !@mkdir($base, 0700, true)) return false;
  $salt = 'bantu';
  if ($dataDir) {
    $sf = $dataDir . '/.salt';
    if (!is_file($sf)) @file_put_contents($sf, bin2hex(random_bytes(16)), LOCK_EX);
    $salt = (string) @file_get_contents($sf) ?: $salt;
  }
  $now = time();
  foreach ((array) glob($base . '/*') as $f) { if (is_string($f) && @filemtime($f) < $now - 3600) @unlink($f); }
  $file = $base . '/' . hash('sha256', $salt . (string) ($_SERVER['REMOTE_ADDR'] ?? ''));
  $hits = array_filter((array) json_decode((string) @file_get_contents($file), true), function ($t) use ($now) { return is_int($t) && $t > $now - RATE_WINDOW; });
  if (count($hits) >= RATE_MAX) return true;
  $hits[] = $now;
  @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);
  return false;
}
function send_mail(string $to, string $subject, string $body, string $from, string $replyTo): bool {
  $headers = implode("\r\n", ['From: ' . $from, 'Reply-To: ' . $replyTo, 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: 8bit', 'X-Mailer: bantu-ev.org sponsorship form']);
  $subj = '=?UTF-8?B?' . base64_encode($subject) . '?=';
  $body = str_replace("\n", "\r\n", $body);
  $ok = @mail($to, $subj, $body, $headers, '-f' . ORG_MAIL);
  if (!$ok) $ok = @mail($to, $subj, $body, $headers);
  return (bool) $ok;
}
function respond(int $status, array $data): void {
  global $wantsJson, $L, $lang, $PAGE;
  http_response_code($status);
  if ($wantsJson) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
  }
  header('Content-Type: text/html; charset=utf-8');
  echo '<!doctype html><html lang="' . h($lang) . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Bantu e.V.</title>'
    . '<style>body{font:1.05rem/1.6 system-ui,sans-serif;max-width:40rem;margin:2rem auto;padding:0 1rem;color:#15130f;background:#fbf9f4}.ref{font-size:1.2rem;font-weight:700}a{color:#1d5c2c}</style></head><body>';
  if (!empty($data['ok'])) {
    echo '<h1>' . h($L['title']) . '</h1><p>' . h($L['intro']) . ' <span class="ref">' . h($data['reference']) . '</span></p>';
    foreach ((array) ($data['next'] ?? []) as $n) echo '<p>' . h((string) $n) . '</p>';
  } else {
    echo '<h1>Bantu e.V.</h1><p>' . h((string) ($data['message'] ?? '')) . '</p>';
  }
  echo '<p><a href="' . h($PAGE[$lang]) . '">' . h($L['back']) . '</a></p></body></html>';
  exit;
}
function fail(int $status, string $code): void {
  global $L;
  respond($status, ['ok' => false, 'error' => $code, 'message' => $L['err'][$code] ?? $L['err']['server']]);
}

/* ---------- checks ---------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); fail(405, 'method'); }
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY) fail(413, 'size');
if (trim((string) ($_POST['website'] ?? '')) !== '') fail(400, 'spam');   // honeypot
$dwell = $_POST['dwell'] ?? '';
if ($dwell !== '' && (!preg_match('/^\d{1,9}$/', (string) $dwell) || (int) $dwell < MIN_DWELL_MS)) fail(400, 'spam');

// amount: 25 / 40 / 70 or "other" with a custom value between 5 and 10 000 EUR
$amountChoice = (string) ($_POST['amount'] ?? '');
if (in_array($amountChoice, ['25', '40', '70'], true)) $cents = (int) $amountChoice * 100;
elseif ($amountChoice === 'other') {
  $cents = parse_amount((string) ($_POST['amount_other'] ?? ''));
  if ($cents === null || $cents < 500 || $cents > 1000000) fail(400, 'amount');
} else fail(400, 'amount');
$frequency = choice('frequency', $L['frequencies']); if ($frequency === null) fail(400, 'choice');
$stage = choice('stage', $L['stages']); if ($stage === null) fail(400, 'choice');
$priorities = [];
foreach (array_keys($L['priorities']) as $k) { if (!empty($_POST['priority_' . $k])) $priorities[] = $k; }
$method = choice('method', $L['methods']); if ($method === null) fail(400, 'choice');

$name = line('name', 100); if ($name === null || mb_strlen($name, 'UTF-8') < 2) fail(400, 'name');
$org = line('organisation', 120); if ($org === null) fail(400, 'text');
$email = line('email', 200); if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) fail(400, 'email');
$phone = line('phone', 40); if ($phone === null) fail(400, 'text');
$receipt = !empty($_POST['receipt']);
$address = block('address', 500); if ($address === null) fail(400, 'text');
if ($receipt && mb_strlen($address, 'UTF-8') < 10) fail(400, 'address');
$updates = !empty($_POST['updates']);
$message = block('message', 1500); if ($message === null) fail(400, 'text');
if (empty($_POST['consent'])) fail(400, 'consent');

$dataDir = data_dir();
if (rate_limited($dataDir)) fail(429, 'rate');

/* ---------- request ---------- */
$alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
$code = 'EF-' . date('ym') . '-';
for ($i = 0; $i < 5; $i++) $code .= $alphabet[random_int(0, strlen($alphabet) - 1)];
$amountText = money($cents, $lang);

$summaryRows = function (array $LL, string $lng) use ($cents, $frequency, $stage, $priorities, $method, $receipt, $updates): array {
  $lab = $LL['labels'];
  $c = $lng === 'fr' ? "\u{202F}: " : ': '; // French puts a (narrow no-break) space before the colon
  $rows = [
    $lab['amount'] . $c . money($cents, $lng),
    $lab['frequency'] . $c . $LL['frequencies'][$frequency],
    $lab['stage'] . $c . $LL['stages'][$stage],
  ];
  if ($priorities) $rows[] = $lab['priorities'] . $c . implode('; ', array_map(function ($k) use ($LL) { return $LL['priorities'][$k]; }, $priorities));
  $rows[] = $lab['method'] . $c . $LL['methods'][$method];
  $rows[] = $lab['receipt'] . $c . ($receipt ? $lab['yes'] : $lab['no']);
  $rows[] = $lab['updates'] . $c . ($updates ? $lab['yes'] : $lab['no']);
  return $rows;
};

// 1) backup copy outside the web root
$logged = false;
if ($dataDir) {
  $rec = json_encode([
    'time' => date('c'), 'code' => $code, 'amount' => number_format($cents / 100, 2, '.', ''), 'frequency' => $frequency, 'stage' => $stage, 'priorities' => $priorities,
    'method' => $method, 'name' => $name, 'organisation' => $org, 'email' => $email, 'phone' => $phone, 'receipt' => $receipt, 'address' => $address, 'updates' => $updates, 'message' => $message, 'lang' => $lang,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  $file = $dataDir . '/patenschaften.jsonl';
  $logged = @file_put_contents($file, $rec . "\n", FILE_APPEND | LOCK_EX) !== false;
  if ($logged) @chmod($file, 0600);
}

// 2) to Bantu e.V. (always German)
$orgLines = array_merge(
  ['Neue Patenschaftsanfrage „Education into the Future“ über die Website', '', 'Referenz: ' . $code, ''],
  $summaryRows($T['de'], 'de'),
  ['', 'Name: ' . $name, $org !== '' ? 'Organisation: ' . $org : null, 'E-Mail: ' . $email, $phone !== '' ? 'Telefon: ' . $phone : null, $address !== '' ? "Anschrift:\n" . $address : null, $message !== '' ? "Nachricht:\n" . $message : null,
   '', 'Sprache der Seite: ' . strtoupper($lang) . ' · Eingang: ' . date('d.m.Y H:i'), 'Nächster Schritt: Förderung bestätigen und Bankverbindung schicken (kein Lastschriftmandat).']
);
$orgBody = implode("\n", array_filter($orgLines, function ($v) { return $v !== null; }));
$mailedOrg = send_mail(ORG_MAIL, 'Patenschaftsanfrage ' . $code . ': ' . $name . ', ' . money($cents, 'de') . ' ' . $T['de']['frequencies'][$frequency], $orgBody, 'Bantu e.V. Website <' . ORG_MAIL . '>', $email);
if (!$mailedOrg && !$logged) fail(500, 'server');

// 3) to the sponsor, in the page language
$sponsorBody = implode("\n", array_merge(
  [sprintf($L['hello'], $name), '', $L['thanks'], '', $L['summary']],
  array_map(function ($r) { return '- ' . $r; }, $summaryRows($L, $lang)),
  ['', $L['nextSteps'], '', $L['questions'], '', $L['regards'], 'Bantu e.V.', 'Bantu-Vereinigung für globale Bildung, Gerechtigkeit und Zusammenarbeit e.V.', 'Kameruner Str. 1, 13351 Berlin · Postfach 120344, 10593 Berlin · www.bantu-ev.org']
));
$mailedSponsor = send_mail($email, sprintf($L['subject'], $code), $sponsorBody, 'Bantu e.V. <' . ORG_MAIL . '>', ORG_MAIL);
$next = $mailedSponsor ? [$L['mailNote']] : [];

respond(200, ['ok' => true, 'reference' => $code, 'amount' => $amountText, 'summary' => $summaryRows($L, $lang), 'next' => $next, 'mailed' => $mailedSponsor]);
