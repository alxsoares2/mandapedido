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
    const unidade = etq.unidade ? ` (${etq.unidade})` : '';
    return `${marcador} ${etq.produto}${unidade} — lote ${etq.lote || '—'} — validade ${validadeFmt}`;
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

  const mensagem = montarMensagem(etiquetas);
  const enviado = await enviarAlertaWhatsapp(mensagem);

  return NextResponse.json({
    success: true,
    enviado,
    total_itens: etiquetas.length,
  });
}
