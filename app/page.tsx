import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import Reveal from './institucional/Reveal';
import './institucional/institucional.css';

const display = Fraunces({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--mp-display' });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--mp-body' });

export const metadata: Metadata = {
  title: 'MandaPedido | Marcas de delivery em João Pessoa',
  description:
    'O MandaPedido reúne marcas de restaurante de João Pessoa que operam há mais de 7 anos — como Basílico Pizzas, Mano Italiano e Umami Burger.',
};

const BRANDS = [
  {
    name: 'Basílico Pizzas',
    kind: 'Pizzaria artesanal',
    text: 'Pizzas artesanais, dos sabores clássicos aos especiais da casa.',
    image: '/institucional/basilico-card.webp',
  },
  {
    name: 'Mano Italiano',
    kind: 'Cozinha italiana',
    text: 'Massas, lasanhas e pratos italianos pra comer em casa como se estivesse à mesa.',
    image: '/institucional/mano-card.webp',
  },
  {
    name: 'Umami Burger',
    kind: 'Hamburgueria',
    text: 'Hambúrgueres suculentos e muito sabor em cada mordida.',
    image: '/institucional/umami-card.webp',
  },
];

const PILLARS = [
  {
    title: 'Experiência de verdade',
    text: 'São mais de 7 anos operando cozinhas de delivery. Cada marca nasceu, cresceu e se ajustou ouvindo quem pede.',
    icon: (
      <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    ),
  },
  {
    title: 'Cada marca com sua identidade',
    text: 'Cardápio, receita e jeito próprios. O que une as marcas é o padrão de operação por trás delas.',
    icon: <path d="M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z" />,
  },
  {
    title: 'Padrão em cada pedido',
    text: 'Processos, checklists e controle de qualidade pra que o pedido de hoje chegue tão bom quanto o de ontem.',
    icon: <path d="M9 11l2.5 2.5L16 9M5 4h14v16H5z" />,
  },
  {
    title: 'Direto com a gente',
    text: 'Delivery próprio, sem intermediário: o cliente fala com quem faz a comida — e isso volta em preço e atendimento.',
    icon: <path d="M4 12h12M12 6l6 6-6 6M20 5v14" />,
  },
];

