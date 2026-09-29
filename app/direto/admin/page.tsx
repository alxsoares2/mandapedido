import type { Metadata } from 'next';
import { getDiretoConfig, isAdmin } from '@/lib/direto';
import LoginForm from './LoginForm';
import Editor from './Editor';
import './admin.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Painel da landing | MandaPedido',
  robots: { index: false, follow: false },
};

export default async function DiretoAdminPage() {
  if (!(await isAdmin())) {
    return (
      <main className="dp da">
        <LoginForm />
      </main>
    );
  }
  const config = await getDiretoConfig();
  return (
    <main className="dp da">
      <Editor initial={config} />
    </main>
  );
}
