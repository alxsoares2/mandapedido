'use client';

import { useActionState } from 'react';
import { login } from './actions';

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="da-login">
      <h1>Painel da landing</h1>
      <p>Entre com a senha para editar marcas, fotos e links.</p>
      <input type="password" name="password" placeholder="Senha" autoFocus required className="da-input" />
      {error && <p className="da-error">{error}</p>}
      <button type="submit" disabled={pending} className="da-btn da-btn-primary">
        {pending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
