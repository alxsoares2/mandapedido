'use client';

import Link from 'next/link';
import { BRANDS } from '@/lib/constants';
import Image from 'next/image';

export function BrandGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {BRANDS.map((brand) => (
        <Link
          key={brand.id}
          href={`/marca/${brand.slug}`}
          className="group relative h-64 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundColor: brand.color }}
          />

          <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            {/* Placeholder image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
              <span className="text-6xl">🏪</span>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col items-center justify-end pb-8">
              <h2 className="text-4xl font-bold text-white text-center px-4">
                {brand.name}
              </h2>
              <div
                className="mt-4 px-8 py-2 rounded-full text-white text-lg font-semibold"
                style={{ backgroundColor: brand.color }}
              >
                Ver Cardápio
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        </Link>
      ))}
    </div>
  );
}
