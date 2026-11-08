<?php
/**
 * Bantu e.V. – order form handler for the charity shop (symbolic gifts now; goods once switched on).
 *
 * The website is static; this is its only server-side script. .htaccess lets through POST requests over HTTPS
 * to exactly this file and nothing else. The script
 *   - looks the order up in the build-time price list katalog.json next to it (never trusts browser prices),
 *   - checks every field, rejects bots (honeypot, minimum fill time) and limits orders per visitor,
 *   - gives the order a unique, SEPA-safe Verwendungszweck,
 *   - e-mails the order to info@bantu-ev.org and the payment details to the buyer,
 *   - keeps a backup line outside the web root (../bantu-orders/orders.jsonl, readable only by the account),
 *   - answers with the payment details (JSON for the page script, a simple HTML page without JavaScript).
 * Payment is a bank transfer straight to the GLS account; no payment provider, no database, no secrets in this file.
 * Written for PHP 7.4 and newer.
 */
declare(strict_types=1);

const ORG_MAIL = 'info@bantu-ev.org';
const MAX_BODY = 16000;   // bytes
const QTY_MAX = 20;
const MIN_DWELL_MS = 2500; // a person needs at least this long to fill the form
const RATE_MAX = 5;        // orders per visitor ...
const RATE_WINDOW = 600;   // ... per 10 minutes

date_default_timezone_set('Europe/Berlin');
// Fallbacks in case the host's PHP has no mbstring extension.
if (!function_exists('mb_strlen')) { function mb_strlen($s, $enc = null) { return (int) preg_match_all('/./us', (string) $s); } }
if (!function_exists('mb_substr')) { function mb_substr($s, $start, $len = null, $enc = null) { preg_match_all('/./us', (string) $s, $m); return implode('', array_slice($m[0], $start, $len)); } }

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

