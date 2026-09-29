import { Playfair_Display, Montserrat } from 'next/font/google';
import './direto.css';

const serif = Playfair_Display({ subsets: ['latin'], weight: ['700', '800'], variable: '--dp-serif' });
const sans = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--dp-sans' });

export default function DiretoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} ${sans.variable}`} style={{ display: 'contents' }}>{children}</div>;
}
