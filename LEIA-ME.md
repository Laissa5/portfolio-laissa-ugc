# Portfólio UGC — Laissa Almeida

Site de uma página, feito primeiro para celular, com movimentos leves e fotos de Maceió.

## Endereços

- **Site publicado (link para marcas e suporte):** https://laissa-ugc.netlify.app
- **Prévia com espaços reservados:** https://laissa-ugc.netlify.app/?previa (não envie para marcas)
- **Painel de edição:** https://laissa-ugc.netlify.app/admin (entra com o GitHub @Laissa5)

## Como colocar um vídeo novo (pelo painel)

1. Abra **laissa-ugc.netlify.app/admin** e clique em **Login with GitHub**.
2. Entre em **Portfólio → Meus vídeos**.
3. Em um projeto existente (ou em **Adicionar projeto**), preencha:
   - **Título curto**, **Nicho** (Fitness, Beleza, Lifestyle ou Viagens), **Formato**
   - **Marca que aparece no vídeo** (o site escreve sozinho: "Produção independente, sem parceria com a [marca]")
   - **Vídeo**: arquivo .mp4 vertical, de preferência até 25 MB
   - **Capa**: imagem vertical 720 × 1280
4. Clique em **Publicar** (no topo). Em cerca de 1 minuto o site atualiza.

Todo projeto aparece com o selo **Projeto autoral**. Projeto sem vídeo fica escondido no site publicado
e aparece só na prévia (`?previa`). Para mudar a ordem, arraste os projetos na lista.

## Como colocar ou trocar a sua foto e os textos

Painel → **Portfólio → Foto e textos**: envie a foto vertical, ajuste a frase da abertura e o "Sobre mim"
(deixe uma linha em branco entre os parágrafos) e clique em **Publicar**.
Enquanto não houver foto, o espaço dela não aparece no site publicado.

## Dicas para os arquivos

- Vídeo: grave na vertical (9:16). Se passar de 25 MB, exporte de novo em 1080p ou use um compressor.
- Foto: vertical, luz natural, até 1 MB.
- Nomes de arquivo sem espaços nem acentos ajudam (ex.: `olympikus.mp4`).

## Pastas do projeto

| Pasta / arquivo | O que tem |
|---|---|
| `content/projetos.json` | Lista de vídeos (editada pelo painel) |
| `content/perfil.json` | Foto, frase da abertura e Sobre mim (editados pelo painel) |
| `index.html`, `css/`, `js/` | Layout, cores e movimentos |
| `img/maceio/` | Fotos de Maceió (Unsplash, uso gratuito) |
| `img/uploads/`, `img/capas/`, `videos/` | Arquivos enviados pelo painel |
| `admin/` | Configuração do painel (Decap CMS) |

## Créditos das fotos de Maceió (Licença Unsplash)

- Veleiros: William Freitas — unsplash.com/photos/ay4VdUzz0IY
- Coqueiro em Ipioca: Cauã Cardoso — unsplash.com/photos/DLhBbEOz1uw
- Pôr do sol na Ponta Verde: André Magalhães — unsplash.com/photos/-M2wNiEJwvU
