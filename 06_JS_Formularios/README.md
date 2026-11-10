# Formularios con JavaScript

Un formulario permite recoger datos mediante campos de texto, selectores, radios y casillas. JavaScript puede leer esas elecciones, comprobarlas y mostrar al usuario qué debe corregir.

En DOM aprendimos a acceder a los controles y preparar sus datos. En eventos vimos cómo escuchar `submit` y cancelar el envío habitual. Aquí practicaremos la lectura de cada control y la validación de los datos.

Cada HTML carga su archivo JavaScript desde `js` con `defer`, para ejecutarlo cuando el HTML ya está construido. El CSS se mantiene en el archivo externo `css/formularios.css`.

Abre los ejemplos con el navegador o con Live Server. El ejemplo 01 solo muestra un resumen local. Los ejemplos 02 y 03 permiten el envío normal al servidor cuando los datos son válidos.

## Recorrido

| Ejemplo | Qué aprenderás |
| --- | --- |
| [01 Leer datos del formulario](01_JS_LeerDatosFormulario.html) | Leer texto, opciones, radios y casillas y mostrar un resumen |
| [02 Validación con HTML](02_JS_ValidacionHTML.html) | Aprovechar las restricciones del navegador y comprobarlas con `reportValidity()` |
| [03 Validación con JavaScript](03_JS_ValidacionJavaScript.html) | Añadir reglas propias y mostrar todos los errores junto a los campos |

## 01 Leer datos del formulario

El ejemplo prepara una visita a una feria de videojuegos. Cambia las opciones antes de pulsar Mostrar resumen. Las selecciones se consultan al enviar el formulario, de modo que el resumen refleja las elecciones actuales.

### Leer valores y selecciones

| Control | Cómo obtenemos el dato |
| --- | --- |
| Texto y textarea | `.value` contiene el texto |
| Select | `.value` contiene el valor de la opción elegida |
| Checkbox individual | `.checked` indica si está marcado |
| Grupo de radios | Buscamos el radio marcado con `:checked` y leemos su `.value` |
| Varias casillas | Seleccionamos las marcadas con `querySelectorAll()` y recorremos sus valores |

Un radio permite elegir una opción entre varias. Los radios de un grupo comparten `name`. Las casillas permiten marcar varias opciones de forma independiente.

```js
const turno = formulario.querySelector('input[name="turno"]:checked');
```

Si no hay ningún radio seleccionado, `turno` será `null`. Antes de consultar su valor debemos comprobarlo, como hacemos en el JavaScript del ejemplo.

En las casillas, `.value` no indica si están marcadas. Para saberlo utilizamos `.checked` o el selector `:checked`.

### Diferenciar el texto visible y el valor

En el selector aparece «Hollow Knight», pero su valor es `hollow-knight`. El valor es el dato que se utilizaría en el envío, mientras que el texto visible es lo que ve el usuario.

```js
const opcion = juego.options[juego.selectedIndex];
console.log(opcion.text); // Hollow Knight
console.log(juego.value); // hollow-knight
```

`selectedIndex` indica la posición de la opción seleccionada y empieza en 0. En este selector siempre hay una opción elegida.

### Mostrar un texto cuando el campo está vacío

En el resumen utilizamos esta expresión para mostrar el nombre o un texto alternativo si no se ha escrito ninguno.

```js
nombre.value.trim() || 'Sin indicar'
```

`nombre.value` obtiene el texto del campo y `trim()` elimina los espacios del principio y del final. Si el resultado es una cadena vacía, el operador `||` utiliza el texto de la derecha, que en este caso es `'Sin indicar'`. Si queda un nombre, utiliza ese nombre.

| Contenido del campo | Resultado en el resumen |
| --- | --- |
| `"Ana"` | `Nombre: Ana` |
| `""` | `Nombre: Sin indicar` |
| `"   "` | `Nombre: Sin indicar` |
| `"  Ana  "` | `Nombre: Ana` |

Esto solo decide qué mostramos en el resumen. No modifica el valor del campo ni lo convierte en obligatorio.

**Comprueba el ejemplo.** Si no eliges turno ni actividades, el resumen muestra «Sin elegir» y «Ninguna». El contenido se muestra con `textContent`, por lo que un texto escrito por el usuario se presenta como texto y no se interpreta como HTML.


## 02 Validación con HTML

Validar consiste en comprobar que los datos cumplen unas reglas. Para las comprobaciones habituales podemos empezar por los atributos HTML.

| Atributo | Qué comprueba |
| --- | --- |
| `required` | Que un campo obligatorio no esté vacío. En una casilla obliga a marcarla. |
| `type="email"` | Que el texto tenga un formato de correo admitido por el navegador |
| `minlength` y `maxlength` | Los límites de longitud de un texto |
| `min`, `max` y `step` | El rango y los incrementos permitidos en campos numéricos |

El selector de turno tiene una opción inicial con `value=""`. Como también lleva `required`, el usuario debe elegir un turno con un valor no vacío.

Estas comprobaciones tienen límites. Un correo con formato válido no garantiza que exista, y `required` en un campo de texto no rechaza por sí solo una cadena de espacios. Las reglas propias se pueden añadir con JavaScript.

