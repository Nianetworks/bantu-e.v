// Build-time price list for the order script (public/shop/bestellung.php reads /shop/katalog.json next to it).
// The script never trusts prices sent by the browser: it looks every order up here.
import { canOrder, giftLimits, products, shipping } from '../../data/shop';
import { org } from '../../data/site';

export function GET() {
  const body = {
    generated: new Date().toISOString(),
    org: { shortName: org.shortName, legalName: org.legalName, email: org.email, address: `${org.address.street}, ${org.address.zip} ${org.address.city}` },
    bank: { holder: org.bank.holder, iban: org.bank.iban.replace(/\s+/g, ''), bic: org.bank.bic, bank: org.bank.bank },
    giftLimits: { min: giftLimits.min, max: giftLimits.max },
    shipping: { flat: shipping.flat ?? null },
    // Planned coffee editions and label samples are never orderable and stay out of the price list.
    products: products.filter((p) => p.status !== 'planned' && !p.sample).map((p) => ({
      slug: p.slug,
      kind: p.category === 'gifts' ? 'gift' : 'goods',
      orderable: canOrder(p),
      name: { de: p.name.de, en: p.name.en, fr: (p.name as { fr?: string }).fr ?? p.name.en },
      price: p.price ?? null,
      reference: p.donationReference ?? null,
    })),
  };
  return new Response(JSON.stringify(body, null, 1), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
