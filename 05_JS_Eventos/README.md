# Eventos en JavaScript

Un **evento** es un aviso que se produce cuando ocurre algo en la página. Por ejemplo, al pulsar un botón se genera un evento `click` y al modificar el texto de un campo se genera un evento `input`.

Los eventos permiten que JavaScript responda a esas situaciones. También pueden producirse sin intervención del usuario, como `DOMContentLoaded`, que avisa cuando el documento HTML está preparado para trabajar con su DOM.

## Conceptos básicos

- Un **tipo de evento** identifica qué ha ocurrido. Por ejemplo, `click` indica una activación mediante un clic y `input` indica un cambio durante la edición de un campo. Un botón también puede generar `click` al activarlo con el teclado.
- Un **manejador de eventos** es la función que ejecutamos como respuesta. Por ejemplo, una función que muestra un saludo al pulsar un botón. Son funciones **callback** que ya hemos visto en otro ejemplos.
- **Registrar un manejador** consiste en indicar qué función queremos ejecutar cuando ocurra un determinado evento en un elemento. Para hacerlo utilizaremos `addEventListener()`.

Si pulsamos un botón para mostrar un saludo, el botón es el elemento que escuchamos, `click` es el tipo de evento y la función que muestra el saludo es el manejador o función callback. Registrar esa función no la ejecuta inmediatamente, sino que prepara la respuesta para cuando ocurra el evento.

Aprenderemos a conectar estas acciones con funciones de JavaScript. Cada ejemplo tiene un HTML y un archivo JavaScript en `js`. Abre el HTML en el navegador, prueba sus controles y después lee el código. Puedes utilizar Live Server desde VS Code.



## Accesibilidad de los mensajes que cambian

En los ejemplos usamos `aria-live="polite"` en algunos mensajes que JavaScript actualiza. Es una buena práctica de accesibilidad cuando queremos que las personas que utilizan un lector de pantalla también puedan enterarse de esos cambios sin tener que buscar el mensaje en la página.

Algunos ejemplos de lectores de pantalla son **NVDA**, para Windows, y **VoiceOver**, incluido en los dispositivos de Apple. Estos programas leen en voz alta el contenido y la información de los controles para ayudar a utilizar la página, por ejemplo, a personas con discapacidad visual.

```html
<p id="resumen" aria-live="polite">Destino elegido: Hogsmeade</p>
```

 El valor `polite` indica que debe esperar a un momento adecuado para hacerlo sin interrumpir lo que está leyendo. Este atributo no modifica la apariencia del elemento ni el funcionamiento de JavaScript.

Lo utilizamos en mensajes relevantes, como el resumen de una selección o el resultado de una acción. No hace falta añadirlo a todos los elementos que cambian, ya que demasiados anuncios pueden dificultar la navegación.

## Recorrido

| Ejemplo | Qué aprenderás | Prueba principal |
| --- | --- | --- |
| [01 Primeros eventos](01_JS_PrimerosEventos.html) | Registrar funciones con `addEventListener()` | Cambiar un mensaje y contar clics |
| [02 Texto y selección](02_JS_TextoYSeleccion.html) | Distinguir `input` y `change` | Contar caracteres y elegir un destino |
| [03 El objeto evento](03_JS_ObjetoEvento.html) | Consultar `type`, `target`, `currentTarget` y `key` | Identificar el origen del clic y detectar Escape |
| [04 Envío de formularios](04_JS_EnvioFormulario.html) | Escuchar `submit` y utilizar `preventDefault()` | Mostrar una reserva sin recargar |
| [05 Tabla dinámica](05_JS_TablasDinamicas.html) | Aplicar delegación de eventos | Añadir y eliminar juegos |
| [06 Controlar manejadores](06_JS_ControlarManejadores.html) | Retirar una función y usar `{ once: true }` | Pausar un contador y reclamar un regalo |

## 01 Primeros eventos

### Conectar un botón con una función

Un **manejador de eventos** es la función que se ejecuta cuando ocurre un evento. Primero obtenemos el elemento y después registramos la función, como en este ejemplo.

```js
const botonSaludar = document.getElementById('botonSaludar');

function saludar() {
    console.log('¡Hola!');
}

botonSaludar.addEventListener('click', saludar);
```

