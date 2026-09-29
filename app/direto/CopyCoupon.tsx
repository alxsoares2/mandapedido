'use client';

import { useState } from 'react';

export default function CopyCoupon({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={copy} className="dp-coupon" aria-label={`Copiar cupom ${code}`}>
      <span className="dp-coupon-code">{code}</span>
      <span className="dp-coupon-hint">{copied ? 'Copiado!' : 'Toque para copiar'}</span>
    </button>
  );
}
