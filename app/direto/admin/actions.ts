'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  ADMIN_COOKIE,
  adminSessionValue,
  checkPassword,
  isAdmin,
  saveDiretoConfig,
  uploadDiretoPhoto,
} from '@/lib/direto';
import type { DiretoBrand, DiretoConfig } from '../brands';

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = String(formData.get('password') || '');
  if (!process.env.DIRETO_ADMIN_PASSWORD) return 'Senha do painel não configurada (DIRETO_ADMIN_PASSWORD).';
  if (!checkPassword(password)) return 'Senha incorreta.';
  (await cookies()).set(ADMIN_COOKIE, adminSessionValue()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/direto',
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect('/direto/admin');
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: '/direto' });
  redirect('/direto/admin');
}

const MAX_PHOTO_BYTES = 900 * 1024;

export async function uploadPhoto(formData: FormData): Promise<{ url?: string; error?: string }> {
  if (!(await isAdmin())) return { error: 'Sessão expirada, entre de novo.' };
  const file = formData.get('file');
  const brandId = String(formData.get('brandId') || 'marca');
  if (!(file instanceof File) || !file.type.startsWith('image/')) return { error: 'Arquivo inválido.' };
  if (file.size > MAX_PHOTO_BYTES) return { error: 'Foto grande demais.' };
  try {
    return { url: await uploadDiretoPhoto(file, brandId) };
  } catch (e) {
    console.error('[direto] upload de foto falhou:', e);
    return { error: 'Não consegui enviar a foto.' };
  }
}

function cleanUrl(raw: string) {
  const v = raw.trim();
  if (!v) return '';
  const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    return new URL(withProto).toString();
  } catch {
    return null;
  }
}

export async function saveConfig(config: DiretoConfig): Promise<{ ok?: true; error?: string }> {
  if (!(await isAdmin())) return { error: 'Sessão expirada, entre de novo.' };

  const brands: DiretoBrand[] = [];
  for (const b of config.brands.slice(0, 12)) {
    const url = cleanUrl(String(b.url || ''));
    if (url === null) return { error: `Link inválido em "${b.name}".` };
    const name = String(b.name || '').trim().slice(0, 60);
    if (!name) return { error: 'Toda marca precisa de um nome.' };
    brands.push({
      id: String(b.id || '').replace(/[^a-z0-9-]/gi, '').slice(0, 40) || `marca-${Date.now()}`,
      name,
      tagline: String(b.tagline || '').trim().slice(0, 90),
      image: String(b.image || '').slice(0, 500),
      url,
      visible: Boolean(b.visible),
    });
  }

  try {
    await saveDiretoConfig({ coupon: String(config.coupon || '').trim().toUpperCase().slice(0, 24), brands });
  } catch (e) {
    console.error('[direto] salvar config falhou:', e);
    return { error: 'Não consegui salvar. Tente de novo.' };
  }
  revalidatePath('/direto');
  return { ok: true };
}
