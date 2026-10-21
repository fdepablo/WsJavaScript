// Ejemplo 1 — Añadir y eliminar juegos.
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const nota = document.getElementById('nota');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const mensaje = document.getElementById('mensaje');

// Primera parte del ejemplo para añadir una fila a la tabla.
formulario.addEventListener('submit', (evento) => {
    //Evitar que el formulario se envíe y la página se recargue.
    evento.preventDefault();

    //Comprobamos que el campo de nombre no esté vacío.
    const titulo = nombre.value.trim();
    if (titulo === '') {
        mensaje.textContent = 'Escribe el nombre de un juego.';
        nombre.focus();
        return;
    }

    //Empezamos a crear una fila con los datos del videojuego
    const fila = document.createElement('tr');
    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = titulo;
    const celdaNota = document.createElement('td');
    // HTML comprueba que la nota esté entre 0 y 10 antes del evento `submit`.
    celdaNota.textContent = nota.value;
    
    // Creamos un botón para eliminar la fila.
    const celdaAccionEliminar = document.createElement('td');
    const botonEliminar = document.createElement('button');
    // El atributo `type=button` evita que el botón envíe el formulario en caso de que 
    // este dentro de él. Por defecto, un botón dentro de un formulario es de tipo `submit`.
    // En este caso no es estrictamente necesario porque el botón está fuera del formulario, 
    // pero es una buena práctica.
    botonEliminar.type = 'button';
    // Añadimos un atributo `data-accion` para identificar el botón en el manejador de eventos.
    botonEliminar.dataset.accion = 'eliminar';
    botonEliminar.textContent = 'Eliminar';
     // Quedaria el boton finalmente así <button type="button" data-accion="eliminar">Eliminar</button>
    celdaAccionEliminar.append(botonEliminar);

    //Creamos la fila y la añadimos al `tbody` de la tabla
    fila.append(celdaNombre, celdaNota, celdaAccionEliminar);
    cuerpoTabla.append(fila);

    //Reseteamos el formulario y ponemos el foco en el primer campo.
    nombre.value = '';
    nota.value = '';
    nombre.focus();

    //Actualizamos el mensaje con el titulo del juego añadido.
    mensaje.textContent = `Añadido: ${titulo}`;
});

// Segunda parte del ejemplo 1 para eliminar juegos mediante delegación de eventos.
// Un único manejador en el `tbody` atiende también las filas que añadimos después.
cuerpoTabla.addEventListener('click', (evento) => {
    // `closest()` busca el elemento que cumpla la condición del selector y que esté más cercano al elemento que disparó el evento.
    // En este caso, buscamos el botón con el atributo `data-accion="eliminar"` más cercano al elemento que disparó el evento.
    const botonEliminar = evento.target.closest('button[data-accion="eliminar"]');
    // Si no se ha hecho click en un botón de eliminar o el botón no está dentro del `tbody`, salimos de la función.
    if (botonEliminar === null || !cuerpoTabla.contains(botonEliminar)) {
        return;
    }
    // Eliminamos la fila correspondiente y actualizamos el mensaje con el título del juego eliminado.
    // `closest('tr')` busca la fila más cercana al botón que disparó el evento.
    const fila = botonEliminar.closest('tr');
    // `querySelector('td')` busca la primera celda de la fila, que contiene el título del juego.
    // para mostrar el titulo más adelante en el mensaje de eliminación.
    const titulo = fila.querySelector('td').textContent;
    // Eliminamos la fila de la tabla.
    fila.remove();
    mensaje.textContent = `Eliminado: ${titulo}`;
});
