import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para buscar totem pelo nome
export async function getTotemByName(name: string) {
  const { data, error } = await supabase
    .from('totems')
    .select('*')
    .eq('name', name)
    .single();

  if (error) {
    console.error('Erro ao buscar totem:', error);
    return null;
  }

  return data;
}

// Função para buscar produtos de uma marca
export async function getProductsByBrand(brandSlug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('brand', brandSlug)
    .eq('available', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }

  return data || [];
}

// Função para criar pedido
export async function createOrder(order: any) {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar pedido:', error);
    return null;
  }

  return data;
}
