# 📦 Instruções de Deploy - Cloudflare Pages

## ✅ Configuração Atual

O projeto está configurado para deploy no Cloudflare Pages com:

- ✅ Diretório de assets: `./public`
- ✅ Configuração SPA: `not_found_handling = "single-page-application"`
- ✅ Scripts no `package.json`

## 🚀 Comandos de Deploy

### Opção 1: Via npm script (Recomendado)

```bash
npm run deploy
```

Este comando executa: `wrangler pages deploy ./public`

### Opção 2: Comando direto

```bash
npx wrangler pages deploy ./public
```

### Opção 3: Deploy via Dashboard do Cloudflare

1. Acesse [Cloudflare Pages](https://pages.cloudflare.com/)
2. Conecte seu repositório Git (GitHub, GitLab, etc.)
3. Configurações:
   - **Build command**: (deixe vazio)
   - **Build output directory**: `public`
4. Clique em **Save and Deploy**

## ⚠️ Solução de Problemas

### Erro: "If are uploading a directory of assets..."

Este erro acontece quando o Wrangler não encontra a configuração de assets.

**Solução:**
1. Verifique se o `wrangler.toml` tem a seção `[assets]`:
   ```toml
   [assets]
   directory = "./public"
   ```

2. Use o comando correto:
   - ✅ `wrangler pages deploy ./public` (correto para Pages)
   - ❌ `wrangler deploy` (este é para Workers, não Pages)

### Erro: "Directory not found"

**Solução:**
1. Verifique se a pasta `public/` existe
2. Verifique se está no diretório raiz do projeto
3. Liste os arquivos: `ls public/` (Linux/Mac) ou `dir public` (Windows)

### Erro: "Authentication required"

**Solução:**
```bash
npx wrangler login
```

Isso abrirá o navegador para autenticar com o Cloudflare.

## 📁 Estrutura Esperada

```
faroldacidadania/
├── public/              ← Diretório de deploy
│   ├── index.html
│   ├── styles.css
│   ├── _redirects
│   └── src/
│       ├── main.js
│       ├── auth.js
│       ├── comments.js
│       ├── ui.js
│       └── firebase-config.js
├── wrangler.toml        ← Configuração do Wrangler
└── package.json         ← Scripts npm
```

## 🔍 Verificação Pós-Deploy

Após o deploy bem-sucedido:

1. ✅ Acesse a URL fornecida pelo Cloudflare
2. ✅ Verifique se a página carrega
3. ✅ Teste a autenticação
4. ✅ Teste os comentários
5. ✅ Verifique o console do navegador (F12) para erros

## 📚 Referências

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Deploying with Wrangler](https://developers.cloudflare.com/pages/platform/deploy-via-wrangler/)

---

**Pronto para deploy!** 🚀

