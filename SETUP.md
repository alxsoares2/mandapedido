# 🚀 Setup - MandaPedido

## Status Atual ✓

O projeto **MandaPedido** foi inicializado com sucesso! Aqui está o que foi criado:

### ✅ Concluído

- [x] Projeto Next.js 16 com TypeScript e Tailwind CSS
- [x] Documentação completa em `CLAUDE.md`
- [x] Variáveis de ambiente configuradas (`.env.local`)
- [x] Dependências instaladas (@supabase/supabase-js, @mercadopago/sdk-js)
- [x] Estrutura de pastas completa
- [x] Componentes base:
  - `BrandGrid.tsx` - Grid das 6 marcas
  - `KioskTimer.tsx` - Timer de inatividade (2 minutos)
- [x] Páginas:
  - `/` - Tela inicial com 6 marcas
  - `/marca/[slug]` - Cardápio por marca
  - `/checkout` - Checkout com nome e telefone
  - `/confirmation` - Confirmação com número do pedido gigante
- [x] Rotas de API:
  - `/api/orders` - POST para criar pedidos
  - `/api/totems` - GET para buscar dados do totem
- [x] Styles customizados para kiosk/touchscreen
- [x] Git inicializado e primeiro commit realizado

---

## 📋 Próximas Etapas

### 1️⃣ Criar Repositório no GitHub

**Opção A: Com GitHub CLI (recomendado)**

```bash
# Instalar GitHub CLI (se não tiver)
winget install GitHub.cli

# Criar repositório
gh repo create mandapedido --public --source=. --remote=origin --push
```

**Opção B: Manual via Web**

1. Acesse https://github.com/new
2. Nome: `mandapedido`
3. Descrição: `Hub de Totem de Autoatendimento`
4. Visibilidade: **Public**
5. Inicialize SEM arquivos README
6. Clique em "Create repository"
7. Execute no terminal (na pasta do projeto):

```bash
git remote add origin https://github.com/SEU_USUARIO/mandapedido.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Criar Tabelas no Supabase

Acesse https://supabase.com e execute os seguintes comandos SQL:

**Tabela: totems**

```sql
CREATE TABLE totems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar dados de exemplo:
INSERT INTO totems (name, address, neighborhood) VALUES
('Shopping Benfica', 'Av. Heráclito Graça, 100 - Benfica', 'Benfica'),
('Shopping Aldeota', 'Av. Dom Luís, 500 - Aldeota', 'Aldeota'),
('Shopping Del Paseo', 'Av. Washington Soares, 85 - Meireles', 'Meireles'),
('Shopping Iguatemi', 'Av. Washington Soares, 4777 - Papicu', 'Papicu'),
('Shopping Sabiazinho', 'Av. Ulisses Guimarães, 450 - Cidade 2000', 'Cidade 2000'),
('Mall Benilson', 'Rua Meton de Alencar, 4 - Benilson', 'Benilson');
```

**Atualizar tabela: orders**

```sql
-- Adicionar colunas se não existirem
ALTER TABLE orders ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS totem_name TEXT;
```

---

### 3️⃣ Deploy na Vercel

1. Acesse https://vercel.com/dashboard
2. Clique em "Add New..." → "Project"
3. Selecione o repositório `mandapedido`
4. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_MP_PUBLIC_KEY`
   - `MP_ACCESS_TOKEN`
