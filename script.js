const menuBotao = document.getElementById("menuBotao");
const menu = document.getElementById("menu");
const formContato = document.getElementById("formContato");
const statusFormulario = document.getElementById("statusFormulario");

const emailEquipe = "jonathanschumacher118@gmail.com";

menuBotao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");

    menuBotao.setAttribute("aria-expanded", aberto);
    menuBotao.textContent = aberto ? "✕" : "☰";
});

menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        menuBotao.setAttribute("aria-expanded", "false");
        menuBotao.textContent = "☰";
    });
});

formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!formContato.checkValidity()) {
        formContato.reportValidity();
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const instituicao = document.getElementById("instituicao").value.trim();
    const assunto = document.getElementById("assunto").value;
    const textoMensagem = document.getElementById("mensagem").value.trim();

    const texto = `
Nome: ${nome}
E-mail para resposta: ${email}
Instituição/empresa: ${instituicao || "Não informado"}

Mensagem:
${textoMensagem}
`;

    const linkEmail = "mailto:" + emailEquipe
        + "?subject=" + encodeURIComponent("SafeWall - " + assunto)
        + "&body=" + encodeURIComponent(texto);

    statusFormulario.textContent =
        "Abrindo seu aplicativo de e-mail para você enviar a mensagem...";

    window.location.href = linkEmail;
});

const elementos = document.querySelectorAll(
    ".secao, .faixa-preco, .chamada, .problema"
);

elementos.forEach(function (elemento) {
    elemento.classList.add("revelar");
});

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        function (entradas, observador) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    elementos.forEach(function (elemento) {
        observador.observe(elemento);
    });
} else {
    elementos.forEach(function (elemento) {
        elemento.classList.add("visivel");
    });
}