### Qué sucede al pulsar el botón

Al pulsar Enviar inscripción o enviar con Enter, el navegador comprueba las restricciones antes de producir `submit`. Si hay errores, muestra su aviso y nuestro manejador de `submit` no se ejecuta. Si los datos son válidos, el navegador continúa con el envío. No utilizamos `preventDefault()` en este manejador porque la validación HTML ya bloquea los intentos incorrectos.

El otro botón utiliza este método para comprobar los campos sin solicitar un envío.

```js
const correcto = formulario.reportValidity();
```

`reportValidity()` muestra los avisos del navegador y devuelve `true` si se cumplen las reglas o `false` si hay errores. Tampoco envía el formulario y el texto de los avisos depende del navegador y de su idioma.

**Comprueba el ejemplo.** Prueba campos vacíos, un correo sin arroba, cinco entradas y un turno sin elegir. Después corrígelos y utiliza el botón 'Ver avisos sin enviar' para comprobarlos sin navegar. Al pulsar 'Enviar inscripción' con datos válidos, se inicia la petición al servidor.

## 03 Validación con JavaScript

En este ejemplo pedimos un nombre y un correo repetido. Queremos mostrar todos los errores junto a los campos y añadir una regla de que los dos correos coincidan, ya que HTML no lo hace por si solo.

### Mostrar nuestros mensajes

El formulario utiliza `novalidate` para desactivar los avisos automáticos al enviar. Esto permite que nuestro manejador de `submit` se ejecute también cuando hay campos incorrectos. Las restricciones HTML siguen disponibles para consultarlas desde JavaScript. 

De esta manera, atributos como required y type="email" siguen definiendo cuándo un campo es válido, pero `novalidate` evita que el navegador bloquee automáticamente el envío y muestre sus avisos.

Cada campo tiene un párrafo para su error y además utilizamos atributos de accesibilidad como `aria-describedby` que relaciona ese párrafo con el campo y `aria-invalid` que indica si hemos detectado un error. También llevamos el foco al primer campo incorrecto de manera automática.

### Comprobar una regla propia

`setCustomValidity()` permite indicar que un campo **NO cumple** una regla propia y establecer su mensaje personalizado.

```js
confirmacion.setCustomValidity('Los dos correos deben coincidir.');
```

Para retirar ese error debemos pasar una cadena vacía. De lo contrario, el campo seguirá siendo inválido aunque su contenido cambie.

```js
confirmacion.setCustomValidity('');
```

El ejemplo limpia los errores personalizados antes de cada comprobación. Después comprueba la longitud del nombre sin espacios en los extremos y compara ambos correos que deben coincidir tal como se han escrito.

### Consultar el resultado

`campo.checkValidity()` devuelve si el campo cumple sus restricciones, incluidas las personalizadas. Si falla, también produciría un evento `invalid`, que no necesitamos manejar aquí.

`campo.validationMessage` contiene el mensaje de validación del campo. Usamos ese texto o un mensaje propio para completar los párrafos de error mediante `textContent`.

Comprobamos todos los campos antes de decidir si el registro es válido. Así mostramos todos los problemas en el mismo intento. Si se modifica algún dato, retiramos los mensajes anteriores y pedimos comprobar de nuevo.

**Comprueba el ejemplo.** Prueba todos los campos vacíos, un nombre con espacios, un correo inválido y dos correos distintos. Después usa Ana con dos correos iguales. Al enviar, el navegador debe continuar hacia el destino del formulario.

## Otras consideraciones

`preventDefault()` no es obligatorio en todos los formularios. En el ejemplo 01 lo usamos porque solo queremos mostrar el resumen. En el 02, el navegador impide el envío cuando fallan las restricciones HTML, sin que tengamos que cancelarlo desde JavaScript.

En el 03 hemos elegido `novalidate` para gestionar nuestros mensajes. Por eso comprobamos los datos en el manejador de `submit` y llamamos a `evento.preventDefault()` únicamente si hay errores. Cuando son correctos, dejamos que el evento continúe y el navegador realiza el envío normal.

Los formularios de validación llevan `method="post"` y un `action` de ejemplo, `/inscripciones` o `/registros`. Debes sustituir esa ruta por la de tu servidor cuando lo prepares. Se envían los controles que tengan `name` y cumplan las reglas habituales de envío del navegador.

El servidor no forma parte de estos ejemplos. Live Server permite servir los archivos estáticos, pero no implementa el procesamiento de esas peticiones POST. Mientras no exista el recurso de destino, un envío válido producirá una página de error.

## Buenas prácticas

- Escuchar `submit` en el formulario para cubrir el botón y el envío mediante Enter.
- Mostrar errores comprensibles junto a los campos y conservar los valores para poder corregirlos.
- Retirar los mensajes de éxito cuando los datos cambian.
- Recordar que `.value` es texto, también en un campo numérico. Para operar podemos convertirlo o consultar `.valueAsNumber`.

La validación del navegador mejora la experiencia del usuario, pero puede evitarse o manipularse. En una aplicación real, **el servidor también debe validar los datos**.

## Documentación de consulta

- [MDN — Validación de formularios](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [MDN — Restricciones de validación HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation)
- [MDN — Evento submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)
