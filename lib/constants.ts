import { Brand } from './types';

export const BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Basílico Pizzas',
    slug: 'basilico-pizzas',
    color: '#FF6B35',
    image: '/brands/basilico.jpg',
  },
  {
    id: '2',
    name: 'Mano Italiano',
    slug: 'mano-italiano',
    color: '#D62828',
    image: '/brands/mano-italiano.jpg',
  },
  {
    id: '3',
    name: 'Mano Cotidiano',
    slug: 'mano-cotidiano',
    color: '#F77F00',
    image: '/brands/mano-cotidiano.jpg',
  },
  {
    id: '4',
    name: 'Pizza Certa',
    slug: 'pizza-certa',
    color: '#06A77D',
    image: '/brands/pizza-certa.jpg',
  },
  {
    id: '5',
    name: 'Okane',
    slug: 'okane',
    color: '#E63946',
    image: '/brands/okane.jpg',
  },
  {
    id: '6',
    name: 'Umami',
    slug: 'umami',
    color: '#F4A261',
    image: '/brands/umami.jpg',
  },
];

// Timeout de inatividade em minutos
export const KIOSK_TIMEOUT_MINUTES = 2;

// Tempo para voltar para home após confirmação (em segundos)
export const CONFIRMATION_AUTO_REDIRECT_SECONDS = 5;