`'click'` indica qué evento escuchamos y `saludar` indica qué función debe ejecutarse. Escribimos el nombre del evento sin el prefijo `on`.

Pasamos `saludar` sin paréntesis porque queremos que el navegador la ejecute cuando se produzca el evento. Escribir `saludar()` la ejecutaría en ese momento y pasaría su resultado a `addEventListener()`.

También podemos escribir la función directamente dentro de la llamada a `addEventListener()`.

```js
botonSaludar.addEventListener('click', () => {
    console.log('¡Hola!');
});
```

Las dos formas son válidas. Una función con nombre ayuda cuando la reutilizamos, cuando su tarea crece o cuando necesitamos retirarla después. Una flecha corta resulta cómoda para una acción sencilla.

### Relación con los ejemplos anteriores

Ya hemos utilizado atributos como `onclick="saludar()"`. Siguen funcionando, pero aquí usaremos `addEventListener()` para registrar los eventos desde JavaScript y mantener el HTML más fácil de leer.

Como práctica habitual, se recomienda usar `addEventListener()` porque permite separar la estructura HTML del comportamiento de JavaScript. Así resulta más fácil mantener el código, reutilizar funciones y registrar o retirar manejadores. También permite asociar varias funciones al mismo evento de un elemento.

Por ejemplo, el HTML contiene el botón y el archivo JavaScript indica qué debe ocurrir al pulsarlo.

```html
<button id="botonSaludar">Saludar</button>
```

```js
const botonSaludar = document.getElementById('botonSaludar');
botonSaludar.addEventListener('click', saludar);
```

En este fragmento suponemos que la función `saludar` ya está definida. Aunque `onclick="saludar()"` puede servir en ejemplos sencillos, en este apartado utilizaremos `addEventListener()` para practicar esta forma de organizar el código, ya que suele ser la recomendada.

Como buena práctica, procuramos separar el HTML, el CSS y el JavaScript en archivos diferentes. El HTML define la estructura y el contenido, el CSS controla la presentación y JavaScript añade el comportamiento. Esta separación facilita la lectura y el mantenimiento del código.

### Preparar el DOM antes de registrar eventos

En todos los ejemplos utilizamos `defer` al cargar el archivo JavaScript.

```html
<script src="js/01_PrimerosEventos.js" defer></script>
```

`defer` permite descargar el archivo mientras se lee el HTML y ejecutarlo después de que el documento esté construido. Así podemos buscar los botones sin esperar a que terminen de cargar las imágenes.

#### Qué ocurre si quitamos `defer`

El navegador va leyendo el HTML en orden. Si encuentra un script clásico sin `defer` en el `<head>`, lo ejecuta antes de continuar con el HTML que aparece después. En ese momento todavía no ha creado los elementos del `<body>`.

Por ejemplo, este HTML carga el JavaScript antes de crear el botón.

```html
<head>
    <script src="js/saludo.js"></script>
</head>
<body>
    <button id="botonSaludar">Saludar</button>
</body>
```

Si `saludo.js` intenta registrar el evento inmediatamente, tendrá un problema.

```js
const botonSaludar = document.getElementById('botonSaludar');
console.log(botonSaludar); // null porque el botón todavía no existe en el DOM, ya que primero se carga el JS antes que el <body>

botonSaludar.addEventListener('click', () => {
    console.log('¡Hola!');
});
```

La última instrucción produce un error porque intentamos llamar a `addEventListener()` sobre `null`. Aunque el botón aparezca después en la página, ese manejador no habrá quedado registrado.

#### Dos formas de resolverlo

Podemos mantener el archivo externo en el `<head>` y añadir `defer`, como hacemos en nuestros ejemplos. Así el navegador espera a que el HTML esté construido antes de ejecutarlo.

También podemos colocar el script justo antes de cerrar el `<body>`, después de los elementos que utiliza.

```html
<body>
    <button id="botonSaludar">Saludar</button>

    <script src="js/saludo.js"></script>
</body>
```

Ahora el botón ya existe cuando se ejecuta `saludo.js` y el evento se registra correctamente. Lo importante es ejecutar el código que busca los elementos y registra sus eventos cuando esos elementos ya existen en el DOM.

