# 04 · Ventanas y diálogos

En este apartado aprenderemos a abrir páginas HTML en otras pestañas o ventanas y a mostrar diálogos modales dentro de una página. Veremos cómo utilizar enlaces HTML, `window.open()` y el elemento `<dialog>`, y qué diferencias hay entre ellos.

## Diferencias entre pestaña, ventana emergente y ventana modal

| Concepto | Dónde aparece | ¿Podemos seguir usando la página original? | Ejemplo de uso |
| --- | --- | --- | --- |
| Pestaña | En otra pestaña del navegador, con su propio documento. | Sí, al volver a su pestaña. | Consultar documentación sin cerrar nuestro ejemplo. |
| Ventana emergente o pop-up| En una ventana separada del navegador, con su propio documento. | Sí, al volver a la ventana original. | Mostrar información de apoyo en otra ventana. |
| Ventana modal | Dentro de la página actual, por encima del resto del contenido. | No mientras esté abierta: primero hay que cerrarla o responder. | Confirmar una acción del usuario. |

Para abrir una página en otra pestaña o ventana utilizamos `window.open()`, indicando su dirección. Podemos añadir opciones como `popup,width=600,height=400` para solicitar una ventana emergente.

Para crear una ventana modal, escribimos su contenido dentro de una etiqueta `<dialog>` en el HTML. Desde JavaScript la mostramos con `showModal()` y la cerramos con `close()`.

## Ejemplo 01 Abrir otra página

Archivo: [01_JS_Ventanas.html](01_JS_Ventanas.html).

### Qué vamos a ver

- Abrir una página con un enlace HTML.
- Compararlo con una apertura desde JavaScript mediante `window.open()`.
- Solicitar una ventana emergente utilizando el tercer argumento de `window.open()`.
- Mostrar un aviso si el navegador bloquea la apertura.

### 1. Para navegar normalmente basta con un enlace

~~~html
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript"
   target="_blank" rel="noopener">
    Consultar JavaScript en MDN (abre en otra pestaña o ventana)
</a>
~~~

`href` contiene la dirección. `target="_blank"` solicita abrir la página en un nuevo destino, habitualmente una pestaña. Si omitimos `target`, el enlace se abre normalmente en la misma pestaña.

`rel="noopener"` abre la página sin darle una referencia a la página de origen. Lo utilizamos como medida de protección en enlaces externos.

No necesitamos una función JavaScript para este enlace.

### 2. Abrir desde una función

El botón del ejemplo abre una página en una nueva pestaña o ventana, según configuraciones y versiones del navegador:

~~~js
const ventana = window.open(
    '../03_JS_DOM/04_JS_TablasDinamicas.html',
    'ejemploTablas'
);
~~~

El primer argumento es la URL: aquí es una ruta relativa a nuestro ejemplo de tablas. El segundo es el nombre del destino. 

El nombre no es el título de la página ni una descripción. El título visible lo establece el documento que abrimos mediante su etiqueta `<title>`.

Si la apertura tiene éxito obtenemos una referencia al destino. En esta llamada, si el navegador la bloquea, puede devolver `null`:

~~~js
if (ventana === null) {
    mensaje.textContent = 'No se ha podido abrir la página.';
    return;
}
~~~

En el HTML hacemos la llamada directamente al pulsar el botón. Eso permite al navegador reconocer la acción del usuario, aunque sus políticas todavía pueden bloquearla.

### 3. Pestaña o ventana

No podemos garantizar la presentación exacta: intervienen el navegador, sus ajustes y las preferencias del usuario. `window.open()` permite solicitar características como un tamaño, pero no conviene basar una interfaz en que se respeten todas.

El tercer botón solicita una ventana emergente:

~~~js
const ventana = window.open(
    '../03_JS_DOM/04_JS_TablasDinamicas.html',
    'ventanaTablas',
    'popup,width=600,height=400'
);
~~~

El tercer argumento contiene las opciones: `popup` solicita una ventana emergente y `width` y `height` indican el tamaño deseado en píxeles. El navegador puede ajustar ese tamaño, elegir otra presentación o bloquear la apertura.

Utilizamos el nombre `ventanaTablas`, diferente de `ejemploTablas`, para no reutilizar el destino del botón anterior. Si ya existe una ventana con ese nombre, la llamada puede reutilizarla.

No necesitamos controlar barras, posiciones, foco o cierre. El usuario puede cerrar la pestaña o ventana con los controles normales del navegador..

### Cómo probarlo

