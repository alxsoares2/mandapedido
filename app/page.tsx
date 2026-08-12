import { BrandGrid } from '@/components/BrandGrid';
import { KioskTimer } from '@/components/KioskTimer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-black/50 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
            🍕 MandaPedido
          </h1>
          <p className="text-center text-gray-400 text-2xl mt-2">
            Escolha uma marca e faça seu pedido
          </p>
        </div>
      </header>

      {/* Brand Grid */}
      <section className="max-w-7xl mx-auto py-8">
        <BrandGrid />
      </section>

      {/* Kiosk Timer */}
      <KioskTimer />
    </main>
  );
}
