// mago gatuno 3000
// cada gato que lanzas te recuerda tus prioridades

const button = document.getElementById("magicButton");
const arena = document.getElementById("arena");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");

let cats = 0;
let busy = false;

const advertencia = "si no cierras la cuenta habran mas gatos";

const mensajes = [
    "miau magico",
    "gato liberado",
    "eso probablemente era ilegal",
    "el consejo de magos esta preocupado",
    "ya van " + (cats + 1) + " gatos, eh"
];

const coloresPuke = ["#84cc16", "#a3e635", "#65a30d", "#eab308", "#9a3412", "#bef264"];

function setBusy(value) {
    busy = value;
    button.disabled = value;
}

button.addEventListener("click", function () {
    if (busy) return;
    setBusy(true);

    cats = cats + 1;
    scoreText.textContent = "gatos lanzados: " + cats;

    message.textContent =
        mensajes[Math.floor(Math.random() * mensajes.length)];

    lanzarGato();
});

function lanzarGato() {
    const cat = document.createElement("div");
    cat.classList.add("cat");
    cat.textContent = obtenerGato();

    // pequeña variacion de altura cerca del mago
    cat.style.bottom = (Math.random() * 80 + 40) + "px";

    arena.appendChild(cat);

    cat.addEventListener("animationend", function () {
        cat.remove();
        lanzarVomito();
    });
}

function obtenerGato() {
    const gatos = ["🐈", "🐈‍⬛", "😺", "😸", "😹", "😼"];
    return gatos[Math.floor(Math.random() * gatos.length)];
}

function lanzarVomito() {
    const vomito = document.createElement("div");
    vomito.classList.add("vomito");
    vomito.textContent = "🤮";
    arena.appendChild(vomito);

    // partículas de vómito radiales
    for (let i = 0; i < 22; i++) {
        const gota = document.createElement("div");
        gota.classList.add("puke");

        const angulo = (i / 22) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const dist = 90 + Math.random() * 140;
        const tx = Math.cos(angulo) * dist;
        const ty = Math.sin(angulo) * dist + 25;
        const color = coloresPuke[Math.floor(Math.random() * coloresPuke.length)];
        const tam = 12 + Math.random() * 22;

        gota.style.setProperty("--tx", tx + "px");
        gota.style.setProperty("--ty", ty + "px");
        gota.style.setProperty("--puke-color", color);
        gota.style.width = tam + "px";
        gota.style.height = tam + "px";

        arena.appendChild(gota);

        gota.addEventListener("animationend", function () {
            gota.remove();
        });
    }

    vomito.addEventListener("animationend", function () {
        vomito.remove();
        mostrarAlerta();
    });
}

function mostrarAlerta() {
    const aviso = document.createElement("div");
    aviso.classList.add("aviso");

    const texto = document.createElement("span");
    texto.classList.add("aviso-texto");
    texto.textContent = advertencia;
    aviso.appendChild(texto);

    document.body.appendChild(aviso);
    document.body.classList.add("shook");

    aviso.addEventListener("animationend", function () {
        aviso.remove();
        document.body.classList.remove("shook");
        setBusy(false);
    });
}
