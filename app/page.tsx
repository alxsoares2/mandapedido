import Link from 'next/link';
import { KioskTimer } from '@/components/KioskTimer';

const brands = [
  {
    id: '1',
    name: 'Basílico Pizzas',
    slug: 'basilico-pizzas',
    gradient: 'from-[#1B4332] to-[#0D2B1F]',
    logo: '/logos/basilico.png',
    hasLogo: true,
  },
  {
    id: '2',
    name: 'Mano Italiano',
    slug: 'mano-italiano',
    gradient: 'from-[#8B0000] to-[#3D0000]',
    logo: '/logos/mano.png',
    hasLogo: true,
  },
  {
    id: '3',
    name: 'Mano Cotidiano',
    slug: 'mano-cotidiano',
    gradient: 'from-[#1B5E20] to-[#0A2E0A]',
    logo: '/logos/mano.png',
    hasLogo: true,
  },
  {
    id: '4',
    name: 'Pizza Certa',
    slug: 'pizza-certa',
    gradient: 'from-[#0A0A0A] to-[#E65100]',
    logo: '',
    hasLogo: false,
  },
  {
    id: '5',
    name: 'Okane',
    slug: 'okane',
    gradient: 'from-[#0A0A0A] to-[#8B6914]',
    logo: '/logos/okane.png',
    hasLogo: true,
  },
  {
    id: '6',
    name: 'Umami',
    slug: 'umami',
    gradient: 'from-[#1A1A1A] to-[#3D3D3D]',
    logo: '',
    hasLogo: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Header */}
      <header className="pt-12 pb-12 px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center tracking-tight">
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
              className="group relative h-80 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-95`}
              />

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

              {/* Content Container */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                {/* Logo or Placeholder */}
                <div className="mb-6 flex items-center justify-center h-32">
                  {brand.hasLogo && brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-32 max-w-full object-contain drop-shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-black/40 rounded-lg flex items-center justify-center border-2 border-white/20">
                      <span className="text-5xl opacity-30">🍽️</span>
                    </div>
                  )}
                </div>

                {/* Brand Name */}
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center leading-tight">
                  {brand.name}
                </h2>

                {/* Subtle Click Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-white/70 font-medium">Toque para ver cardápio</p>
                </div>
              </div>

              {/* Border Highlight on Hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>

      {/* Kiosk Timer */}
      <KioskTimer />
    </main>
  );
}
