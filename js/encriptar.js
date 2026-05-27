
var mensaje = document.getElementById("mensaje") || document.querySelector(".mensaje");
var salida = document.getElementById("salida") || document.querySelector(".salida");
var card1 = document.querySelector(".card1");
var card2 = document.querySelector(".card2");
var toasts = document.getElementById('toasts');
card2.classList.add('hidden');

function showToast(text, options = {}){
    if(!toasts) return alert(text);
    const node = document.createElement('div');
    node.className = 'toast';
    node.textContent = text;
    toasts.appendChild(node);
    setTimeout(()=>{node.style.opacity = '0'; node.addEventListener('transitionend', ()=> node.remove());}, 2500);
    setTimeout(()=>{ if (toasts.contains(node)) node.remove(); },5000);
}
/* Encriptador */

// Boton encriptar

function btnEncriptar() {
    if (!mensaje || mensaje.value.length == 0) {
        showToast("No se ha encontrado ningún texto para encriptar");
        return;
    }
    const textoEncriptado = encriptar(mensaje.value);
    salida.value = textoEncriptado;
    card2.classList.remove('hidden');
    card1.classList.add('hidden');
    mensaje.value = "";
    showToast("Texto encriptado");
}

// Funcion encriptar

function encriptar(stringAEncriptar){
    let matrizCodigo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    stringAEncriptar = stringAEncriptar.toLowerCase();
    for (let i = 0; i < matrizCodigo.length; i++) {
        if(stringAEncriptar.includes(matrizCodigo[i][0])) {
            stringAEncriptar = stringAEncriptar.replaceAll(matrizCodigo[i][0],matrizCodigo[i][1]);
        }
    }
    return stringAEncriptar;
}

/* Desencriptador*/

// Boton desencriptar

function btnDesencriptar() {
    if (!mensaje || mensaje.value.length == 0) {
        showToast("No se ha encontrado ningún texto para desencriptar");
        return;
    }
    const textoEncriptado = desencriptar(mensaje.value);
    salida.value = textoEncriptado;
    card2.classList.remove('hidden');
    card1.classList.add('hidden');
    mensaje.value = "";
    showToast("Texto desencriptado");
}
// Funcion Desencriptar

function desencriptar(stringADesencriptar){
    let matrizCodigo= [["enter", "e"], ["imes","i"], ["ai","a"], ["ober","o"], ["ufat","u"]];
    stringADesencriptar = stringADesencriptar.toLowerCase();
    for (let i = 0; i < matrizCodigo.length; i++) {
        if(stringADesencriptar.includes(matrizCodigo[i][0])) {
            stringADesencriptar = stringADesencriptar.replaceAll(matrizCodigo[i][0],matrizCodigo[i][1]);
        }
    }
    return stringADesencriptar;
}

// Boton copiar

function btnCopiar() {
    if (!salida || !salida.value) return showToast('Nada para copiar');
    navigator.clipboard.writeText(salida.value).then(()=>{
        showToast('¡Mensaje copiado al portapapeles!');
        card2.classList.add('hidden');
        card1.classList.remove('hidden');
    }).catch(()=>{
        showToast('No se pudo copiar');
    });
}

// Validar el texto

// Validar el texto (solo minúsculas y espacios)
if (mensaje){
    mensaje.addEventListener('keypress', function(e){
        const char = e.key;
        if (!/^[a-z ]$/.test(char)){
            e.preventDefault();
            showToast('Solo minúsculas, sin acentos o saltos de línea');
        }
    });
}

/* Event listeners para botones (seguro si los elementos existen) */
var btnEnc = document.getElementById('btn-encriptar');
var btnDes = document.getElementById('btn-desencriptar');
var btnCop = document.getElementById('btn-copiar');
if (btnEnc) btnEnc.addEventListener('click', btnEncriptar);
if (btnDes) btnDes.addEventListener('click', btnDesencriptar);
if (btnCop) btnCop.addEventListener('click', btnCopiar);