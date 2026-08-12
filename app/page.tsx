import Link from 'next/link';
import { KioskTimer } from '@/components/KioskTimer';

const brands = [
  {
    id: '1',
    name: 'Basílico Pizzas',
    slug: 'basilico-pizzas',
    bgColor: '#1B4332',
  },
  {
    id: '2',
    name: 'Mano Italiano',
    slug: 'mano-italiano',
    bgColor: '#8B0000',
  },
  {
    id: '3',
    name: 'Mano Cotidiano',
    slug: 'mano-cotidiano',
    bgColor: '#1B5E20',
  },
  {
    id: '4',
    name: 'Pizza Certa',
    slug: 'pizza-certa',
    bgColor: '#E65100',
  },
  {
    id: '5',
    name: 'Okane',
    slug: 'okane',
    bgColor: '#8B6914',
  },
  {
    id: '6',
    name: 'Umami',
    slug: 'umami',
    bgColor: '#3D3D3D',
  },
];

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #F5F0E8 0%, #EDE8DC 100%)',
      }}
    >
      {/* Header */}
      <header className="pt-16 pb-12 px-8">
        <h1
          className="text-5xl md:text-6xl font-bold text-center tracking-tight"
          style={{ color: '#1A1A1A' }}
        >
          O que você vai pedir hoje?
        </h1>
      </header>

      {/* Brand Grid */}
      <section className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/marca/${brand.slug}`}
              className="group relative rounded-[20px] overflow-hidden transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
              style={{ minHeight: '260px' }}
            >
              {/* Background Color */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: brand.bgColor }}
              />

              {/* Overlay hover - suave darkening */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />

              {/* Sombra suave */}
              <div className="absolute inset-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300 rounded-[20px]" />

              {/* Content Container */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                {/* Brand Name - elegante e grande */}
                <h2
                  className="text-3xl md:text-4xl font-bold text-white text-center leading-tight tracking-wide"
                  style={{
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {brand.name}
                </h2>

                {/* Subtle Click Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-white/80 font-medium">Toque para ver cardápio</p>
                </div>
              </div>

              {/* Border Highlight on Hover */}
              <div
                className="absolute inset-0 rounded-[20px] border-2 border-white/0 group-hover:border-white/30 transition-all duration-300"
                style={{
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Kiosk Timer */}
      <KioskTimer />
    </main>
  );
}
