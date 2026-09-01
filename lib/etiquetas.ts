import { createClient } from '@supabase/supabase-js';

// Client server-side com service role (mesmo padrão de app/api/orders/route.ts)
// — usado só em Server Components e API routes, nunca exposto ao browser.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export type EtiquetaImpressa = {
  id: string;
  produto: string;
  categoria: string | null;
  conservacao: string | null;
  peso: string | null;
  marca: string | null;
  lote: string | null;
  data_manipulacao: string | null;
  data_validade: string;
  responsavel: string | null;
  unidade: string | null;
  codigo: string;
  criado_em: string;
};

// Etiquetas já vencidas ou que vencem nas próximas 24h, ordenadas por
// data_validade crescente (as mais urgentes primeiro).
export async function getEtiquetasVencendo(): Promise<EtiquetaImpressa[]> {
  const limite = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from('etiquetas_impressas')
    .select('*')
    .lte('data_validade', limite)
    .order('data_validade', { ascending: true });

  if (error) {
    console.error('Erro ao buscar etiquetas vencendo:', error);
    return [];
  }

  return data || [];
}