5. Clique em "Deploy"
6. Espere o build completar
7. Copie a URL da aplicação (exemplo: https://mandapedido.vercel.app)

---

### 4️⃣ Configurar Domínio (mandapedido.com)

No Vercel:

1. Vá para Project Settings → Domains
2. Clique em "Add Domain"
3. Digite: `mandapedido.com`
4. Atualize os registros DNS do seu registrador de domínio com os valores fornecidos pelo Vercel

---

### 5️⃣ Testar Localmente

```bash
# Instalar dependências (se necessário)
npm install

# Rodar servidor local
npm run dev

# Acessar em:
# http://localhost:3000
# http://localhost:3000/checkout?totem=Shopping%20Benfica
# http://localhost:3000/confirmation?order=ABC123XYZ
```

---

## 📦 Estrutura Final

```
mandapedido/
├── app/
│   ├── api/
│   │   ├── orders/route.ts          ✓ Criar pedidos
│   │   └── totems/route.ts          ✓ Buscar totem
│   ├── marca/[slug]/page.tsx        ✓ Cardápio
│   ├── checkout/page.tsx            ✓ Checkout (Nome + Telefone)
│   ├── confirmation/page.tsx        ✓ Confirmação (Número gigante)
│   ├── layout.tsx                   ✓ Layout com SDK Mercado Pago
│   └── page.tsx                     ✓ Home com 6 marcas
├── components/
│   ├── BrandGrid.tsx                ✓ Grid das marcas
│   └── KioskTimer.tsx               ✓ Timer 2 minutos
├── lib/
│   ├── types.ts                     ✓ TypeScript types
│   ├── constants.ts                 ✓ Dados das 6 marcas
│   ├── supabase.ts                  ✓ Cliente Supabase
│   └── mercadopago.ts               ✓ Config Mercado Pago
├── .env.local                       ✓ Credenciais carregadas
├── CLAUDE.md                        ✓ Documentação completa
├── SETUP.md                         ✓ Este arquivo
├── package.json                     ✓ Dependências instaladas
└── .git/                            ✓ Repository inicializado
```

---

## 🔗 Endpoints de API

### POST /api/orders
Criar novo pedido

**Requisição:**
```json
{
  "customer_name": "João Silva",
  "customer_phone": "(85) 98765-4321",
  "totem_name": "Shopping Benfica",
  "items": [
    {
      "product_id": "123",
      "name": "Pizza Grande",
      "price": 45.90,
      "quantity": 2,
      "image_url": "https://..."
    }
  ],
  "total": 91.80,
  "payment_method": "pix"
}
```

**Resposta:**
```json
{
  "success": true,
  "order_id": "uuid-da-order"
}
```

### GET /api/totems?name=Shopping%20Benfica
Buscar informações do totem

**Resposta:**
```json
{
  "success": true,
  "totem": {
    "id": "uuid",
    "name": "Shopping Benfica",
    "address": "Av. Heráclito Graça, 100",
    "neighborhood": "Benfica",
    "active": true
  }
}
```

---

## 🛠️ Troubleshooting

### "npm run dev" não funciona
```bash
# Tentar limpar cache
rm -rf .next node_modules
npm install
npm run dev
```

### Erro de CORS no Mercado Pago
- Verificar se `NEXT_PUBLIC_MP_PUBLIC_KEY` está correto no `.env.local`
- No Vercel, confirmar variáveis nas Settings → Environment Variables

### Supabase retorna erro de permissão
- Verificar se `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` estão corretos
- Confirmar RLS policies na tabela `orders`

### Totem não encontrado
- Verificar URL: `/checkout?totem=Shopping%20Benfica` (URL encoded)
- Conferir se o nome existe exatamente em `totems` table

---

## 📞 Suporte

- **Issues:** GitHub Issues
- **Slack:** #mandapedido
- **Email:** tech@directmenu.com.br

---

## ✨ Roadmap Futuro

- [ ] Implementar cardápio completo com filtros
- [ ] Carrinho com localStorage
- [ ] Integração Mercado Pago completa (PIX + Cartão)
- [ ] Notificações WhatsApp via Z-API
- [ ] Painel admin integrado
- [ ] Testes E2E com Playwright
- [ ] Analytics e relatórios
- [ ] Modo offline no totem

---

**Projeto criado em:** 2026-08-12  
**Criado por:** Claude Haiku 4.5  
**Status:** 🟢 Pronto para setup no GitHub e Vercel
