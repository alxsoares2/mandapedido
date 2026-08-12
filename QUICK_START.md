# 🚀 Quick Start - MandaPedido

## ⚡ Comece Agora

### 1. Instale e rode localmente (já está pronto!)

```bash
cd C:\Projetos\mandapedido

# Instalar dependências (já foram instaladas, mas se precisar:)
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Acessar em http://localhost:3000
```

### 2. Teste as páginas

| URL | O que faz |
|-----|-----------|
| `http://localhost:3000` | Home com 6 marcas |
| `http://localhost:3000/marca/basilico-pizzas` | Cardápio (exemplo) |
| `http://localhost:3000/checkout?totem=Shopping%20Benfica` | Checkout |
| `http://localhost:3000/confirmation?order=ABC123XYZ` | Confirmação |

### 3. Crie repositório no GitHub

```bash
# Opção A: Com GitHub CLI
gh repo create mandapedido --public --source=. --remote=origin --push

# Opção B: Manual
# 1. Criar em https://github.com/new
# 2. Depois:
git push -u origin main
```

### 4. Configure Supabase

Acesse https://supabase.com e execute em SQL Editor:

```sql
-- Criar tabela totems
CREATE TABLE totems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  active BOOLEAN DEFAULT true
);

-- Inserir dados de exemplo
INSERT INTO totems (name, address, neighborhood) VALUES
('Shopping Benfica', 'Av. Heráclito Graça, 100', 'Benfica'),
('Shopping Aldeota', 'Av. Dom Luís, 500', 'Aldeota');

-- Adicionar colunas na tabela orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS totem_name TEXT;
```

### 5. Deploy na Vercel

1. Acesse https://vercel.com/dashboard
2. "Add New..." → "Project"
3. Selecione repositório `mandapedido`
4. Deploy automático iniciará!

## 📁 Arquivos Principais

```
lib/constants.ts        ← 6 marcas (editar aqui)
app/page.tsx            ← Tela inicial
app/checkout/page.tsx   ← Checkout
.env.local              ← Credenciais (já configuradas)
CLAUDE.md               ← Documentação técnica
SETUP.md                ← Guia completo
```

## 🎯 Checklist de Setup Completo

- [x] Projeto Next.js criado
- [x] Componentes implementados
- [x] Páginas criadas
- [x] APIs pronta
- [x] Git inicializado
- [ ] Repositório GitHub criado
- [ ] Tabelas Supabase criadas
- [ ] Deploy na Vercel
- [ ] Domínio configurado

## 💡 Dicas

### Customizar marcas

Edite `lib/constants.ts`:

```typescript
export const BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Sua Marca',
    slug: 'sua-marca',
    color: '#FF6B35',
    image: '/brands/sua-marca.jpg',
  },
  // ... mais marcas
];
```

### Alterar timeout do kiosk

Edite `lib/constants.ts`:

```typescript
export const KIOSK_TIMEOUT_MINUTES = 2; // Altere para outro número
```

### Alterar tempo de redirect da confirmação

Edite `lib/constants.ts`:

```typescript
export const CONFIRMATION_AUTO_REDIRECT_SECONDS = 5; // Altere para outro número
```

## 🔗 URLs Importantes

- **Projeto Local:** http://localhost:3000
- **Supabase:** https://supabase.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub:** https://github.com
- **Domínio:** mandapedido.com

## 📞 Precisa de ajuda?

- Veja `CLAUDE.md` para documentação técnica
- Veja `SETUP.md` para guia passo a passo
- Verifique `QUICK_START.md` (este arquivo) para referência rápida

## ✨ Próxima feature sugerida

Implementar cardápio completo com:
- Buscar produtos do Supabase
- Adicionar ao carrinho
- Integração PIX do Mercado Pago

---

**Status:** ✅ Pronto para usar!  
**Última atualização:** 2026-08-12
