# 🏛️ Faro da Cidadania

Aplicação de participação cidadã com sistema de comentários. Projeto simples, rápido e fácil de manter, usando **Cloudflare Pages** + **Firebase**.

## 🏗️ Arquitetura

- **Google Sites**: Página vitrine/landing (opcional)
- **Cloudflare Pages**: Hospedagem do app JS (CDN global)
- **Firebase Auth**: Autenticação de usuários
- **Firestore**: Banco de dados para comentários

## 📁 Estrutura do Projeto

```
faroldacidadania/
├── public/              # Arquivos estáticos (servidos pelo Cloudflare Pages)
│   ├── index.html      # Página principal
│   └── styles.css      # Estilos
├── src/                # Código JavaScript
│   ├── main.js         # Arquivo principal (coordena tudo)
│   ├── auth.js         # Módulo de autenticação (Firebase Auth)
│   ├── comments.js     # Módulo de comentários (Firestore)
│   ├── ui.js           # Módulo de interface
│   ├── firebase-config.js        # Configuração do Firebase (você cria)
│   └── firebase-config.js.example # Template de configuração
├── package.json        # Dependências do projeto
├── wrangler.toml       # Configuração do Cloudflare (dev)
└── README.md           # Este arquivo
```

## 🚀 Configuração Inicial

### 1. Configurar Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto (ou use um existente)
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Na seção "Seus apps", clique em **Adicionar app** > **Web** (`</>`)
5. Copie as credenciais de configuração
6. Copie o arquivo de exemplo:
   ```bash
   cp src/firebase-config.js.example src/firebase-config.js
   ```
7. Cole suas credenciais em `src/firebase-config.js`

### 2. Configurar Firestore

1. No Firebase Console, vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha o modo **Modo de produção** (ou teste para desenvolvimento)
4. Selecione uma localização (ex: `southamerica-east1` para Brasil)
5. Crie as regras de segurança (veja abaixo)

#### Regras de Segurança do Firestore

Para desenvolvimento/teste, use estas regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Comentários: qualquer um autenticado pode ler, apenas o autor pode escrever
    match /comments/{commentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.user_id;
    }
  }
}
```

**⚠️ IMPORTANTE**: Para produção, ajuste as regras conforme sua necessidade de segurança.

### 3. Configurar Firebase Authentication

1. No Firebase Console, vá em **Authentication**
2. Clique em **Começar**
3. Na aba **Sign-in method**, habilite **Email/Senha**
4. Ative a opção e salve

### 4. Instalar Dependências

```bash
npm install
```

## 💻 Desenvolvimento Local

```bash
npm run dev
```

Isso inicia um servidor local na porta padrão do Wrangler (geralmente `http://localhost:8788`).

## 📦 Deploy no Cloudflare Pages

### Opção 1: Via CLI (Wrangler)

1. Instale o Wrangler globalmente (se ainda não tiver):
   ```bash
   npm install -g wrangler
   ```

2. Faça login no Cloudflare:
   ```bash
   wrangler login
   ```

3. Faça o deploy:
   ```bash
   npm run deploy
   ```

### Opção 2: Via Dashboard do Cloudflare

1. Acesse [Cloudflare Pages](https://pages.cloudflare.com/)
2. Clique em **Create a project**
3. Conecte seu repositório Git (GitHub, GitLab, etc.)
4. Configure o build:
   - **Build command**: (deixe vazio - não precisa build)
   - **Build output directory**: `public`
5. Clique em **Save and Deploy**

### Opção 3: Via Git (Automático)

1. Conecte o repositório ao Cloudflare Pages
2. Toda vez que você fizer push para a branch principal, o deploy acontece automaticamente

## 🔗 Integração com Google Sites

### Opção 1: Iframe (Recomendado)

1. No Google Sites, adicione um elemento **Incorporar** (Embed)
2. Cole a URL do seu app no Cloudflare Pages
3. Ajuste o tamanho do iframe conforme necessário

### Opção 2: Link Externo

1. Adicione um botão no Google Sites
2. Configure o link para apontar para seu app no Cloudflare Pages
3. Abre em nova aba

### Exemplo de iframe:

```html
<iframe 
  src="https://seu-app.pages.dev" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border-radius: 8px;">
</iframe>
```

## 📝 Funcionalidades

- ✅ Autenticação com e-mail e senha
- ✅ Registro de novos usuários
- ✅ Sistema de comentários em tempo real
- ✅ Interface responsiva e moderna
- ✅ Validação de formulários
- ✅ Mensagens de erro amigáveis
- ✅ Proteção contra XSS (escape de HTML)

## 🔒 Segurança

- Senhas são hasheadas pelo Firebase (nunca armazenadas em texto)
- Autenticação via Firebase Auth (JWT tokens)
- Regras de segurança no Firestore
- Escape de HTML para prevenir XSS
- Validação de entrada no frontend e backend

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `public/styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --secondary-color: #64748b;
    /* ... */
}
```

### Textos

Edite os textos diretamente em `public/index.html`.

## 🐛 Troubleshooting

### Erro: "Firebase: Error (auth/configuration-not-found)"

- Verifique se você criou o arquivo `src/firebase-config.js`
- Confirme se todas as credenciais estão corretas

### Erro: "Permission denied" no Firestore

- Verifique as regras de segurança do Firestore
- Confirme se o usuário está autenticado

### Comentários não aparecem

- Verifique o console do navegador (F12) para erros
- Confirme se a coleção `comments` existe no Firestore
- Verifique as regras de segurança

## 📚 Recursos

- [Firebase Documentation](https://firebase.google.com/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## 📄 Licença

MIT

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e pull requests!

---

**Desenvolvido com ❤️ para facilitar a participação cidadã**

