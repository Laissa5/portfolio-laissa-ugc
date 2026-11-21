# Portfólio UGC — Laissa Almeida

Site de uma página, feito primeiro para celular. Sem instalação, sem mensalidade.

## Pastas

| Pasta / arquivo | O que tem |
|---|---|
| `index.html` | A página (textos fixos: abertura, sobre mim, formatos, contato) |
| `js/conteudo.js` | **O arquivo que você edita**: foto e lista de vídeos |
| `css/estilo.css` | Cores e visual (paleta no topo do arquivo) |
| `img/` | Foto, capas (`img/capas/`), ícone e imagem de prévia do link |
| `videos/` | Seus vídeos `.mp4` |

Para editar, abra o arquivo no Bloco de Notas (botão direito → Abrir com → Bloco de Notas) e salve.

## Prévia x site publicado

- **Prévia**: o endereço termina em `?previa` (ex.: `https://seusite.netlify.app/?previa`).
  Aparecem a faixa "Prévia" e os espaços tracejados da foto e dos vídeos que ainda faltam.
- **Site publicado**: o mesmo endereço **sem** `?previa`. Os espaços tracejados somem sozinhos.
  Enquanto não houver nenhum vídeo, a seção Portfólio fica oculta e o botão da abertura vira "Vamos criar juntos?".

Envie para marcas e suporte só o endereço **sem** `?previa`.

## Adicionar ou trocar a foto

1. Salve a foto vertical (de preferência 1200 px de altura, até 300 KB) como `img/laissa.jpg`.
2. Em `js/conteudo.js`, troque `foto: ""` por `foto: "img/laissa.jpg"`.
3. Para trocar depois, substitua o arquivo com o mesmo nome. O layout não muda.

## Adicionar um vídeo

1. Exporte o vídeo vertical (9:16) em `.mp4`, idealmente até 20 MB. Coloque em `videos/` com um nome sem espaços nem acentos (ex.: `olympikus.mp4`).
2. Coloque a capa (JPG vertical, 720 × 1280) em `img/capas/` (ex.: `olympikus.jpg`).
3. Em `js/conteudo.js`, preencha o projeto:

```js
{
  titulo: "Tênis no treino de perna",
  nicho: "Fitness",
  formato: "Câmera + narração",
  marca: "Olympikus",
  video: "videos/olympikus.mp4",
  capa: "img/capas/olympikus.jpg"
},
```

4. Para um projeto novo (inclusive de viagem, com `nicho: "Viagens"`), copie um bloco `{ ... },` inteiro e cole embaixo do último.
   Todo projeto aparece com o selo **Projeto autoral** e a frase "Produção independente, sem parceria com a [marca]".
5. Publique de novo (veja abaixo).

## Endereço do site

- **Site publicado (este é o link para marcas e suporte):** https://laissa-ugc.netlify.app
- **Prévia com espaços reservados:** https://laissa-ugc.netlify.app/?previa
- Painel (só para você, exige login): app.netlify.com → projeto `laissa-ugc`

Para republicar depois de editar, o jeito mais fácil é pedir ao Claude: "publica de novo o portfólio".
Ou pelo painel: projeto `laissa-ugc` → **Deploys** → arraste a pasta.

## Publicar de graça (Netlify) — referência

Primeira vez:
1. Crie uma conta gratuita em netlify.com (pode entrar com o Google).
2. Acesse **app.netlify.com/drop** e arraste a pasta `portfolio-laissa-ugc` inteira para a página.
3. Em **Site configuration → Change site name**, escolha um nome, por exemplo `laissa-ugc`. O endereço fica `https://laissa-ugc.netlify.app`.
4. O `index.html` já aponta para `laissa-ugc.netlify.app`. Se o nome do site for outro, troque esse endereço nas linhas `og:image`, `og:url` e `canonical` e publique de novo. Isso faz a imagem de prévia aparecer no WhatsApp.

Para atualizar depois: no painel do site, abra **Deploys** e arraste a pasta de novo. O endereço continua o mesmo.

## Antes de mandar o link

- Abra o endereço (sem `?previa`) numa **janela anônima**: tem que abrir direto no portfólio, sem login.
- No celular: dê play em cada vídeo (com som só quando você tocar), toque em **Enviar e-mail**, **WhatsApp** e **Instagram**.