export default function Home() {
  return (
    <div className={`mp ${display.variable} ${body.variable}`}>
      <div className="mp-ambient" aria-hidden="true" />

      <header className="mp-nav">
        <a href="#topo" className="mp-logo" aria-label="MandaPedido">
          <span className="mp-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 18V7l4 5 4-5 4 5 4-5v11" />
            </svg>
          </span>
          MandaPedido
        </a>
        <nav className="mp-nav-links">
          <a href="#quem-somos">Quem somos</a>
          <a href="#marcas">Marcas</a>
          <a href="#como-trabalhamos">Como trabalhamos</a>
        </nav>
      </header>

      <main id="topo">
        {/* Hero */}
        <section className="mp-hero">
          <div className="mp-hero-text">
            <p className="mp-eyebrow mp-in" style={{ animationDelay: '60ms' }}>
              Grupo de marcas de delivery · João Pessoa
            </p>
            <h1 className="mp-in" style={{ animationDelay: '140ms' }}>
              Marcas que a cidade já conhece, <em>feitas com o mesmo cuidado</em>.
            </h1>
            <p className="mp-lead mp-in" style={{ animationDelay: '220ms' }}>
              O MandaPedido é a casa de marcas de restaurante que operam há mais de 7 anos em João Pessoa.
              Cada uma com sua cozinha, seu cardápio e seu jeito — todas com o mesmo compromisso com quem pede.
            </p>
            <div className="mp-hero-actions mp-in" style={{ animationDelay: '300ms' }}>
              <a href="#marcas" className="mp-btn mp-btn-primary">Conheça as marcas</a>
              <a href="#quem-somos" className="mp-btn">Quem somos</a>
            </div>
          </div>

          <div className="mp-hero-art" aria-hidden="true">
            <figure className="mp-photo mp-photo-a mp-in" style={{ animationDelay: '200ms' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/institucional/basilico-hero.webp" alt="" />
            </figure>
            <figure className="mp-photo mp-photo-b mp-in" style={{ animationDelay: '320ms' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/institucional/mano-hero.webp" alt="" />
            </figure>
            <div className="mp-badge mp-in" style={{ animationDelay: '460ms' }}>
              <strong>+7</strong>
              <span>anos operando delivery</span>
            </div>
          </div>
        </section>

        {/* Números */}
        <Reveal as="section" className="mp-facts">
          <div>
            <strong>+7 anos</strong>
            <span>de operação em delivery</span>
          </div>
          <div>
            <strong>João Pessoa</strong>
            <span>onde nascemos e entregamos</span>
          </div>
          <div>
            <strong>Delivery próprio</strong>
            <span>pedido direto com a gente</span>
          </div>
        </Reveal>

        {/* Quem somos */}
        <section id="quem-somos" className="mp-section mp-about">
          <Reveal className="mp-about-title">
            <p className="mp-eyebrow">Quem somos</p>
            <h2>Uma casa, várias cozinhas.</h2>
            <figure className="mp-about-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/institucional/basilico-mesa.webp" alt="Mesa posta com pizza e taças de vinho" loading="lazy" />
            </figure>
          </Reveal>
          <Reveal className="mp-about-text" delay={100}>
            <p>
              Tudo começa com uma ideia simples: comida boa, bem feita, chegando quente na casa de quem pediu.
              Em mais de 7 anos, essa ideia virou receitas, marcas e uma operação inteira aprendida no dia a
              dia do delivery.
            </p>
            <p>
              O MandaPedido é o nome que reúne tudo isso. Por trás de cada marca existe a mesma equipe, os
              mesmos processos e a mesma exigência — pra que você possa escolher o que comer hoje e confiar em
              como vai chegar.
            </p>
          </Reveal>
        </section>

        {/* Marcas */}
        <section id="marcas" className="mp-section">
          <Reveal className="mp-section-head">
            <p className="mp-eyebrow">Nossas marcas</p>
            <h2>Cada uma com sua personalidade.</h2>
          </Reveal>

          <div className="mp-brands">
            {BRANDS.map((b, i) => (
              <Reveal as="article" key={b.name} className="mp-brand" delay={i * 120}>
                <div className="mp-brand-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt={`Prato da ${b.name}`} loading="lazy" />
                </div>
                <div className="mp-brand-body">
                  <span className="mp-brand-kind">{b.kind}</span>
                  <h3>{b.name}</h3>
                  <p>{b.text}</p>
                </div>
              </Reveal>
            ))}

            <Reveal as="article" className="mp-brand mp-brand-soon" delay={BRANDS.length * 120}>
              <div className="mp-soon-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <div className="mp-brand-body">
                <span className="mp-brand-kind">Em breve</span>
                <h3>Novas marcas</h3>
                <p>Outras cozinhas do grupo vão chegar aqui em breve.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Como trabalhamos */}
        <section id="como-trabalhamos" className="mp-section">
          <Reveal className="mp-section-head">
            <p className="mp-eyebrow">Como trabalhamos</p>
            <h2>O que está por trás de cada pedido.</h2>
          </Reveal>
          <div className="mp-pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} className="mp-pillar" delay={i * 90}>
                <span className="mp-pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{p.icon}</svg>
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Fecho */}
        <Reveal as="section" className="mp-closing">
          <h2>Da nossa cozinha pra sua mesa.</h2>
          <p>Há mais de 7 anos fazendo parte do dia a dia de João Pessoa.</p>
        </Reveal>
      </main>

      <footer className="mp-footer">
        <span className="mp-logo mp-logo-sm">
          <span className="mp-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 18V7l4 5 4-5 4 5 4-5v11" />
            </svg>
          </span>
          MandaPedido
        </span>
        <span>© {new Date().getFullYear()} MandaPedido · João Pessoa/PB</span>
      </footer>
    </div>
  );
}
