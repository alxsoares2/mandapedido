// Envio de alerta via WhatsApp (Z-API), reaproveitando exatamente a mesma
// configuração e o mesmo grupo do basilico-site (src/lib/alertGroup.ts):
// mesmas env vars ZAPI_*, mesmo GROUP_ID fixo no código com override opcional
// via ALERT_GROUP_ID (não setado hoje no basilico-site, então na prática o
// grupo usado é sempre o fallback abaixo). Fetch direto na API, sem lançar
// erro — falha silenciosa para nunca quebrar o fluxo que chamou.
const GROUP_ID = process.env.ALERT_GROUP_ID ?? '120363144139588563-group';

export async function enviarAlertaWhatsapp(mensagem: string): Promise<boolean> {
  const instanceId = process.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN;
  const clientToken = process.env.ZAPI_CLIENT_TOKEN;

  if (!instanceId || !token) {
    console.error(
      'enviarAlertaWhatsapp: configuração incompleta (ZAPI_INSTANCE_ID ou ZAPI_TOKEN ausentes)'
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
        body: JSON.stringify({ phone: GROUP_ID, message: mensagem }),
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
