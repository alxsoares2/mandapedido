'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CONFIRMATION_AUTO_REDIRECT_SECONDS } from '@/lib/constants';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'DESCONHECIDO';

  useEffect(() => {
    // Redirecionar para home após X segundos
    const timeout = setTimeout(() => {
      router.push('/');
    }, CONFIRMATION_AUTO_REDIRECT_SECONDS * 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-950 via-slate-900 to-slate-950 flex items-center justify-center p-8">
      <div className="text-center animate-scale-in">
        {/* Checkmark animation */}
        <div className="mb-12">
          <div className="inline-block w-32 h-32 bg-green-500/20 border-4 border-green-500 rounded-full flex items-center justify-center animate-pulse-glow">
            <span className="text-8xl">✓</span>
          </div>
        </div>

        {/* Mensagem de sucesso */}
        <h1 className="text-6xl font-bold text-green-400 mb-6">
          Pedido Confirmado!
        </h1>

        {/* Número do pedido em destaque gigante */}
        <div className="bg-gradient-to-br from-green-900/30 to-slate-900/30 border-4 border-green-500 rounded-3xl p-12 mb-12">
          <p className="text-3xl text-gray-400 mb-4">Número do seu pedido:</p>
          <p className="text-9xl font-mono font-bold text-green-400 tracking-widest">
            {orderNumber}
          </p>
        </div>

        {/* Informações */}
        <div className="max-w-2xl mx-auto space-y-6 mb-12">
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-8">
            <p className="text-2xl text-blue-300">
              📱 Você receberá atualizações do seu pedido via WhatsApp
            </p>
          </div>

          <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-8">
            <p className="text-2xl text-amber-300">
              ⏱️ Tempo estimado: <strong>30-45 minutos</strong>
            </p>
          </div>
        </div>

        {/* Countdown */}
        <p className="text-2xl text-gray-400 mt-8">
          Voltando para a tela inicial em{' '}
          <span className="text-4xl font-bold text-white">
            {CONFIRMATION_AUTO_REDIRECT_SECONDS}
          </span>{' '}
          segundos...
        </p>

        {/* Instrução */}
        <p className="text-xl text-gray-500 mt-6">
          Você pode usar o totem novamente para fazer outro pedido
        </p>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
