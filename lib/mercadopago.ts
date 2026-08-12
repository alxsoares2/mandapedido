// Configuração do Mercado Pago

export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || '';

// Função para carregar o SDK do Mercado Pago
export function loadMercadoPagoScript() {
  return new Promise((resolve) => {
    // Se já está carregado, resolver imediatamente
    if ((window as any).MercadoPago) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error('Erro ao carregar Mercado Pago SDK');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

// Inicializar Mercado Pago
export async function initMercadoPago() {
  await loadMercadoPagoScript();

  if ((window as any).MercadoPago) {
    const mp = new (window as any).MercadoPago(MP_PUBLIC_KEY);
    return mp;
  }

  return null;
}