#### Esperar al evento `DOMContentLoaded`

Otra posibilidad es utilizar `DOMContentLoaded`, que avisa cuando el HTML está construido y los scripts diferidos han terminado de ejecutarse. Podemos aprovechar ese evento para registrar los manejadores.

```js
document.addEventListener('DOMContentLoaded', () => {
    const botonSaludar = document.getElementById('botonSaludar');
    botonSaludar.addEventListener('click', saludar);
});
```

Este fragmento supone que `saludar` está definida y que registramos el evento antes de que ocurra. En nuestros archivos, con `defer`, no necesitamos añadir este manejador de `DOMContentLoaded`.

#### Esperar a la carga completa con `load`

Por último, también podemos usar el evento `load` de `window`, que espera además a recursos como las imágenes. Lo reservaríamos para tareas que necesiten esa carga completa.

```js
window.addEventListener('load', () => {
    const botonSaludar = document.getElementById('botonSaludar');
    botonSaludar.addEventListener('click', saludar);
});
```

Aquí también suponemos que `saludar` está definida y que registramos el manejador antes de que ocurra `load`. El botón funcionará, aunque habremos esperado a la carga completa para registrar su evento. Para esta tarea bastaría con tener preparado el DOM.

Si has utilizado `window.onload`, se trata del mismo evento. Con `addEventListener()` escribimos su nombre como `'load'`, sin el prefijo `on`.

#### Comparación de las tres opciones

| Opción | Qué es | Cuándo se ejecuta el código |
| --- | --- | --- |
| `defer` | Un atributo del elemento `<script>` para archivos JavaScript externos clásicos | Ejecuta el archivo cuando el HTML ya está construido y antes de `DOMContentLoaded`. |
| `DOMContentLoaded` | Un evento del documento | Ejecuta el manejador cuando el HTML está construido y los scripts diferidos han terminado. No espera a las imágenes. |
| `load` | Un evento de `window` | Ejecuta el manejador cuando también han terminado de cargar recursos como las imágenes. |

Las tres opciones son válidas para registrar eventos en elementos del DOM. En estos ejemplos elegimos `defer` porque permite hacerlo sin esperar a las imágenes ni envolver el código en un manejador de carga. No necesitamos combinar las tres opciones.

**Comprueba el ejemplo 01.** El contador empieza en 0 y aumenta una unidad con cada clic. Las funciones cambian el contenido sin recargar la página.

## 02 Texto y selección

| Evento | Uso habitual |
| --- | --- |
| `click` | Activar una acción mediante un botón |
| `mouseenter` | Detectar cuándo el puntero del ratón entra en un elemento |
| `input` | Responder a cambios en el texto mientras se edita |
| `change` | Responder a una selección o a un cambio confirmado |
| `keydown` | Detectar una tecla concreta, como Escape |
| `submit` | Gestionar el envío de un formulario |
| `focus` y `blur` | Detectar cuándo un control recibe o pierde el foco |

En el `textarea` del ejemplo cuyo `id=observaciones`, usamos `input` para que el contador se actualice al escribir, borrar o pegar texto. La etiqueta `p` con `id=contador` se encarga de poner el contador de las letras.

```js
observaciones.addEventListener('input', () => {
    contador.textContent = `${observaciones.value.length} / ${observaciones.maxLength} caracteres`;
});
```

El límite lo establece HTML con `maxlength="60"`. 

En el `select` usamos el evento `change` para mostrar el nuevo destino en otra etiqueta. 

En campos de texto, `change` suele producirse al confirmar el cambio, por ejemplo al salir del campo. Por eso preferimos `input` en el ejemplo del `textarea`, para actualizar mientras escribimos.


## 03 El objeto evento

El navegador pasa al manejador un objeto con información sobre lo ocurrido. Dicho evento se puede recoger o no en la función callback como parámetro de entrada. El nombre del parámetro suele llamarse `evento`, `event` o `e`. En estos ejemplos elegimos `evento` para que se lea con claridad.

```js
boton.addEventListener('click', (evento) => {
    console.log(evento.type);
    console.log(evento.target);
    console.log(evento.currentTarget);
});
```

