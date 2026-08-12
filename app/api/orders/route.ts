import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customer_name,
      customer_phone,
      totem_name,
      items,
      total,
      payment_method,
    } = body;

    // Validar dados
    if (!customer_name || !customer_phone || !totem_name || !items || !total) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Criar pedido no Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name,
          customer_phone,
          totem_name,
          items,
          total,
          payment_method,
          source: 'totem',
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar pedido:', error);
      return NextResponse.json(
        { error: 'Erro ao criar pedido' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order_id: data.id,
    });
  } catch (error) {
    console.error('Erro na rota de pedidos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
