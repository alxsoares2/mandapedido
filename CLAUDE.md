# MandaPedido — Hub de Totem de Autoatendimento

## 📋 Descrição do Projeto

**MandaPedido** é um hub centralizado de totens de autoatendimento para as marcas do DirectMenu. Permite que clientes façam pedidos em tela touchscreen, sem necessidade de interação com atendente.

- **Domínio:** mandapedido.com
- **Tipo:** Aplicação Next.js fullstack
- **Público:** Clientes finais interagindo com totens em tablet/kiosk
- **Deploy:** Vercel

---

## 🎯 Funcionalidades Principais

### 1. Tela Inicial (/)
- Grade com 6 marcas em cards grandes (touchscreen-friendly)
- Marcas: Basílico Pizzas, Mano Italiano, Mano Cotidiano, Pizza Certa, Okane, Umami
- Design escuro e moderno com fonte grande (>18px)
- Modo tablet landscape
- Modo kiosk: 2 minutos sem interação → volta automaticamente

### 2. Cardápio da Marca (/marca/[slug])
- Filtra por marca e categoria via Supabase
- Grade com fotos grandes, nome e preço
- Botão "Voltar" para tela inicial
- Adicionar itens ao carrinho

### 3. Carrinho
- Resumo de itens
- Aumentar/diminuir quantidade
- Remover items
- Subtotal, taxas e total
- Botão "Finalizar Pedido"

### 4. Checkout (/checkout)
- **Campos:** NOME e TELEFONE apenas
- Endereço fixo vem do parâmetro URL: `?totem=xxx`
- Busca na tabela `totems` do Supabase
- Pagamento: PIX ou Cartão via Mercado Pago
- Integração com mesmas credenciais da Basílico

### 5. Confirmação (/confirmation)
- Número do pedido em destaque gigante
- Volta pra tela inicial após 5 segundos automaticamente

### 6. Modo Kiosk
- Timeout de 2 minutos sem interação em qualquer tela
- Animação suave ao voltar para inicial
- Reseta o timer a cada clique

---

## 🏗️ Estrutura de Pastas

```
mandapedido/
├── app/
│   ├── layout.tsx              # Layout raiz com provider Supabase
│   ├── page.tsx                # Tela inicial (/)
│   ├── marca/
│   │   └── [slug]/
│   │       └── page.tsx        # Cardápio da marca
│   ├── checkout/
│   │   └── page.tsx            # Checkout
│   ├── confirmation/
│   │   └── page.tsx            # Confirmação do pedido
│   └── api/
│       ├── orders/
│       │   └── route.ts        # POST para criar pedidos
│       └── totems/
│           └── route.ts        # GET para buscar dados do totem
├── components/
│   ├── BrandGrid.tsx           # Grid das 6 marcas
│   ├── MenuGrid.tsx            # Grid do cardápio
│   ├── Cart.tsx                # Carrinho (sidebar/modal)
│   ├── KioskTimer.tsx          # Timer de inatividade
│   └── PaymentWidget.tsx       # Widget Mercado Pago
├── lib/
│   ├── supabase.ts             # Client Supabase
│   ├── mercadopago.ts          # Config Mercado Pago
│   ├── types.ts                # TypeScript types
│   └── constants.ts            # Dados das marcas
├── styles/
│   └── globals.css             # Tailwind + custom
├── .env.local                  # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 🔐 Variáveis de Ambiente (.env.local)

```env
# Supabase (compartilhado com Basílico)
NEXT_PUBLIC_SUPABASE_URL=https://uhtofxejnfysquttkhea.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Mercado Pago (compartilhado com Basílico)
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-b08f0dfc-e44a-4d48-b6eb-73c6df090d90
MP_ACCESS_TOKEN=APP_USR-5810778965842670-052714-07885cfd60e7e158d18595b9727c8149-2668641057

# Vercel
VERCEL_URL=https://mandapedido.vercel.app
```

---

## 🗄️ Schema Supabase

### Tabela: `totems`
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
```

### Tabela: `orders` (atualizar)
Adicionar colunas se não existirem:
```sql
ALTER TABLE orders ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS totem_name TEXT;
```

No painel admin da Basílico, pedidos com `source = 'totem'` aparecem com tag `TOTEM: {totem_name}`.

---

## 🚀 Como Rodar Localmente

### Prerequisitos
- Node.js 18+
- npm ou yarn
- Git
- Conta Vercel
- Acesso ao Supabase da Basílico

### Passos

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   - Copiar `.env.example` para `.env.local`
   - Preencher com as credenciais do Supabase e Mercado Pago

3. **Rodar servidor local**
   ```bash
   npm run dev
   ```
   - Acessar http://localhost:3000

---

## 🔗 Integração com DirectMenu

### Pedidos no Painel Admin
Pedidos criados via totem aparecem na Basílico com:
- `source = 'totem'`
- `totem_name = 'Shopping Benfica'`
- Tag visual: **TOTEM: Shopping Benfica**

---

## 🎨 Design & UX

- **Touchscreen-first:** Botões grandes (>48px), spacing generoso
- **Tema escuro:** Fundo preto/cinza-escuro, texto branco
- **Fonte grande:** Corpo texto 18px+, títulos 32px+
- **Modo landscape:** Otimizado para tablets em posição horizontal
- **Animações suaves:** Transições CSS

---

## 📝 Status

- [x] Setup inicial do projeto
- [ ] Criar tabelas no Supabase
- [ ] Tela inicial com 6 marcas
- [ ] Cardápio por marca
- [ ] Carrinho funcional
- [ ] Checkout integrado
- [ ] Modo kiosk
- [ ] Deploy Vercel