$product = null;   // set once the order's item is known (used for the "back" link)
$wantsJson = stripos((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json') !== false;
$lang = in_array($_POST['lang'] ?? '', ['de', 'en', 'fr'], true) ? (string) $_POST['lang'] : 'de';

/* ---------- texts ---------- */
$T = [
  'de' => [
    'err' => [
      'method' => 'Bitte nutzen Sie das Bestellformular auf unserer Website.',
      'size' => 'Ihre Angaben sind zu lang.',
      'spam' => 'Ihre Bestellung konnte nicht angenommen werden. Bitte versuchen Sie es noch einmal.',
      'rate' => 'Sie haben in kurzer Zeit mehrere Bestellungen abgeschickt. Bitte warten Sie einige Minuten.',
      'product' => 'Dieses Angebot kann gerade nicht bestellt werden.',
      'amount' => 'Bitte geben Sie einen Betrag zwischen %s und %s Euro ein.',
      'qty' => 'Bitte wählen Sie eine Menge zwischen 1 und ' . QTY_MAX . '.',
      'name' => 'Bitte geben Sie Ihren Namen an.',
      'email' => 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      'address' => 'Bitte geben Sie Ihre vollständige Anschrift an.',
      'text' => 'Bitte kürzen Sie Ihre Nachricht.',
      'server' => 'Ihre Bestellung konnte leider nicht gespeichert werden. Bitte schreiben Sie uns an ' . ORG_MAIL . '.',
    ],
    'title' => 'Vielen Dank! Bitte überweisen Sie jetzt',
    'holder' => 'Empfänger', 'amountL' => 'Betrag', 'ref' => 'Verwendungszweck', 'bankL' => 'Bank',
    'refNote' => 'Bitte übernehmen Sie den Verwendungszweck genau so, damit wir Ihre Zahlung zuordnen können.',
    'giftNext' => 'Ihre Spende ist bestimmt für: %s.',
    'receiptNext' => 'Ihre Zuwendungsbestätigung schicken wir Ihnen nach Eingang der Spende an die angegebene Anschrift.',
    'goodsNext' => 'Wir versenden Ihre Bestellung, sobald Ihre Überweisung bei uns eingegangen ist.',
    'mailNote' => 'Alle Angaben haben wir Ihnen auch per E-Mail geschickt.',
    'back' => 'Zurück zum Shop', 'backGift' => 'Zurück zur Spendenseite',
    'subject' => 'Ihre Bestellung bei Bantu e.V.: %s',
    'hello' => 'Guten Tag %s,',
    'thanksGift' => 'vielen Dank für Ihr Spendengeschenk „%s“!',
    'thanksGoods' => 'vielen Dank für Ihre Bestellung „%s“!',
    'please' => 'Bitte überweisen Sie %s auf unser Konto:',
    'questions' => 'Fragen? Antworten Sie einfach auf diese E-Mail oder schreiben Sie an ' . ORG_MAIL . '.',
    'regards' => 'Herzliche Grüße',
  ],
  'en' => [
    'err' => [
      'method' => 'Please use the order form on our website.',
      'size' => 'Your details are too long.',
      'spam' => 'Your order could not be accepted. Please try again.',
      'rate' => 'You have sent several orders in a short time. Please wait a few minutes.',
      'product' => 'This item cannot be ordered at the moment.',
      'amount' => 'Please enter an amount between %s and %s euros.',
      'qty' => 'Please choose a quantity between 1 and ' . QTY_MAX . '.',
      'name' => 'Please enter your name.',
      'email' => 'Please enter a valid e-mail address.',
      'address' => 'Please enter your full postal address.',
      'text' => 'Please shorten your message.',
      'server' => 'Sorry, your order could not be saved. Please write to us at ' . ORG_MAIL . '.',
    ],
    'title' => 'Thank you! Please make your bank transfer now',
    'holder' => 'Recipient', 'amountL' => 'Amount', 'ref' => 'Payment reference', 'bankL' => 'Bank',
    'refNote' => 'Please use exactly this payment reference so that we can match your payment.',
    'giftNext' => 'Your donation goes to: %s.',
    'receiptNext' => 'Once your donation has arrived, we will send your donation receipt to the address you gave.',
    'goodsNext' => 'We will ship your order as soon as your transfer has arrived.',
    'mailNote' => 'We have also sent you all details by e-mail.',
    'back' => 'Back to the shop', 'backGift' => 'Back to the donation page',
    'subject' => 'Your order with Bantu e.V.: %s',
    'hello' => 'Dear %s,',
    'thanksGift' => 'thank you for your gift donation “%s”!',
    'thanksGoods' => 'thank you for your order “%s”!',
    'please' => 'Please transfer %s to our account:',
    'questions' => 'Questions? Simply reply to this e-mail or write to ' . ORG_MAIL . '.',
    'regards' => 'Kind regards',
  ],
  'fr' => [
    'err' => [
      'method' => 'Veuillez utiliser le formulaire de commande de notre site.',
      'size' => 'Vos indications sont trop longues.',
      'spam' => 'Votre commande n’a pas pu être acceptée. Veuillez réessayer.',
      'rate' => 'Vous avez envoyé plusieurs commandes en peu de temps. Veuillez patienter quelques minutes.',
      'product' => 'Cette offre ne peut pas être commandée pour le moment.',
      'amount' => 'Veuillez indiquer un montant entre %s et %s euros.',
      'qty' => 'Veuillez choisir une quantité entre 1 et ' . QTY_MAX . '.',
      'name' => 'Veuillez indiquer votre nom.',
      'email' => 'Veuillez indiquer une adresse e-mail valide.',
      'address' => 'Veuillez indiquer votre adresse postale complète.',
      'text' => 'Veuillez raccourcir votre message.',
      'server' => 'Votre commande n’a malheureusement pas pu être enregistrée. Écrivez-nous à ' . ORG_MAIL . '.',
    ],
    'title' => 'Merci ! Veuillez effectuer votre virement maintenant',
    'holder' => 'Bénéficiaire', 'amountL' => 'Montant', 'ref' => 'Motif du virement', 'bankL' => 'Banque',
    'refNote' => 'Veuillez reprendre ce motif exactement, afin que nous puissions attribuer votre paiement.',
    'giftNext' => 'Votre don est destiné à : %s.',
    'receiptNext' => 'Dès réception de votre don, nous vous enverrons votre reçu fiscal à l’adresse indiquée.',
    'goodsNext' => 'Nous expédierons votre commande dès réception de votre virement.',
    'mailNote' => 'Nous vous avons aussi envoyé toutes les informations par e-mail.',
    'back' => 'Retour à la boutique', 'backGift' => 'Retour à la page des dons',
    'subject' => 'Votre commande chez Bantu e.V. : %s',
    'hello' => 'Bonjour %s,',
    'thanksGift' => 'merci pour votre don-cadeau « %s » !',
    'thanksGoods' => 'merci pour votre commande « %s » !',
    'please' => 'Veuillez virer %s sur notre compte :',
    'questions' => 'Des questions ? Répondez simplement à cet e-mail ou écrivez à ' . ORG_MAIL . '.',
    'regards' => 'Cordialement',
  ],
];
$L = $T[$lang];

/* ---------- helpers ---------- */
function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

function money(int $cents, string $lang): string {
  $s = number_format($cents / 100, 2, $lang === 'en' ? '.' : ',', $lang === 'en' ? ',' : '.');
  return ($lang === 'fr' ? str_replace('.', "\u{202F}", $s) : $s) . ' EUR';
}

function iban_spaced(string $iban): string { return trim(chunk_split($iban, 4, ' ')); }

/** Only characters every SEPA bank accepts: a-z A-Z 0-9 / - ? : ( ) . , ' + and space. */
function sepa_safe(string $s): string {
  $s = strtr($s, ['ä' => 'ae', 'ö' => 'oe', 'ü' => 'ue', 'Ä' => 'Ae', 'Ö' => 'Oe', 'Ü' => 'Ue', 'ß' => 'ss', 'é' => 'e', 'è' => 'e', 'à' => 'a', 'ç' => 'c']);
  $s = preg_replace("/[^A-Za-z0-9\\/\\-?:().,'+ ]+/", ' ', $s) ?? '';
  return trim(preg_replace('/\s+/', ' ', $s) ?? '');
}

/** Single-line text: valid UTF-8, no control characters, trimmed. Returns null if invalid. */
function line(string $key, int $max): ?string {
  $v = trim((string) ($_POST[$key] ?? ''));
  if ($v === '') return '';
  if (!preg_match('//u', $v) || preg_match('/[\x00-\x1F\x7F]/u', $v) || mb_strlen($v, 'UTF-8') > $max) return null;
  return $v;
}

/** Multi-line text: like line(), but line breaks are kept (normalised to \n). */
function block(string $key, int $max): ?string {
  $v = str_replace(["\r\n", "\r"], "\n", trim((string) ($_POST[$key] ?? '')));
  if ($v === '') return '';
  if (!preg_match('//u', $v) || preg_match('/[\x00-\x09\x0B-\x1F\x7F]/u', $v) || mb_strlen($v, 'UTF-8') > $max) return null;
  return preg_replace("/\n{3,}/", "\n\n", $v) ?? $v;
}

/** "50", "50,5", "50.00", "1.000,00" -> cents, or null. */
function parse_amount(string $raw): ?int {
  $v = preg_replace('/\s+|€|EUR/iu', '', $raw) ?? '';
  if (preg_match('/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/', $v)) $v = str_replace('.', '', $v);       // 1.000,00
  elseif (preg_match('/^\d{1,3}(,\d{3})+(\.\d{1,2})?$/', $v)) $v = str_replace(',', '', $v);    // 1,000.00
  $v = str_replace(',', '.', $v);
  if (!preg_match('/^(\d{1,6})(?:\.(\d{1,2}))?$/', $v, $m)) return null;
  return (int) $m[1] * 100 + (int) str_pad($m[2] ?? '0', 2, '0');
}

function data_dir(): ?string {
  $root = realpath((string) ($_SERVER['DOCUMENT_ROOT'] ?? '')) ?: realpath(__DIR__ . '/..');
  if (!$root) return null;
  $dir = dirname($root) . '/bantu-orders';
  if (!is_dir($dir) && !@mkdir($dir, 0700, true)) return null;
  return is_writable($dir) ? $dir : null;
}

function rate_limited(?string $dataDir): bool {
  $base = sys_get_temp_dir() . '/bantu-orders-rl';
  if (!is_dir($base) && !@mkdir($base, 0700, true)) return false;
  $salt = 'bantu';
  if ($dataDir) {
    $sf = $dataDir . '/.salt';
    if (!is_file($sf)) @file_put_contents($sf, bin2hex(random_bytes(16)), LOCK_EX);
    $salt = (string) @file_get_contents($sf) ?: $salt;
  }
  $now = time();
  foreach ((array) glob($base . '/*') as $f) { if (is_string($f) && @filemtime($f) < $now - 3600) @unlink($f); } // forget after 1 hour
  $file = $base . '/' . hash('sha256', $salt . (string) ($_SERVER['REMOTE_ADDR'] ?? ''));
  $hits = array_filter((array) json_decode((string) @file_get_contents($file), true), function ($t) use ($now) { return is_int($t) && $t > $now - RATE_WINDOW; });
  if (count($hits) >= RATE_MAX) return true;
  $hits[] = $now;
  @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);
  return false;
}

function send_mail(string $to, string $subject, string $body, string $from, string $replyTo): bool {
  $headers = implode("\r\n", [
    'From: ' . $from,
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: bantu-ev.org order form',
  ]);
  $subj = '=?UTF-8?B?' . base64_encode($subject) . '?=';
  $body = str_replace("\n", "\r\n", $body);
  $ok = @mail($to, $subj, $body, $headers, '-f' . ORG_MAIL);
  if (!$ok) $ok = @mail($to, $subj, $body, $headers);
  return (bool) $ok;
}

function respond(int $status, array $data): void {
  global $wantsJson, $L, $lang, $product;
  http_response_code($status);
  if ($wantsJson) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
  }
  // Without JavaScript: a plain page in the visitor's language.
  header('Content-Type: text/html; charset=utf-8');
  $isGiftPage = is_array($product) && ($product['kind'] ?? '') === 'gift';
  $shop = $isGiftPage
    ? ($lang === 'en' ? '/en/donate/' : ($lang === 'fr' ? '/fr/faire-un-don/' : '/spenden/'))
    : ($lang === 'en' ? '/en/shop/' : ($lang === 'fr' ? '/fr/boutique/' : '/shop/'));
  echo '<!doctype html><html lang="' . h($lang) . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Bantu e.V.</title>'
    . '<style>body{font:1.05rem/1.6 system-ui,sans-serif;max-width:40rem;margin:2rem auto;padding:0 1rem;color:#15130f;background:#fbf9f4}dt{font-weight:700;margin-top:.6rem}dd{margin:0}.ref{font-size:1.2rem;font-weight:700}a{color:#1d5c2c}</style></head><body>';
  if (!empty($data['ok'])) {
    echo '<h1>' . h($L['title']) . '</h1><dl>'
      . '<dt>' . h($L['holder']) . '</dt><dd>' . h($data['holder']) . '</dd>'
      . '<dt>IBAN</dt><dd>' . h(iban_spaced($data['iban'])) . '</dd>'
      . '<dt>BIC</dt><dd>' . h($data['bic']) . '</dd>'
      . '<dt>' . h($L['amountL']) . '</dt><dd>' . h($data['amount']) . '</dd>'
      . '<dt>' . h($L['ref']) . '</dt><dd class="ref">' . h($data['reference']) . '</dd></dl>'
      . '<p>' . h($L['refNote']) . '</p>';
    foreach ((array) ($data['next'] ?? []) as $n) echo '<p>' . h((string) $n) . '</p>';
  } else {
    echo '<h1>Bantu e.V.</h1><p>' . h((string) ($data['message'] ?? '')) . '</p>';
  }
  echo '<p><a href="' . h($shop) . '">' . h($isGiftPage ? $L['backGift'] : $L['back']) . '</a></p></body></html>';
  exit;
}

