# 🔗 Integração com Google Sites

Este guia mostra como integrar o app **Faro da Cidadania** no Google Sites.

## 📋 Pré-requisitos

1. App já deployado no Cloudflare Pages (você terá uma URL como `https://seu-app.pages.dev`)
2. Acesso de edição ao Google Sites

## 🎯 Opção 1: Iframe (Recomendado)

### Passo a passo:

1. **No Google Sites**, clique em **Editar** (lápis)
2. Na página onde quer adicionar o app, clique em **Inserir** (lado esquerdo)
3. Procure por **Incorporar** ou **Embed**
4. Selecione **Incorporar código**
5. Cole o código abaixo, substituindo `SUA_URL_DO_CLOUDFLARE` pela URL do seu app:

```html
<iframe 
  src="https://SUA_URL_DO_CLOUDFLARE.pages.dev" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>
```

6. Clique em **Inserir**
7. Ajuste o tamanho do iframe arrastando as bordas
8. **Publicar** o site

### Exemplo com altura responsiva:

```html
<div style="position: relative; padding-bottom: 100%; height: 0; overflow: hidden;">
  <iframe 
    src="https://SUA_URL_DO_CLOUDFLARE.pages.dev" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    frameborder="0">
  </iframe>
</div>
```

## 🎯 Opção 2: Link/Botão Externo

Se preferir que o app abra em uma nova aba:

1. **No Google Sites**, adicione um **Botão** ou **Link**
2. Configure:
   - **Texto**: "Participar e Comentar" ou "Entrar"
   - **Link**: URL do seu app no Cloudflare Pages
   - **Abrir em nova aba**: ✅ Sim
3. **Publicar** o site

## 🎯 Opção 3: Página Dedicada no Google Sites

1. Crie uma **nova página** no Google Sites
2. Adicione o iframe conforme a Opção 1
3. No menu principal, adicione um link para esta página
4. **Publicar** o site

## 🔒 Configurações de Segurança

### CORS e Permissões

O Cloudflare Pages, por padrão, permite que o conteúdo seja incorporado em iframes. Se você encontrar problemas:

1. Verifique se o app está acessível publicamente
2. Confirme que não há políticas de segurança bloqueando iframes

### Firebase e Domínios Autorizados

No **Firebase Console**:

1. Vá em **Authentication** > **Settings** > **Authorized domains**
2. Adicione o domínio do Google Sites (ex: `sites.google.com`)
3. Adicione também o domínio do Cloudflare Pages (ex: `seu-app.pages.dev`)

## 🎨 Personalização do Iframe

### Largura fixa:

```html
<iframe 
  src="https://SUA_URL_DO_CLOUDFLARE.pages.dev" 
  width="900px" 
  height="800px" 
  frameborder="0">
</iframe>
```

### Largura responsiva (recomendado):

```html
<iframe 
  src="https://SUA_URL_DO_CLOUDFLARE.pages.dev" 
  width="100%" 
  height="800px" 
  frameborder="0"
  scrolling="auto">
</iframe>
```

### Sem bordas e com sombra:

```html
<iframe 
  src="https://SUA_URL_DO_CLOUDFLARE.pages.dev" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>
```

## 📱 Mobile

O app já é responsivo, então funciona bem em dispositivos móveis dentro do iframe. Para melhor experiência no mobile:

1. Use altura maior no iframe (ex: `1000px`)
2. Ou use a versão responsiva com padding-bottom

## 🐛 Troubleshooting

### O iframe não carrega

- Verifique se a URL do Cloudflare Pages está correta
- Confirme que o app está deployado e acessível
- Abra a URL diretamente no navegador para testar

### Erro de autenticação no iframe

- Verifique os domínios autorizados no Firebase Console
- Adicione `sites.google.com` e seu domínio do Cloudflare

### O iframe está muito pequeno/grande

- Ajuste os valores de `width` e `height`
- No Google Sites, você também pode redimensionar arrastando as bordas

## 💡 Dicas

1. **Teste primeiro**: Sempre teste o iframe em uma página de teste antes de publicar
2. **Altura adequada**: Use altura suficiente para que os usuários não precisem rolar muito dentro do iframe
3. **Mobile first**: Teste no mobile para garantir que funciona bem
4. **Performance**: O Cloudflare Pages é rápido, mas o iframe pode adicionar um leve delay

## 📚 Recursos

- [Google Sites Help](https://support.google.com/sites/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Firebase Auth - Authorized Domains](https://firebase.google.com/docs/auth/web/domain-verification)

---

**Pronto!** Seu app está integrado ao Google Sites. 🎉

