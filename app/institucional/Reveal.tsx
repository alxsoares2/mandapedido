'use client';

import type { ReactNode } from 'react';

// Liga o elemento a um observador: quando entra na tela, ganha a classe
// "is-in" (uma vez só). Sem estado do React, sem re-render. React 19 chama a
// função devolvida pelo ref ao desmontar.
function reveal(el: HTMLElement | null) {
  if (!el) return;
  if (!('IntersectionObserver' in window)) {
    el.classList.add('is-in');
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.classList.add('is-in');
        io.disconnect();
      }
    },
    { rootMargin: '0px 0px -10% 0px' }
  );
  io.observe(el);
  return () => io.disconnect();
}

// Aparece com um leve deslize quando entra na tela.
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
}: {
  as?: 'div' | 'section' | 'article';
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Tag ref={reveal} className={`mp-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
