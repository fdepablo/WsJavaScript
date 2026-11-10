// Ejemplo 1 — Mensajes propios de validación.
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const correoConfirmacion = document.getElementById('correoConfirmacion');
const errorNombre = document.getElementById('errorNombre');
const errorCorreo = document.getElementById('errorCorreo');
const errorConfirmacion = document.getElementById('errorConfirmacion');
const resultado = document.getElementById('resultado');


/*
 * Al intentar enviar el formulario queremos comprobar todos los campos y mostrar
 * sus errores en el mismo intento. Como usamos `novalidate`, nos encargamos de
 * decidir si se puede enviar.
 *
 * Primero retiramos los errores personalizados anteriores y comprobamos nuestras
 * reglas para el nombre y la coincidencia de los correos. Después consultamos
 * la validez de cada campo y mostramos los mensajes junto a ellos.
 *
 * Si todo es correcto, permitimos el envío normal al servidor. Si hay errores,
 * cancelamos el envío con `preventDefault()` y enfocamos el primer campo incorrecto.
 */
formulario.addEventListener('submit', (evento) => {
    // Si el usuario corrige los datos y vuelve a enviar, se borran los errores anteriores.
    // ya que un error personalizado permanece hasta que lo retiramos con una cadena vacía.
    nombre.setCustomValidity('');
    correoConfirmacion.setCustomValidity('');

    const textoNombre = nombre.value.trim();
    if (textoNombre.length < 3 || textoNombre.length > 20) {
        nombre.setCustomValidity('Escribe un nombre de 3 a 20 caracteres.');
    }

    if (correoConfirmacion.value !== '' && correoConfirmacion.value !== correo.value) {
        correoConfirmacion.setCustomValidity('Los dos correos deben coincidir.');
    }

    // Consultamos cada campo para mostrar todos los errores en el mismo intento.
    const nombreCorrecto = nombre.checkValidity();
    const correoCorrecto = correo.checkValidity();
    const confirmacionCorrecta = correoConfirmacion.checkValidity();

    // Primero preparamos los mensajes. Si el campo es correcto, los dejamos vacíos.
    let mensajeNombre = '';
    if (!nombreCorrecto) {
        mensajeNombre = nombre.validationMessage;
    }

    let mensajeCorreo = '';
    if (!correoCorrecto) {
        mensajeCorreo = 'Escribe un correo electrónico válido.';
    }

    let mensajeConfirmacion = '';
    if (!confirmacionCorrecta) {
        mensajeConfirmacion = correoConfirmacion.validationMessage;
    }

    // Después mostramos cada mensaje junto a su campo.
    mostrarError(nombre, errorNombre, mensajeNombre);
    mostrarError(correo, errorCorreo, mensajeCorreo);
    mostrarError(correoConfirmacion, errorConfirmacion, mensajeConfirmacion);

    if (nombreCorrecto && correoCorrecto && confirmacionCorrecta) {
        // Al no cancelar el evento, el navegador continúa con el envío normal.
        resultado.textContent = `Datos correctos para ${textoNombre}. Enviando el registro...`;
    } else {
        // Solo impedimos el envío cuando nuestras comprobaciones detectan errores.
        evento.preventDefault();
        resultado.textContent = 'Revisa los campos indicados. No se ha enviado ningún dato.';
        // Llevamos el foco al primer campo con error.
        formulario.querySelector('[aria-invalid="true"]').focus();
    }
});

/*
 * Cuando el usuario modifica un campo queremos retirar el resultado de la
 * comprobación anterior, porque ya no corresponde a los datos actuales.
 * El evento `input` de los campos se propaga hasta el formulario.
 *
 * Limpiamos los errores personalizados y los mensajes de los tres campos.
 */
formulario.addEventListener('input', () => {
    // Retiramos los mensajes anteriores y validaremos de nuevo al pulsar el botón.
    nombre.setCustomValidity('');
    correoConfirmacion.setCustomValidity('');
    mostrarError(nombre, errorNombre, '');
    mostrarError(correo, errorCorreo, '');
    mostrarError(correoConfirmacion, errorConfirmacion, '');
    resultado.textContent = 'Has cambiado los datos. Vuelve a comprobarlos.';
});

// Recibe el campo que comprobamos, el párrafo donde mostramos su error
// y el texto del error. Un texto vacío indica que no hay error que mostrar.
const mostrarError = (campoFormulario, parrafoError, textoError) => {
    parrafoError.textContent = textoError;
    
    // No interviene en la validación. Lo usamos para comunicar
    // a los lectores de pantalla si hemos detectado un error en el campo.
    if (textoError === '') {
        campoFormulario.setAttribute('aria-invalid', 'false');
    } else {
        campoFormulario.setAttribute('aria-invalid', 'true');
    }
};
