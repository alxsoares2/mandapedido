// Envio de alerta via WhatsApp (Z-API), no mesmo padrão usado no basilico-site
// (src/lib/alertar.ts): fetch direto na API, sem lançar erro — falha silenciosa
// para nunca quebrar o fluxo que chamou.
export async function enviarAlertaWhatsapp(mensagem: string): Promise<boolean> {
  const instanceId = process.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN;
  const clientToken = process.env.ZAPI_CLIENT_TOKEN;
  const phone = process.env.ALERTA_WHATSAPP_NUMERO;

  if (!instanceId || !token || !phone) {
    console.error(
      'enviarAlertaWhatsapp: configuração incompleta (ZAPI_INSTANCE_ID, ZAPI_TOKEN ou ALERTA_WHATSAPP_NUMERO ausentes)'
    );
    return false;
  }

  try {
    const res = await fetch(
      `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(clientToken ? { 'Client-Token': clientToken } : {}),
        },
        body: JSON.stringify({ phone, message: mensagem }),
      }
    );
    if (!res.ok) {
      console.error('enviarAlertaWhatsapp: Z-API retornou', res.status);
    }
    return res.ok;
  } catch (err) {
    console.error('enviarAlertaWhatsapp: erro ao chamar Z-API', err);
    return false;
  }
}