El objeto `evento` tiene muchas propiedades, entre las más importantes podemos encontrar:

| Propiedad | Qué indica |
| --- | --- |
| `type` | Nombre del evento, como `'click'` |
| `target` | Elemento donde se originó |
| `currentTarget` | Elemento cuyo manejador se está ejecutando |
| `key` | Tecla pulsada en un evento de teclado |

En el **Ejemplo 1**, el botón contiene un `span` con texto rojo. Al pulsarlo, el clic se origina en el `span` y se propaga hasta el botón que lo contiene, donde hemos registrado el manejador. Por eso `target` es el `span` y `currentTarget` es el botón.

Si pulsamos directamente sobre el botón, fuera del `span`, ambos serán el botón.

En el **Ejemplo 2** hacemos algo parecido pero con el evento `mouseenter`.

En el **Ejemplo 3** se ve como capturar eventos del teclado. Para reaccionar a Escape usamos `keydown` y comprobamos `evento.key === 'Escape'`. Para contar caracteres seguimos utilizando `input`.

### Pasar argumentos propios

En el **Ejemplo 4**, el navegador proporciona el evento. Si queremos llamar a nuestra función con otros datos, podemos hacerlo desde dentro de la función de callback, como en este ejemplo.

```js
botonOferta.addEventListener('click', () => {
    mostrarOferta('Mapa mágico', 20);
});
```

La flecha queda registrada como manejador. Cuando pulsamos el botón, ejecuta `mostrarOferta()` con el nombre y el precio elegidos.

### Cambiar el botón con `currentTarget`

En el **Ejemplo 5** y prueba sus dos botones. Ambos utilizan la función flecha `cambiarTexto`, guardada en una constante. Al pulsar uno, solo su texto cambiará a «¡Has pulsado el botón!».

La instrucción que realiza el cambio es esta.

```js
evento.currentTarget.textContent = '¡Has pulsado el botón!';
```

`evento.currentTarget` hace referencia al botón cuyo manejador se está ejecutando. Por eso podemos reutilizar la misma función para los dos botones.

También podríamos usar `botonCambiar.textContent`, pero entonces la función cambiaría siempre el primer botón, incluso si la ejecutara el segundo. En el JavaScript encontrarás esa alternativa comentada para compararla.

## 04 Envío de formularios

Un formulario puede enviarse pulsando su botón o, en situaciones habituales, pulsando Enter desde un campo.

```js
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    resultado.textContent = `Reserva de ${nombre.value} para visitar ${destino.value}.`;
});
```

Normalmente, el navegador envía el formulario y navega a su destino. `preventDefault()` cancela esa acción predeterminada. El resto de nuestra función continúa ejecutándose.

En este ejemplo mostramos un resumen local. **No se envía una reserva a ningún servidor.** 

El campo Nombre incluye `required`. El navegador comprueba esa restricción antes de producir el evento `submit`. Si el campo está vacío, mostrará su aviso y nuestro manejador no se ejecutará. 

Con `addEventListener()`, devolver `false` desde el manejador no cancela el envío como hemos visto en otras ocasiones. De esta manera, utilizamos `evento.preventDefault()` de forma explícita para impedir el envio al formulario.

**Comprueba el ejemplo.** Escribe Ana, selecciona Rivendel y pulsa Reservar. Aparecerá el resumen. Prueba también con Enter desde el campo Nombre.

## 05 Tabla dinámica

### Por qué escuchar el cuerpo de la tabla

La **delegación de eventos** consiste en registrar un manejador en el contenedor. Cuando pulsamos un botón, su evento `click` se propaga por sus elementos ascendientes y llega al cuerpo de la tabla. A este recorrido se le llama **burbujeo**.

```text
Botón Eliminar → celda td → fila tr → cuerpo tbody
```

Esta es la parte del flujo de eventos que necesitamos aquí. Aunque no todos los eventos burbujean (como `mouseenter`o `focus`), el evento `click` sí lo hace y por eso nos sirve para este ejemplo.

Otra aproximación a este ejemplo sería registrar un manejador en cada botón Eliminar. Sin embargo, cada juego añadido después necesitaría su propio registro.

