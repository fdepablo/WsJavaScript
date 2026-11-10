// Ejemplo 1 — Comprobar una inscripción.
const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');
const comprobar = document.getElementById('comprobar');

// El navegador solo produce `submit` si se cumplen las restricciones HTML.
formulario.addEventListener('submit', () => {
    // No cancelamos el evento porque el navegador ya ha validado los datos.
    // El formulario se envía al destino indicado en `action`.
    resultado.textContent = 'Datos correctos. Enviando la inscripción...';
});

comprobar.addEventListener('click', () => {
    // `reportValidity()` comprueba las reglas, muestra avisos y devuelve un booleano.
    const correcto = formulario.reportValidity();
    const mensaje = correcto ? 'Todos los campos cumplen las reglas HTML.' : 'Revisa los campos señalados por el navegador.';
    resultado.textContent = "Se ha ejecutado reportValidity(): " + mensaje;
});

// El evento `input` de los campos se propaga hasta el formulario.
// Cuando el usuario modifica un dato, sustituimos el  contenido de 'resultado'
// por un mensaje que indica que los datos han cambiado.
// Aquí solo actualizamos el mensaje, sin validar ni enviar el formulario.
formulario.addEventListener('input', () => {
    resultado.textContent = 'Has cambiado los datos. Vuelve a comprobarlos.';
});
