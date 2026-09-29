import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_CONFIG, type DiretoConfig } from '@/app/direto/brands';

// Client server-side com service role (mesmo padrão de lib/etiquetas.ts).
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const DIRETO_BUCKET = 'direto';
const CONFIG_PATH = 'config.json';

export async function getDiretoConfig(): Promise<DiretoConfig> {
  const { data, error } = await supabaseAdmin.storage.from(DIRETO_BUCKET).download(CONFIG_PATH);
  if (error || !data) return DEFAULT_CONFIG;
  try {
    const parsed = JSON.parse(await data.text()) as DiretoConfig;
    if (!Array.isArray(parsed.brands)) return DEFAULT_CONFIG;
    return parsed;
  } catch {
    return DEFAULT_CONFIG;
  }
}

// Cria o bucket público na primeira gravação (não existe até o painel ser usado).
async function ensureBucket() {
  const { data } = await supabaseAdmin.storage.getBucket(DIRETO_BUCKET);
  if (data) return;
  const { error } = await supabaseAdmin.storage.createBucket(DIRETO_BUCKET, { public: true });
  if (error && !/already exists/i.test(error.message)) throw error;
}

export async function saveDiretoConfig(config: DiretoConfig) {
  await ensureBucket();
  const body = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const { error } = await supabaseAdmin.storage
    .from(DIRETO_BUCKET)
    .upload(CONFIG_PATH, body, { upsert: true, contentType: 'application/json', cacheControl: '0' });
  if (error) throw error;
}

export async function uploadDiretoPhoto(file: File, brandId: string): Promise<string> {
  await ensureBucket();
  const safeId = brandId.replace(/[^a-z0-9-]/gi, '').slice(0, 40) || 'marca';
  const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
  const path = `fotos/${safeId}-${Date.now()}.${ext}`;
  const { error } = await supabaseAdmin.storage
    .from(DIRETO_BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: '31536000' });
  if (error) throw error;
  return supabaseAdmin.storage.from(DIRETO_BUCKET).getPublicUrl(path).data.publicUrl;
}

// --- Autenticação simples do painel (senha única em DIRETO_ADMIN_PASSWORD) ---

export const ADMIN_COOKIE = 'direto_admin';

function sessionToken() {
  const password = process.env.DIRETO_ADMIN_PASSWORD;
  if (!password) return null;
  return createHmac('sha256', password).update('direto-admin-v1').digest('hex');
}

export function checkPassword(input: string) {
  const password = process.env.DIRETO_ADMIN_PASSWORD;
  if (!password) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function adminSessionValue() {
  return sessionToken();
}

export async function isAdmin() {
  const expected = sessionToken();
  if (!expected) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