El ejemplo presenta los juegos en una tabla con tres columnas, Juego, Nota y Acción. Las filas están dentro de `<tbody id="cuerpoTabla">`, donde registramos el manejador. Al añadir un juego creamos una fila `tr` con tres celdas `td` para el nombre, la nota y el botón Eliminar. El campo numérico permite notas del 0 al 10 con un decimal, y HTML comprueba ese rango antes de enviar el formulario.

### Relacionar los encabezados con sus columnas

En el HTML usamos `<th>` para los encabezados de la tabla. El atributo `scope="col"` indica que ese encabezado corresponde a las celdas de su columna.

```html
<th scope="col">Juego</th>
<th scope="col">Nota</th>
<th scope="col">Acción</th>
```

Por ejemplo, la nota 10 de Hollow Knight está en la columna cuyo encabezado es «Nota». Esta relación ayuda a los lectores de pantalla a interpretar la tabla. `scope="col"` no cambia su apariencia ni interviene en los eventos de JavaScript.

### Identificar la acción con un atributo `data-`

Los atributos que empiezan por `data-` son la **forma estándar de HTML de añadir atributos personalizados** para guardar información en los elementos. La expresión `data-*` representa esta familia de atributos. El asterisco indica la parte del nombre que elegimos nosotros y no se escribe literalmente en el atributo.

Por ejemplo, podemos elegir `data-accion`, `data-precio` o `data-id-juego`. En este ejemplo utilizamos `data-accion` para indicar qué hace cada botón.

Aunque el navegador permite crear y consultar un atributo inventado como `accion="eliminar"`, ese atributo no está definido por el estándar HTML para un botón. Usar `data-accion="eliminar"` permite guardar esa misma información de forma válida y acceder a ella mediante `dataset`. Por eso utilizamos el prefijo `data-`.

```html
<button type="button" data-accion="eliminar">Eliminar</button>
```

En este botón, `accion` es el nombre que hemos elegido y `'eliminar'` es el valor guardado. La propiedad `dataset` permite leer, crear y modificar los atributos `data-*` desde JavaScript.

```js
console.log(botonEliminar.dataset.accion); // 'eliminar'
```

Además de hacerlo en HTML, también podemos crear atributo `data-*` desde JavaScript. En el siguiente ejemplo crearemos el atributo `data-accion=eliminar`:

```js
botonEliminar.dataset.accion = 'eliminar';
```

Esta asignación añade `data-accion="eliminar"` al botón. Si el atributo ya existiera, cambiaría su valor. El nombre **accion** es una elección nuestra, pudiendo elegir la que queramos.

El atributo no elimina la fila por sí mismo, para ello hay que meterle la lógica adecuada. En nuestro caso, tenemos un manejador que utiliza el atributo `data-accion="eliminar"` para reconocer los botones de eliminar y ejecutar el código correspondiente. 

```js
cuerpoTabla.addEventListener('click', (evento) => {
    const botonEliminar = evento.target.closest('button[data-accion="eliminar"]');
    if (botonEliminar === null || !cuerpoTabla.contains(botonEliminar)) {
        return;
    }
    botonEliminar.closest('tr').remove();
});
```

`closest()` busca un elemento que coincida con el selector pasado por parámetro, empezando por el propio elemento y continuando por sus ascendientes. Nos permite encontrar el botón aunque pulsemos un elemento dentro de él. Si no encuentra ninguno, devuelve `null`.

El selector `button[data-accion="eliminar"]` que le pasamos por parámetro, es un selector CSS que también podemos utilizar desde JavaScript. Selecciona elementos que cumplan estas dos condiciones a la vez.

- `button` indica que el elemento debe ser un botón.
- `[data-accion="eliminar"]` indica que debe tener el atributo `data-accion` con el valor exacto `eliminar`.

El texto del botón no interviene en la búsqueda. Aunque ponga «Borrar juego», coincide porque es un `button` y tiene `data-accion="eliminar"`.

Por ejemplo, estos elementos no cumplirían con el selector.

```html
<button type="button" data-accion="editar">Editar</button>
<a href="#" data-accion="eliminar">Eliminar</a>
```

El primer elemento es un botón, pero el valor de `data-accion` es `editar`. El segundo tiene el valor `eliminar`, pero es un enlace.

