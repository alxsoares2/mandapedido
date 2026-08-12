'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BRANDS } from '@/lib/constants';

export default function MarcaPage() {
  const params = useParams();
  const slug = params.slug as string;

  const brand = BRANDS.find((b) => b.slug === slug);

  if (!brand) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-red-500 mb-4">❌ Marca não encontrada</h1>
          <Link
            href="/"
            className="inline-block mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-lg transition-colors"
          >
            ← Voltar para Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-black/50 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white">{brand.name}</h1>
            <p className="text-gray-400 text-xl mt-2">Escolha seus itens</p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            ← Voltar
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto py-12 px-8">
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400 mb-4">
            🚧 Cardápio em construção...
          </p>
          <p className="text-lg text-gray-500">
            Em breve você poderá adicionar itens do cardápio de {brand.name}
          </p>
        </div>
      </section>
    </main>
  );
}
