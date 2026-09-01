import { getEtiquetasVencendo } from '@/lib/etiquetas';

export const dynamic = 'force-dynamic';

function formatarDataHora(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function statusDe(dataValidadeIso: string): 'vencido' | 'vencendo' {
  const validade = new Date(dataValidadeIso).getTime();
  return validade < Date.now() ? 'vencido' : 'vencendo';
}

export default async function VencendoPage() {
  const etiquetas = await getEtiquetasVencendo();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#eeece5',
        color: '#1c1c1c',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        padding: '32px 20px 80px',
      }}
    >
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 24,
            borderBottom: '3px solid #1c1c1c',
            paddingBottom: 12,
          }}
        >
          <h1
            style={{
              fontSize: 22,
              letterSpacing: '0.02em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Validade vencendo
          </h1>
          <span style={{ fontSize: 12, color: '#706c62' }}>
            Vencidos + vencendo nas próximas 24h
          </span>
        </header>

        {etiquetas.length === 0 ? (
          <div
            style={{
              background: '#fafaf8',
              border: '1px solid #d8d5cc',
              padding: 24,
              fontSize: 15,
              color: '#3a6b4c',
              fontWeight: 600,
            }}
          >
            Nenhuma etiqueta vencida ou vencendo nas próximas 24h. ✅
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {etiquetas.map((etq) => {
              const status = statusDe(etq.data_validade);
              const cor = status === 'vencido' ? '#c0392b' : '#b58900';
              const bg = status === 'vencido' ? '#fbeaea' : '#fbf3d9';
              return (
                <div
                  key={etq.id}
                  style={{
                    background: bg,
                    border: `1.5px solid ${cor}`,
                    padding: '16px 20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#1c1c1c' }}>
                      {etq.produto}
                    </div>
                    <div style={{ fontSize: 13, color: '#706c62', marginTop: 4 }}>
                      {etq.categoria ? `${etq.categoria} · ` : ''}
                      Lote: {etq.lote || '—'} · Responsável: {etq.responsavel || '—'}
                      {etq.unidade ? ` · Unidade: ${etq.unidade}` : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: cor }}>
                      {status === 'vencido' ? 'Vencido' : 'Vence em até 24h'}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: cor }}>
                      {formatarDataHora(etq.data_validade)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
