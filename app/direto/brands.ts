// Tipos e valores padrão da landing do panfleto (/direto).
// Os valores reais ficam no Supabase Storage (bucket `direto`, arquivo
// `config.json`) e são editados em /direto/admin. Estes padrões só são usados
// enquanto o config.json ainda não foi salvo pela primeira vez.
export interface DiretoBrand {
  id: string;
  name: string;
  tagline: string;
  image: string;
  url: string;
  visible: boolean;
}

export interface DiretoConfig {
  coupon: string;
  brands: DiretoBrand[];
}

export const DEFAULT_CONFIG: DiretoConfig = {
  coupon: 'DIRETO10',
  brands: [
    {
      id: 'mano-italiano',
      name: 'Mano Italiano',
      tagline: 'Massas, lasanhas e pratos italianos',
      image: '/direto/mano-italiano.webp',
      url: '',
      visible: true,
    },
    {
      id: 'basilico',
      name: 'Basílico Pizzas',
      tagline: 'Pizzas artesanais e sabores especiais',
      image: '/direto/basilico.webp',
      url: 'https://basilicopizzas.com.br',
      visible: true,
    },
    {
      id: 'vai-de-pizza',
      name: 'Vai de Pizza',
      tagline: 'Pizza gostosa, preço bom e combos',
      image: '/direto/vai-de-pizza.webp',
      url: '',
      visible: true,
    },
    {
      id: 'umami',
      name: 'Umami Burger',
      tagline: 'Hambúrgueres suculentos e muito sabor',
      image: '/direto/umami.webp',
      url: '',
      visible: true,
    },
  ],
};

// Marca a origem do acesso no analytics de cada site.
export function withUtm(url: string) {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'panfleto');
    u.searchParams.set('utm_medium', 'qrcode');
    u.searchParams.set('utm_campaign', 'direto');
    return u.toString();
  } catch {
    return url;
  }
}
