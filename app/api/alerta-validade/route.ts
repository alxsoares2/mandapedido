import { NextResponse } from 'next/server';
import { getEtiquetasVencendo } from '@/lib/etiquetas';
import { enviarAlertaWhatsapp } from '@/lib/whatsappAlert';

function montarMensagem(
  etiquetas: Awaited<ReturnType<typeof getEtiquetasVencendo>>
): string {
  const linhas = etiquetas.map((etq) => {
    const validade = new Date(etq.data_validade);
    const vencida = validade.getTime() < Date.now();
    const validadeFmt = validade.toLocaleDateString('pt-BR');
    const marcador = vencida ? '🔴' : '🟡';
    const unidadeSufixo = etq.unidade ? ` — Unidade: ${etq.unidade}` : '';
    return `${marcador} ${etq.produto} — Lote ${etq.lote || '—'} — Validade ${validadeFmt}${unidadeSufixo}`;
  });

  return (
    `⚠️ Alerta de validade — MandaPedido\n\n` +
    `${etiquetas.length} item${etiquetas.length === 1 ? '' : 's'} vencido${etiquetas.length === 1 ? '' : 's'} ou vencendo nas próximas 24h:\n\n` +
    linhas.join('\n')
  );
}

export async function GET() {
  const etiquetas = await getEtiquetasVencendo();

  if (etiquetas.length === 0) {
    return NextResponse.json({ success: true, enviado: false, motivo: 'nada vencendo' });
  }

  // Envia pro grupo de WhatsApp de alertas operacionais (mesmo grupo usado
  // pelo basilico-site via alertGroup.ts).
  const mensagem = montarMensagem(etiquetas);
  const enviado = await enviarAlertaWhatsapp(mensagem);

  return NextResponse.json({
    success: true,
    enviado,
    total_itens: etiquetas.length,
  });
}
