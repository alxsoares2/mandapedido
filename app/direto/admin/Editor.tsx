'use client';

import { useRef, useState, useTransition } from 'react';
import type { DiretoBrand, DiretoConfig } from '../brands';
import { logout, saveConfig, uploadPhoto } from './actions';

// Reduz a foto no navegador antes de enviar (lado maior 1000px, WebP),
// assim qualquer foto de celular cabe no limite de 1MB da server action.
async function compressImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/webp', 0.85));
  if (!blob) throw new Error('compressão falhou');
  return new File([blob], 'foto.webp', { type: 'image/webp' });
}

function BrandEditor({
  brand,
  index,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  brand: DiretoBrand;
  index: number;
  total: number;
  onChange: (patch: Partial<DiretoBrand>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setPhotoError(null);
    try {
      const small = await compressImage(file);
      const fd = new FormData();
      fd.set('file', small);
      fd.set('brandId', brand.id);
      const res = await uploadPhoto(fd);
      if (res.url) onChange({ image: res.url });
      else setPhotoError(res.error || 'Erro no envio.');
    } catch {
      setPhotoError('Não consegui ler essa imagem.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <article className={`da-brand${brand.visible ? '' : ' da-hidden'}`}>
      <button type="button" className="da-photo" onClick={() => fileRef.current?.click()} disabled={uploading}>
        {brand.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={brand.image} alt="" />
        ) : (
          <span className="da-photo-empty">Sem foto</span>
        )}
        <span className="da-photo-overlay">{uploading ? 'Enviando…' : 'Trocar foto'}</span>
      </button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPick} />
      {photoError && <p className="da-error">{photoError}</p>}

      <label className="da-field">
        <span>Nome</span>
        <input className="da-input" value={brand.name} onChange={(e) => onChange({ name: e.target.value })} />
      </label>
      <label className="da-field">
        <span>Descrição</span>
        <input className="da-input" value={brand.tagline} onChange={(e) => onChange({ tagline: e.target.value })} />
      </label>
      <label className="da-field">
        <span>Link do delivery</span>
        <input
          className="da-input"
          type="url"
          inputMode="url"
          placeholder="https://..."
          value={brand.url}
          onChange={(e) => onChange({ url: e.target.value })}
        />
      </label>
      {!brand.url && <p className="da-warn">Sem link: o card aparece, mas não leva a lugar nenhum.</p>}

      <div className="da-row">
        <label className="da-toggle">
          <input type="checkbox" checked={brand.visible} onChange={(e) => onChange({ visible: e.target.checked })} />
          <span>Mostrar na página</span>
        </label>
        <div className="da-actions">
          <button type="button" className="da-icon" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Mover para a esquerda">
            ←
          </button>
          <button type="button" className="da-icon" onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Mover para a direita">
            →
          </button>
          <button type="button" className="da-icon da-danger" onClick={onRemove} aria-label="Remover marca">
            ✕
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Editor({ initial }: { initial: DiretoConfig }) {
  const [config, setConfig] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, startSaving] = useTransition();

  function update(next: DiretoConfig) {
    setConfig(next);
    setDirty(true);
    setStatus(null);
  }

  function patchBrand(i: number, patch: Partial<DiretoBrand>) {
    update({ ...config, brands: config.brands.map((b, j) => (j === i ? { ...b, ...patch } : b)) });
  }

  function moveBrand(i: number, dir: -1 | 1) {
    const brands = [...config.brands];
    [brands[i], brands[i + dir]] = [brands[i + dir], brands[i]];
    update({ ...config, brands });
  }

  function removeBrand(i: number) {
    if (!confirm(`Remover "${config.brands[i].name}" da página?`)) return;
    update({ ...config, brands: config.brands.filter((_, j) => j !== i) });
  }

  function addBrand() {
    update({
      ...config,
      brands: [
        ...config.brands,
        { id: `marca-${Date.now()}`, name: 'Nova marca', tagline: '', image: '', url: '', visible: true },
      ],
    });
  }

  function save() {
    startSaving(async () => {
      const res = await saveConfig(config);
      if (res.ok) {
        setDirty(false);
        setStatus({ kind: 'ok', text: 'Salvo! A página já está atualizada.' });
      } else {
        setStatus({ kind: 'error', text: res.error || 'Erro ao salvar.' });
      }
    });
  }

  return (
    <div className="da-wrap">
      <header className="da-head">
        <div>
          <h1>Painel da landing</h1>
          <p>
            Página pública:{' '}
            <a href="/direto" target="_blank" rel="noreferrer">
              mandapedido.com/direto
            </a>
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="da-btn">Sair</button>
        </form>
      </header>

      <label className="da-field da-coupon-field">
        <span>Cupom exibido</span>
        <input
          className="da-input"
          value={config.coupon}
          onChange={(e) => update({ ...config, coupon: e.target.value.toUpperCase() })}
        />
      </label>

      <div className="da-grid">
        {config.brands.map((b, i) => (
          <BrandEditor
            key={b.id}
            brand={b}
            index={i}
            total={config.brands.length}
            onChange={(p) => patchBrand(i, p)}
            onMove={(d) => moveBrand(i, d)}
            onRemove={() => removeBrand(i)}
          />
        ))}
        <button type="button" className="da-add" onClick={addBrand}>
          + Adicionar marca
        </button>
      </div>

      <div className="da-savebar">
        {status && <span className={status.kind === 'ok' ? 'da-ok' : 'da-error'}>{status.text}</span>}
        {!status && dirty && <span className="da-muted">Alterações não salvas</span>}
        <button type="button" className="da-btn da-btn-primary" onClick={save} disabled={saving || !dirty}>
          {saving ? 'Salvando…' : 'Salvar alterações'}
        </button>
      </div>
    </div>
  );
}