function fail(int $status, string $code, array $args = []): void {
  global $L;
  respond($status, ['ok' => false, 'error' => $code, 'message' => vsprintf($L['err'][$code] ?? $L['err']['server'], $args)]);
}

/* ---------- checks ---------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); fail(405, 'method'); }
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY) fail(413, 'size');
if (trim((string) ($_POST['website'] ?? '')) !== '') fail(400, 'spam');                          // honeypot
$dwell = $_POST['dwell'] ?? '';
if ($dwell !== '' && (!preg_match('/^\d{1,9}$/', (string) $dwell) || (int) $dwell < MIN_DWELL_MS)) fail(400, 'spam');

$cat = json_decode((string) @file_get_contents(__DIR__ . '/katalog.json'), true);
if (!is_array($cat) || !isset($cat['products'], $cat['bank'])) fail(500, 'server');

$product = null;
foreach ($cat['products'] as $p) { if (($p['slug'] ?? null) === ($_POST['product'] ?? '')) { $product = $p; break; } }
if (!$product || empty($product['orderable'])) fail(400, 'product');
$isGift = $product['kind'] === 'gift';

$qty = 1;
if ($isGift) {
  $min = (int) round(((float) ($cat['giftLimits']['min'] ?? 5)) * 100);
  $max = (int) round(((float) ($cat['giftLimits']['max'] ?? 10000)) * 100);
  $cents = parse_amount((string) ($_POST['amount'] ?? ''));
  if ($cents === null || $cents < $min || $cents > $max) fail(400, 'amount', [money($min, $lang), money($max, $lang)]);
} else {
  $qty = filter_var($_POST['qty'] ?? '', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => QTY_MAX]]);
  if ($qty === false) fail(400, 'qty');
  if (!is_numeric($product['price']) || !is_numeric($cat['shipping']['flat'] ?? null)) fail(400, 'product');
  $cents = (int) round((float) $product['price'] * 100) * $qty + (int) round((float) $cat['shipping']['flat'] * 100);
}

$name = line('name', 100);
if ($name === null || mb_strlen($name, 'UTF-8') < 2) fail(400, 'name');
$email = line('email', 200);
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) fail(400, 'email');
$receipt = $isGift && !empty($_POST['receipt']);
$address = block('address', 500);
if ($address === null) fail(400, 'address');
if (($receipt || !$isGift) && mb_strlen($address, 'UTF-8') < 10) fail(400, 'address');
if (!$receipt && $isGift) $address = '';   // only keep an address when it is needed
$note = block('note', 1000);
if ($note === null) fail(400, 'text');

$dataDir = data_dir();
if (rate_limited($dataDir)) fail(429, 'rate');

/* ---------- order ---------- */
$alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';   // no 0/O, 1/I
$code = date('ym') . '-';
for ($i = 0; $i < 6; $i++) $code .= $alphabet[random_int(0, strlen($alphabet) - 1)];
$reference = $isGift ? sepa_safe((string) $product['reference']) . ' ' . $code : 'Bantu Shop ' . $code;