En nuestra llamada a `closest()`, este selector permite localizar el botón de eliminar partiendo del elemento donde se originó el clic.

### Cancelar una acción y detener la propagación

`preventDefault()` cancela una acción del navegador, como enviar un formulario. 

**Comprueba el ejemplo.** Elimina un juego inicial, añade otro y elimínalo también. Ambos funcionan con el mismo manejador del cuerpo de la tabla.

## 06 Controlar manejadores

### Retirar una función

`removeEventListener()` retira un manejador registrado. Para hacerlo, indicamos el evento y **la misma referencia a la función** que utilizamos al registrarlo.

```js
contar.addEventListener('click', sumarPulsacion);
contar.removeEventListener('click', sumarPulsacion);
```

No ejecutamos `sumarPulsacion()` al registrarla ni al retirarla. Escribir una nueva flecha con el mismo contenido tampoco sirve para retirar el manejador, ya que sería otra función. 



### Ejecutar una acción una vez

Podemos utilizar el tercer argumento de `addEventListener()` para indicar opciones, como ejecutar el manejador una sola vez.

```js
regalo.addEventListener('click', () => {
    mensajeRegalo.textContent = '¡Has recibido un mapa mágico!';
    regalo.disabled = true;
}, { once: true });
```

`once: true` retira el manejador después de ejecutarlo una vez. Además, desactivamos el botón para que la interfaz muestre que ya se ha utilizado. Retirar el manejador impide que vuelva a ejecutarse, mientras que desactivar el control indica al usuario que ya no puede utilizarlo.

Esta limitación dura mientras está abierta esta versión de la página. Al recargarla, el ejemplo empieza de nuevo. Si quisiéramos impedir reclamaciones repetidas de un regalo real, tendríamos que comprobarlo también en el servidor.

## Buenas prácticas que aplicamos

- Registrar eventos desde JavaScript con `addEventListener()` y cargar el archivo externo con `defer`.
- Obtener referencias explícitas al DOM y usar `const` cuando no se reasignan.
- Usar botones para las acciones, ya que también se pueden activar mediante el teclado.
- Indicar `type="button"` en botones que no envían formularios y `type="submit"` en los que sí.
- Asociar etiquetas `label` a los campos con `for` y mostrar resultados comprensibles en la página.
- Usar `textContent` para mostrar texto, incluido el escrito por el usuario.
- Aprovechar atributos HTML como `required`, `maxlength` y `disabled`.
- Mantener funciones cortas y nombres que describan su acción.

No utilizamos `keypress`, `keyCode` ni `charCode`, que están obsoletos. Tampoco necesitamos `unload`, cuyo uso se desaconseja. Para editar texto utilizamos `input` y para teclas concretas `keydown` con `key`.

### Accesibilidad con HTML y atributos ARIA

Cuidar la accesibilidad ayuda a que más personas puedan utilizar la página, incluidas quienes usan lectores de pantalla. El propio HTML ofrece elementos y atributos para ello. Cuando necesitamos información adicional, podemos recurrir a atributos ARIA (*Accessible Rich Internet Applications*), como `aria-live`.

| Elemento o atributo | Cómo lo utilizamos |
| --- | --- |
| `aria-live="polite"` | Permite anunciar cambios en mensajes relevantes sin interrumpir la lectura actual. No modifica su apariencia. |
| `<label for="nombre">` e `id="nombre"` | Relacionan el texto de la etiqueta con su campo. Así el lector de pantalla puede identificarlo y el usuario puede pulsar la etiqueta para acceder al control. |
| `<th scope="col">` | Identifica el encabezado de una columna y ayuda a relacionarlo con las celdas que aparecen debajo. |
| `<caption>` | Da un título a la tabla, como «Juegos pendientes», para identificar su contenido. |

No todo requiere atributos ARIA. Utilizar elementos adecuados, como `button`, `label` y `th`, ya aporta información de accesibilidad. En estos ejemplos añadimos `aria-live` para los mensajes que cambian mediante JavaScript.

## Documentación de consulta

- [MDN — Introducción a los eventos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- [MDN — addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN — Burbujeo y delegación](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [MDN — DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
- [MDN — Introducción a ARIA](https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA)
- [MDN — El atributo aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live)
