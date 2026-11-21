/* Monta foto, textos e vídeos a partir de content/*.json (editados pelo painel /admin). Não precisa editar este arquivo. */
(function () {
  // Prévia: endereço local, ou qualquer endereço terminado em ?previa
  var PREVIA = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) ||
               new URLSearchParams(location.search).has("previa");
  var SEM_MOVIMENTO = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (PREVIA) document.getElementById("aviso-previa").hidden = false;

  function el(tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto) n.textContent = texto;
    return n;
  }
  function carregar(url) {
    return fetch(url, { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; });
  }

  /* ---------- Revelar ao rolar ---------- */
  var observador = ("IntersectionObserver" in window) ? new IntersectionObserver(function (itens) {
    itens.forEach(function (i) { if (i.isIntersecting) { i.target.classList.add("visivel"); observador.unobserve(i.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  function revelar(no) {
    if (observador && !SEM_MOVIMENTO) observador.observe(no); else no.classList.add("visivel");
  }
  document.querySelectorAll(".revelar").forEach(revelar);

  /* ---------- Parallax leve ---------- */
  var parallax = [].slice.call(document.querySelectorAll("[data-parallax]"));
  if (!SEM_MOVIMENTO && parallax.length) {
    var pedido = false;
    var atualizar = function () {
      pedido = false;
      var meio = innerHeight / 2;
      parallax.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        var desloc = (r.top + r.height / 2 - meio) * parseFloat(img.dataset.parallax);
        img.style.transform = "translate3d(0," + desloc.toFixed(1) + "px,0)";
      });
    };
    addEventListener("scroll", function () { if (!pedido) { pedido = true; requestAnimationFrame(atualizar); } }, { passive: true });
    atualizar();
  }

  /* ---------- Foto e textos (content/perfil.json) ---------- */
  var foto = document.getElementById("foto");
  var fotoImg = document.getElementById("foto-img");

  function semFoto() {
    if (PREVIA) { foto.hidden = false; foto.classList.add("reservado"); }
    else foto.hidden = true;
  }

  carregar("content/perfil.json").then(function (perfil) {
    if (perfil.foto) {
      fotoImg.src = perfil.foto;
      fotoImg.alt = perfil.fotoDescricao || "Laissa Almeida";
      fotoImg.addEventListener("error", semFoto);
      foto.hidden = false;
    } else semFoto();

    if (perfil.frase) document.getElementById("frase").textContent = perfil.frase;

    if (perfil.sobre) {
      var alvo = document.getElementById("sobre-texto");
      alvo.textContent = "";
      perfil.sobre.split(/\n\s*\n/).forEach(function (par) {
        if (par.trim()) alvo.appendChild(el("p", "", par.trim()));
      });
    }
  });

  /* ---------- Portfólio (content/projetos.json) ---------- */
  var grade = document.getElementById("grade");
  var filtros = document.getElementById("filtros");

  function montarCard(p, i) {
    var card = el("article", "card revelar");
    card.style.setProperty("--d", (i % 3) * 0.1 + "s");
    card.dataset.nicho = p.nicho || "";
    var midia = el("div", "card-midia");

    if (p.video) {
      var v = document.createElement("video");
      v.src = p.video;
      v.controls = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.preload = p.capa ? "none" : "metadata";
      if (p.capa) v.poster = p.capa;
      v.setAttribute("aria-label", "Vídeo: " + (p.titulo || ""));
      midia.appendChild(v);
    } else {
      card.classList.add("reservado");
      midia.appendChild(el("p", "", "Vídeo em gravação\n(espaço visível só na prévia)"));
    }
    midia.appendChild(el("span", "selo", "Projeto autoral"));
    card.appendChild(midia);

    card.appendChild(el("h3", "", p.titulo || ""));
    var info = el("p", "card-info");
    info.appendChild(el("span", "card-nicho", p.nicho || ""));
    if (p.formato) info.appendChild(document.createTextNode(" · " + p.formato));
    card.appendChild(info);
    card.appendChild(el("p", "card-nota", p.marca
      ? "Produção independente, sem parceria com a " + p.marca + "."
      : "Produção independente, sem parceria com marcas."));
    return card;
  }

  carregar("content/projetos.json").then(function (dados) {
    var projetos = (dados.projetos || []).filter(function (p) { return p.video || PREVIA; });

    if (projetos.length === 0) {
      // Ainda sem vídeos publicados: esconde a seção e o botão leva ao contato
      document.getElementById("portfolio").hidden = true;
      document.getElementById("botao-abertura").href = "#contato";
      document.getElementById("botao-abertura-texto").textContent = "Vamos criar juntos?";
      return;
    }

    projetos.forEach(function (p, i) {
      var card = montarCard(p, i);
      grade.appendChild(card);
      revelar(card);
    });
    grade.dataset.qtd = String(projetos.length);

    // Só um vídeo toca por vez
    grade.addEventListener("play", function (e) {
      grade.querySelectorAll("video").forEach(function (v) { if (v !== e.target) v.pause(); });
    }, true);

    // Filtros por nicho (aparecem com 2 nichos ou mais)
    var nichos = [];
    projetos.forEach(function (p) { if (p.nicho && nichos.indexOf(p.nicho) === -1) nichos.push(p.nicho); });
    if (nichos.length < 2) return;

    filtros.hidden = false;
    ["Todos"].concat(nichos).forEach(function (n, i) {
      var b = el("button", "filtro", n);
      b.type = "button";
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        filtros.querySelectorAll(".filtro").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        var visiveis = 0;
        grade.querySelectorAll(".card").forEach(function (c) {
          var mostrar = n === "Todos" || c.dataset.nicho === n;
          c.hidden = !mostrar;
          if (mostrar) visiveis++;
        });
        grade.dataset.qtd = String(visiveis);
      });
      filtros.appendChild(b);
    });
  });
})();
