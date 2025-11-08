# ⚡ Configuração Rápida - Faro da Cidadania

Guia passo a passo para colocar o app no ar em **menos de 30 minutos**.

## 📋 Checklist

- [ ] Criar projeto no Firebase
- [ ] Configurar Firebase Auth
- [ ] Configurar Firestore
- [ ] Copiar credenciais para o projeto
- [ ] Instalar dependências
- [ ] Testar localmente
- [ ] Fazer deploy no Cloudflare Pages
- [ ] Integrar no Google Sites (opcional)

## 🚀 Passo a Passo

### 1. Firebase (15 min)

#### 1.1. Criar Projeto

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **Adicionar projeto**
3. Nome do projeto: `faroldacidadania` (ou outro)
4. Desative o Google Analytics (opcional)
5. Clique em **Criar projeto**

#### 1.2. Configurar Authentication

1. No menu lateral, clique em **Authentication**
2. Clique em **Começar**
3. Na aba **Sign-in method**, clique em **Email/Senha**
4. **Ative** a primeira opção (Email/Senha)
5. Clique em **Salvar**

#### 1.3. Configurar Firestore

1. No menu lateral, clique em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Modo de produção** (ou teste para dev)
4. Selecione uma localização: `southamerica-east1` (São Paulo)
5. Clique em **Habilitar**

#### 1.4. Configurar Regras do Firestore

1. Na aba **Regras** do Firestore
2. Cole as regras do arquivo `firestore.rules` deste projeto
3. Clique em **Publicar**

#### 1.5. Obter Credenciais

1. Clique no ícone de **engrenagem** (⚙️) > **Configurações do projeto**
2. Role até **Seus apps**
3. Clique no ícone **Web** (`</>`)
4. Nome do app: `Faro da Cidadania Web`
5. **NÃO** marque "Também configurar o Firebase Hosting"
6. Clique em **Registrar app**
7. **Copie** o objeto de configuração que aparece (firebaseConfig)

### 2. Configurar o Projeto Local (5 min)

#### 2.1. Copiar Credenciais

1. Abra o arquivo `public/src/firebase-config.js.example`
2. Copie para `public/src/firebase-config.js`
3. Cole as credenciais do Firebase:

```javascript
export const firebaseConfig = {
  apiKey: "AIza...", // Cole sua API Key
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

#### 2.2. Instalar Dependências

```bash
npm install
```

### 3. Testar Localmente (5 min)

```bash
npm run dev
```

Abra `http://localhost:8788` no navegador e teste:

- [ ] Criar uma conta
- [ ] Fazer login
- [ ] Publicar um comentário
- [ ] Ver comentários aparecendo em tempo real

### 4. Deploy no Cloudflare Pages (5 min)

#### Opção A: Via CLI

1. Instale o Wrangler (se ainda não tiver):
   ```bash
   npm install -g wrangler
   ```

2. Faça login:
   ```bash
   wrangler login
   ```

3. Faça o deploy:
   ```bash
   npm run deploy
   ```

4. Anote a URL que aparece (ex: `https://faroldacidadania.pages.dev`)

#### Opção B: Via Dashboard

1. Acesse [Cloudflare Pages](https://pages.cloudflare.com/)
2. Clique em **Create a project**
3. Conecte seu repositório Git (GitHub/GitLab)
4. Configurações:
   - **Build command**: (deixe vazio)
   - **Build output directory**: `public`
5. Clique em **Save and Deploy**
6. Aguarde o deploy completar
7. Anote a URL do projeto

### 5. Configurar Domínios no Firebase (2 min)

1. No Firebase Console, vá em **Authentication** > **Settings**
2. Role até **Authorized domains**
3. Clique em **Add domain**
4. Adicione o domínio do Cloudflare Pages (ex: `seu-app.pages.dev`)
5. Se for usar Google Sites, adicione também `sites.google.com`

### 6. Integrar no Google Sites (Opcional)

Siga o guia em `INTEGRACAO_GOOGLE_SITES.md`

## ✅ Pronto!

Seu app está no ar! 🎉

## 🐛 Problemas Comuns

### Erro: "Firebase: Error (auth/configuration-not-found)"

**Solução**: Verifique se você criou o arquivo `src/firebase-config.js` com as credenciais corretas.

### Erro: "Permission denied" no Firestore

**Solução**: 
1. Verifique se as regras do Firestore estão configuradas corretamente
2. Confirme que o usuário está autenticado antes de tentar criar comentários

### O app não carrega no Cloudflare Pages

**Solução**:
1. Verifique se o diretório de build está correto (`public`)
2. Confirme que todos os arquivos estão no repositório
3. Verifique os logs do deploy no Cloudflare Dashboard

### Iframe não funciona no Google Sites

**Solução**:
1. Adicione `sites.google.com` aos domínios autorizados do Firebase
2. Verifique se a URL do Cloudflare Pages está correta
3. Teste abrindo a URL diretamente no navegador primeiro

## 📚 Próximos Passos

- Personalizar cores e textos
- Adicionar mais funcionalidades (editar/deletar comentários)
- Configurar domínio customizado no Cloudflare
- Adicionar moderacao de comentários

## 🆘 Precisa de Ajuda?

- Consulte o `README.md` completo
- Verifique a documentação do [Firebase](https://firebase.google.com/docs)
- Verifique a documentação do [Cloudflare Pages](https://developers.cloudflare.com/pages/)

---

**Tempo total estimado: ~30 minutos** ⏱️

