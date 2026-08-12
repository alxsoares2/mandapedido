'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { KIOSK_TIMEOUT_MINUTES } from '@/lib/constants';

export function KioskTimer() {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const handleActivity = () => {
      // Limpar timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsVisible(false);
      setCountdown(0);

      // Definir novo timeout
      const timeoutMs = KIOSK_TIMEOUT_MINUTES * 60 * 1000;

      // Mostrar aviso nos últimos 10 segundos
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setCountdown(10);

        // Countdown regressivo
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              // Redirecionar para home
              router.push('/');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, timeoutMs - 10000);
    };

    // Event listeners para detectar atividade
    const events = [
      'click',
      'touchstart',
      'mousemove',
      'keypress',
      'scroll',
    ];

    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    // Iniciar timer
    handleActivity();

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [router]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-slate-900 border-4 border-red-500 rounded-xl p-12 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          ⏱️ Tempo Esgotado
        </h2>
        <p className="text-3xl text-gray-300 mb-8">
          Voltando para tela inicial em
        </p>
        <div className="text-8xl font-bold text-red-500 mb-8 font-mono">
          {countdown}
        </div>
        <p className="text-xl text-gray-400">
          segundos...
        </p>
      </div>
    </div>
  );
}
