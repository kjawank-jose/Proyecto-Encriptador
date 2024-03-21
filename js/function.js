const inputMensaje = document.querySelector("#mensaje");
const inputResultado = document.querySelector("#resultado");

const btnEncriptar = document.querySelector("#encriptar");
const btnDesencriptar = document.querySelector("#desencriptar");
const btnCopiar = document.querySelector("#copiar");
const btnEscuchar = document.querySelector("#escuchar");

const tarjeta1 = document.querySelector(".num1");

function validarMensaje() {
    // Limpiar errores previos
    let erroresPrevios = tarjeta1.querySelectorAll(".error");
    for (let err of erroresPrevios) {
        tarjeta1.removeChild(err);
    }

    var mensaje = inputMensaje.value;
    let mensajeError = document.createDocumentFragment();
    let letrasMayusculas = new Set();
    let numeros = new Set();
    let caracteresEspeciales = new Set();

    // Verificar letras mayúsculas, números y caracteres especiales
    for (let letra of mensaje) {
        if (letra !== letra.toLowerCase() && letra !== " ") {
            letrasMayusculas.add(letra);
        }
        if (!isNaN(parseInt(letra))) {
            numeros.add(letra);
        }
        if (!letra.match(/[a-zñ\s]/i) && isNaN(parseInt(letra))) {
            caracteresEspeciales.add(letra);
        }
    }

    // Construir mensaje de error
    let errorMessage = "";
    if (letrasMayusculas.size > 0) {
        errorMessage += `<li>Letras mayúsculas: ${[...letrasMayusculas].join(', ')}.</li>`;
    }
    if (numeros.size > 0) {
        errorMessage += `<li>Números: ${[...numeros].join(', ')}.</li>`;
    }
    if (caracteresEspeciales.size > 0) {
        errorMessage += `<li>Caracteres especiales: ${[...caracteresEspeciales].join(', ')}.</li>`;
    }

    // Mostrar mensaje de error si hay errores
    if (errorMessage !== "") {
        let ul = document.createElement("ul");
        ul.setAttribute("class", "error");
        ul.innerHTML = ` &#128712 Se han ingresado los siguientes caracteres no permitidos:<br>${errorMessage}Por favor, ingrese solo letras minúsculas y espacios.`;

        // Agregar margen de separación al contenedor de la lista
        ul.style.margin = "30px 20px";

        mensajeError.appendChild(ul);
        tarjeta1.appendChild(mensajeError);
        return false;
    }

    return true;
}

function encriptar() {
    if (!validarMensaje()) return;

    let mensaje = inputMensaje.value;
    let mensajeEncriptado = mensaje
        .replaceAll("e", "enter")
        .replaceAll("i", "imes")
        .replaceAll("o", "ober")
        .replaceAll("a", "ai")
        .replaceAll("u", "ufat");

    inputResultado.value = mensajeEncriptado;
}

function desencriptar() {
    let mensajeEncriptado = inputMensaje.value;
    let mensaje = mensajeEncriptado
        .replaceAll("ufat", "u")
        .replaceAll("ai", "a")
        .replaceAll("ober", "o")
        .replaceAll("imes", "i")
        .replaceAll("enter", "e");

    inputResultado.value = mensaje;
}


function copiar() {
    let mensajeEncriptado = inputResultado.value;
    navigator.clipboard.writeText(mensajeEncriptado);
    inputMensaje.value = "";
    inputMensaje.focus();
    alert("Texto copiado exitosamente");
}

function escuchar() {
    let mensajeEncriptado = inputResultado.value;
    let msg = new SpeechSynthesisUtterance();
    msg.text = mensajeEncriptado;
    msg.lang = "es-ES";
    window.speechSynthesis.speak(msg);
}

btnEncriptar.addEventListener("click", encriptar);
btnDesencriptar.addEventListener("click", desencriptar);
btnCopiar.addEventListener("click", copiar);
btnEscuchar.addEventListener("click", escuchar);