$bank = $cat['bank'];
$holder = (string) $bank['holder'];
$iban = preg_replace('/\s+/', '', (string) $bank['iban']) ?? '';
$bic = (string) $bank['bic'];
$productName = (string) ($product['name'][$lang] ?? $product['name']['de']);
$amountText = money($cents, $lang);
$amountValue = number_format($cents / 100, 2, '.', '');
// EPC069-12 "GiroCode": banking apps fill in the transfer when they scan it.
$epc = implode("\n", ['BCD', '002', '1', 'SCT', $bic, mb_substr($holder, 0, 70, 'UTF-8'), $iban, 'EUR' . $amountValue, '', '', mb_substr($reference, 0, 140, 'UTF-8')]);

$next = [];
if ($isGift) $next[] = sprintf($L['giftNext'], $productName);
if ($receipt) $next[] = $L['receiptNext'];
if (!$isGift) $next[] = $L['goodsNext'];

// 1) backup copy outside the web root
$logged = false;
if ($dataDir) {
  $line = json_encode([
    'time' => date('c'), 'code' => $code, 'reference' => $reference, 'kind' => $product['kind'], 'product' => $product['slug'],
    'qty' => $qty, 'amount' => $amountValue, 'name' => $name, 'email' => $email, 'receipt' => $receipt, 'address' => $address, 'note' => $note, 'lang' => $lang,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  $file = $dataDir . '/orders.jsonl';
  $logged = @file_put_contents($file, $line . "\n", FILE_APPEND | LOCK_EX) !== false;
  if ($logged) @chmod($file, 0600);
}

// 2) to Bantu e.V. (always German)
$productDe = (string) ($product['name']['de'] ?? $productName);
$orgBody = implode("\n", array_filter([
  ($isGift ? 'Neues Spendengeschenk' : 'Neue Bestellung') . ' über das Bestellformular der Website',
  '',
  'Verwendungszweck: ' . $reference,
  'Betrag: ' . money($cents, 'de') . ($isGift ? '' : ' (' . $qty . ' x ' . money((int) round((float) $product['price'] * 100), 'de') . ' + Versand ' . money((int) round((float) $cat['shipping']['flat'] * 100), 'de') . ')'),
  'Angebot: ' . $productDe . ' (' . $product['slug'] . ')',
  $isGift ? 'Zuwendungsbestätigung gewünscht: ' . ($receipt ? 'ja' : 'nein') : null,
  '',
  'Name: ' . $name,
  'E-Mail: ' . $email,
  $address !== '' ? "Anschrift:\n" . $address : null,
  $note !== '' ? "Nachricht:\n" . $note : null,
  '',
  'Sprache der Seite: ' . strtoupper($lang) . ' · Eingang: ' . date('d.m.Y H:i'),
  'Bitte den Zahlungseingang auf dem GLS-Konto mit dem Verwendungszweck abgleichen.',
], function ($v) { return $v !== null; }));
$mailedOrg = send_mail(ORG_MAIL, ($isGift ? 'Spendengeschenk ' : 'Bestellung ') . $code . ': ' . $productDe . ', ' . money($cents, 'de'), $orgBody, 'Bantu e.V. Website <' . ORG_MAIL . '>', $email);

if (!$mailedOrg && !$logged) fail(500, 'server');   // nobody at Bantu would know about this order

// 3) to the buyer, in the page language
$orgCat = $cat['org'] ?? [];
$buyerBody = implode("\n", array_merge([
  sprintf($L['hello'], $name),
  '',
  sprintf($isGift ? $L['thanksGift'] : $L['thanksGoods'], $productName),
  '',
  sprintf($L['please'], $amountText),
  '',
  $L['holder'] . ': ' . $holder,
  'IBAN: ' . iban_spaced($iban),
  'BIC: ' . $bic . (isset($bank['bank']) ? ' (' . $bank['bank'] . ')' : ''),
  $L['amountL'] . ': ' . $amountText,
  $L['ref'] . ': ' . $reference,
  '',
  $L['refNote'],
], $next, [
  '',
  $L['questions'],
  '',
  $L['regards'],
  (string) ($orgCat['shortName'] ?? 'Bantu e.V.'),
  (string) ($orgCat['legalName'] ?? ''),
  (string) ($orgCat['address'] ?? '') . ' · www.bantu-ev.org',
]));
$mailedBuyer = send_mail($email, sprintf($L['subject'], $reference), $buyerBody, 'Bantu e.V. <' . ORG_MAIL . '>', ORG_MAIL);
if ($mailedBuyer) $next[] = $L['mailNote'];

respond(200, [
  'ok' => true,
  'kind' => $product['kind'],
  'code' => $code,
  'reference' => $reference,
  'amount' => $amountText,
  'amountValue' => $amountValue,
  'holder' => $holder,
  'iban' => $iban,
  'bic' => $bic,
  'bank' => (string) ($bank['bank'] ?? ''),
  'epc' => $epc,
  'next' => $next,
  'mailed' => $mailedBuyer,
]);