1. Abre el ejemplo con Live Server desde el workspace.
2. Pulsa el enlace para consultar MDN y vuelve a la página original.
3. Pulsa Abrir ejemplo de tablas y comprueba el mensaje.
4. Vuelve a pulsarlo: observa si se reutiliza el destino con nombre `ejemploTablas`.
5. Pulsa Abrir como ventana emergente y compara su presentación con la del botón anterior.
6. Si la apertura está bloqueada, revisa el aviso y los permisos de ventanas emergentes del navegador.

## Ejemplo 02 Confirmar una acción con una ventana modal

Archivo: [02_JS_VentanaModal.html](02_JS_VentanaModal.html).

### Qué vamos a ver

- Crear un cuadro con el elemento HTML `<dialog>`.
- Abrirlo como modal con `showModal()` y cerrarlo con `close()`.
- Confirmar o cancelar una acción sobre la página.
- Distinguir una ventana independiente de un diálogo dentro del documento.

### 1. Para qué sirve

Antes de eliminar una película, pedimos confirmación. La página permanece abierta y el cuadro aparece por encima de su contenido. Mientras el diálogo es modal, no podemos interactuar con los controles del fondo.

Otros ejemplos de uso son:

- **Confirmar que se descartan cambios:** preguntar «¿Salir sin guardar?» antes de abandonar un formulario dentro de la aplicación.
- **Editar un dato:** mostrar un pequeño formulario para cambiar el nombre de una lista sin salir de la página.
- **Pedir una decisión:** permitir elegir entre guardar un borrador o descartarlo antes de continuar.

Conviene utilizar un modal cuando necesitamos que el usuario atienda esa tarea antes de seguir. Para un aviso informativo que no requiere respuesta, suele bastar un mensaje en la propia página.

No abrimos otra pestaña ni usamos `window.open()`. El diálogo es un elemento del mismo documento.

### 2. El contenido del diálogo

~~~html
<dialog id="confirmacion" aria-labelledby="tituloConfirmacion">
    <h2 id="tituloConfirmacion">¿Eliminar la película?</h2>
    <p>Se quitará La vida de Brian de esta página.</p>
    <button type="button" onclick="cancelar()" autofocus>Cancelar</button>
    <button type="button" onclick="eliminarPelicula()">Eliminar</button>
</dialog>
~~~

Inicialmente está oculto. `aria-labelledby` relaciona el cuadro con su título y `aria-describedby` con su descripción. Estos atributos ayudan a tecnologías de asistencia, como los lectores de pantalla NVDA, JAWS o VoiceOver, a anunciar el título y la descripción del diálogo. No añaden texto visible ni cambian su aspecto.

`autofocus` coloca el foco en Cancelar al abrir. Así el primer botón seleccionado no es el que elimina la película.

### 3. Abrir y cerrar

~~~js
const ventana = document.getElementById('confirmacion');
ventana.showModal();
~~~

`showModal()` muestra el diálogo como modal, deja el fondo sin interacción y sitúa el foco dentro del cuadro. El navegador gestiona su presentación básica; no tenemos que calcular márgenes para centrar un `<div>`.

Para cerrarlo:

~~~js
ventana.close();
~~~

Cancelar solo ejecuta el cierre. Por defecto, Escape también permite cerrar este diálogo sin eliminar la película. 

Aunque existe `show()` para abrir un diálogo no modal, aquí usamos `showModal()` porque queremos que se confirme o cancele antes de seguir interactuando con el fondo.

### 4. Confirmar no es lo mismo que cerrar

`close()` únicamente cierra el cuadro. En `eliminarPelicula()` programamos por separado la acción de retirar el elemento `pelicula` con `remove()`, desactivar el botón de apertura y mostrar un mensaje.

Después de eliminar, el foco pasa al mensaje con `mensaje.focus()`. 

### Cómo probarlo

1. Abre el HTML y pulsa Eliminar película.
2. Comprueba que el cuadro aparece y no puedes utilizar el botón del fondo.
3. Pulsa Cancelar: la película debe conservarse.
4. Abre otra vez y pulsa Escape: también debe conservarse.
5. Abre y pulsa Eliminar: desaparece la película, se cierra el cuadro y se muestra el resultado.
6. Recarga para restaurar el estado inicial.

## Documentación

- [MDN Web Docs — window.open()](https://developer.mozilla.org/es/docs/Web/API/Window/open)
- [MDN Web Docs — dialog](https://developer.mozilla.org/es/docs/Web/HTML/Element/dialog)

