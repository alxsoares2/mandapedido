'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totemName = searchParams.get('totem') || 'Totem Desconhecido';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validar campos
      if (!formData.name.trim()) {
        throw new Error('Por favor, informe seu nome');
      }
      if (!formData.phone.trim()) {
        throw new Error('Por favor, informe seu telefone');
      }

      // Simular envio de pedido
      const orderNumber = Math.random().toString(36).substring(2, 9).toUpperCase();

      // Redirecionar para confirmação
      router.push(`/confirmation?order=${orderNumber}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar pedido');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        {/* Card de checkout */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 shadow-2xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-xl text-gray-400">
              Finalizar pedido para <strong className="text-blue-400">{totemName}</strong>
            </p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-2xl font-semibold text-white mb-3">
                👤 Seu Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                className="w-full px-6 py-4 bg-slate-700 border border-slate-600 rounded-lg text-white text-2xl placeholder-gray-500 focus:border-blue-500 transition-colors"
                disabled={loading}
              />
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="phone" className="block text-2xl font-semibold text-white mb-3">
                📱 Seu Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(xx) 9xxxx-xxxx"
                className="w-full px-6 py-4 bg-slate-700 border border-slate-600 rounded-lg text-white text-2xl placeholder-gray-500 focus:border-blue-500 transition-colors"
                disabled={loading}
              />
            </div>

            {/* Info do totem */}
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
              <p className="text-lg text-blue-300">
                ℹ️ <strong>Endereço do totem:</strong> Será buscado automaticamente
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6">
              <Link
                href="/"
                className="flex-1 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white text-2xl font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                ← Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Processando...' : '✓ Confirmar Pedido'}
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-12 p-6 bg-slate-700/30 rounded-lg border border-slate-600">
            <p className="text-gray-400 text-center">
              💳 Você escolherá a forma de pagamento (PIX ou Cartão) na próxima tela
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
