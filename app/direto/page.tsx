import type { Metadata } from 'next';
import { getDiretoConfig } from '@/lib/direto';
import CopyCoupon from './CopyCoupon';
import { withUtm } from './brands';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Peça direto com a gente | MandaPedido',
  description: 'Peça direto no delivery das nossas lojas e ganhe desconto no primeiro pedido.',
};

export default async function DiretoPage() {
  const config = await getDiretoConfig();
  const brands = config.brands.filter((b) => b.visible);

  return (
    <main className="dp">
      <div className="dp-wrap">
        <header className="dp-hero">
          <h1 className="dp-title">GOSTOU?</h1>
          <p className="dp-subtitle">Na próxima, peça direto com a gente.</p>
          <span className="dp-rule" />
          <p className="dp-lead">Mais sabor, mais vantagens, mesma qualidade</p>
        </header>

        {config.coupon && (
          <section className="dp-coupon-box" aria-label="Cupom de desconto">
            <div className="dp-off">
              <strong>10% OFF</strong>
              <span>no seu primeiro pedido</span>
            </div>
            <div className="dp-coupon-side">
              <span className="dp-coupon-label">Cupom:</span>
              <CopyCoupon code={config.coupon} />
            </div>
          </section>
        )}

        <h2 className="dp-choose">Escolha sua loja</h2>

        <ul className="dp-grid">
          {brands.map((b, i) => (
            <li key={b.id} style={{ animationDelay: `${120 + i * 80}ms` }}>
              <a className="dp-card" href={b.url ? withUtm(b.url) : undefined}>
                <div className="dp-card-img">
                  {b.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.image} alt={b.name} loading={i < 2 ? 'eager' : 'lazy'} />
                  )}
                </div>
                <div className="dp-card-body">
                  <h3>{b.name}</h3>
                  <span className="dp-rule dp-rule-sm" />
                  <p>{b.tagline}</p>
                  <span className="dp-cta">
                    Pedir agora
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <ul className="dp-perks">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
              <circle cx="7.5" cy="7.5" r="1.5" />
            </svg>
            <span>Ofertas exclusivas</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
            </svg>
            <span>Novidades e promoções</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
            </svg>
            <span>O mesmo sabor que você já conhece</span>
          </li>
        </ul>

        <footer className="dp-foot">Cupom válido no primeiro pedido feito pelo site da loja.</footer>
      </div>
    </main>
  );
}
