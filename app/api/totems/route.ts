import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'Nome do totem é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar totem no Supabase
    const { data, error } = await supabase
      .from('totems')
      .select('*')
      .eq('name', name)
      .eq('active', true)
      .single();

    if (error || !data) {
      console.error('Erro ao buscar totem:', error);
      return NextResponse.json(
        { error: 'Totem não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      totem: data,
    });
  } catch (error) {
    console.error('Erro na rota de totems:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
