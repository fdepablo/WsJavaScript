# 10 · Web Storage en JavaScript

Web Storage permite guardar datos **en el navegador** mediante parejas de clave y valor. Una clave es el nombre con el que identificamos un dato; el valor es la información que guardamos.

Por ejemplo, podemos guardar la clave tema con el valor oscuro y recuperarla cuando el usuario vuelva a la página.

## Para qué se suele usar

- Recordar preferencias, como el tema o el idioma.
- Conservar un borrador mientras se completa un formulario.
- Mantener pequeños datos de una aplicación, como una lista de tareas.

Los datos pertenecen al navegador y al perfil que se esté utilizando. No se envían automáticamente al servidor, como sí ocurre con las cookies en las solicitudes que correspondan, ni se comparten automáticamente con otro dispositivo. Web Storage no sustituye una base de datos de servidor.

## 1. Dos formas de guardar datos

JavaScript ofrece localStorage y sessionStorage. Ambos utilizan la interfaz Storage: tienen los mismos métodos, pero cambia la duración de los datos y cómo se comparten entre pestañas.

| Característica | localStorage | sessionStorage |
| --- | --- | --- |
| Sobrevive a recargar la página | Sí | Sí |
| Se comparte entre pestañas del mismo origen | Sí, en el contexto habitual de una página | Cada pestaña tiene su propia sesión |
| Duración | Persiste entre sesiones, salvo borrado o restricciones del navegador | Dura la sesión de la pestaña |
| Ejemplo de uso | Preferencia de tema | Borrador temporal de un formulario |

Cerrar una pestaña normalmente termina su sesión. Sin embargo, la restauración de pestañas o sesiones puede recuperar los datos: no conviene explicar sessionStorage simplemente como «se borra siempre al cerrar el navegador».

localStorage tampoco es una copia de seguridad: el usuario puede borrar los datos, el navegador puede restringir su conservación y en navegación privada su duración es limitada.

## 2. Qué significa origen

Un origen se identifica por **protocolo, servidor y puerto**. Por ejemplo, http://localhost:5500 es un origen.

- Cambiar la carpeta de una página no cambia su origen.
- Cambiar de puerto sí lo cambia.
- Cambiar de HTTP a HTTPS también lo cambia.
- localhost y 127.0.0.1 son servidores distintos a estos efectos.

Por eso varios ejemplos abiertos con Live Server pueden compartir localStorage. Las claves no pertenecen a un archivo HTML concreto.

sessionStorage se separa además por pestaña. Si una pestaña se abre desde otra y conserva una relación de apertura, puede recibir una copia inicial de su almacenamiento de sesión; después ambas copias son independientes.

## 3. Guardar y recuperar un dato

~~~js
localStorage.setItem('tema', 'oscuro');
const tema = localStorage.getItem('tema');
console.log(tema); // 'oscuro'
~~~

setItem() recibe la clave y el valor. Si la clave ya existe, reemplaza su valor. getItem() devuelve el valor guardado o null si no existe la clave.

~~~js
const idioma = localStorage.getItem('idioma');
if (idioma === null) {
    console.log('Todavía no se ha guardado un idioma.');
}
~~~

También es posible acceder como localStorage.tema, pero en estos ejemplos usaremos siempre los métodos: son más claros y evitan confundir claves con propiedades del objeto.

Para trabajar con sessionStorage solo cambia el objeto:

~~~js
sessionStorage.setItem('borrador', 'Hola');
console.log(sessionStorage.getItem('borrador')); // 'Hola'
~~~

## 4. Eliminar datos

removeItem() elimina una clave. Si no existe, no ocurre nada.

~~~js
localStorage.removeItem('tema');
~~~

clear() elimina **todas las claves de ese almacenamiento para el origen**, también las que hayan creado otras páginas de ese mismo origen.

~~~js
// Ejecutar solo si queremos borrar TODO el almacenamiento local del origen.
localStorage.clear();
~~~

En nuestros botones de borrado utilizamos removeItem() para borrar únicamente las claves del ejemplo. Una clave local no se elimina al borrar la misma clave de sessionStorage: son almacenamientos distintos.

## 5. Los valores se guardan como texto

Aunque guardemos un número, al recuperarlo obtenemos una cadena.

~~~js
localStorage.setItem('visitas', 3);
const texto = localStorage.getItem('visitas');
console.log(texto);        // '3'
console.log(typeof texto); // 'string'
const visitas = Number(texto);
console.log(visitas + 1);  // 4
~~~

Sin convertirlo, '3' + 1 produciría '31'. En el contador de los ejemplos comprobamos además que el número recuperado sea válido antes de incrementarlo.

## 6. Guardar objetos con JSON

Para guardar un objeto, primero lo convertimos a texto con JSON.stringify(). Para reconstruirlo al leerlo, usamos JSON.parse().

~~~js
const persona = { nombre: 'Ana', edad: 25 };
localStorage.setItem('persona', JSON.stringify(persona));

const texto = localStorage.getItem('persona');
if (texto !== null) {
    const recuperada = JSON.parse(texto);
    console.log(recuperada.nombre); // 'Ana'
}
~~~

También se pueden guardar arrays de esta forma. Guardar un objeto directamente con setItem() no conserva su estructura: normalmente obtendríamos el texto '[object Object]'.

JSON.parse() puede fallar si el texto no es JSON válido. Además, un JSON válido puede tener una estructura distinta de la esperada: conviene comprobar sus campos. El ejemplo de contactos hace ambas comprobaciones y omite las entradas dañadas sin borrarlas.

Cambiar el objeto recuperado no modifica automáticamente el almacenamiento: hay que volver a guardarlo con setItem().

## 7. Recorrer las claves

length indica cuántas claves hay. key(i) devuelve la clave situada en la posición i; no debemos depender de un orden concreto.

~~~js
for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    console.log(clave, localStorage.getItem(clave));
}
~~~

Para distinguir los datos de cada ejemplo usamos prefijos, como ejemplo11:persona:nombre o Contacts:1. El prefijo es una convención nuestra, no una carpeta ni una barrera de acceso.

## 8. Qué muestra cada archivo

### Ejemplo 01 Local Storage

[01_JS_Localstorage.html](01_JS_Localstorage.html) guarda nombre, apellidos, edad y un contador. Guarda una persona, recarga y pulsa Cargar. Después cierra la pestaña y abre otra vez la misma dirección: normalmente podrás recuperar sus datos.

El botón de borrado elimina únicamente nombre, apellido, edad y contador bajo el prefijo ejemplo11:persona:. No elimina contactos. Las claves antiguas sin prefijo, si ya las tenías, no se migran ni se borran.

### Ejemplo 02 Session Storage

[02_JS_SessionStorage.html](02_JS_SessionStorage.html) mantiene el mismo código, pero utiliza sessionStorage. Recarga y comprueba que conserva los datos. Para comparar pestañas, abre la dirección en una pestaña nueva independiente, sin duplicar la actual ni restaurarla.

La función ejecutar() de ambos ejemplos agrupa el manejo de errores: recibe una función con la operación y le proporciona el almacenamiento dentro de un try...catch. Así también se controla un posible fallo al acceder a window.localStorage o window.sessionStorage.

### Ejemplo 03 Contactos

[03_JS_WebStorage.html](03_JS_WebStorage.html) permite añadir, editar y eliminar contactos. Cada contacto es un objeto convertido a JSON bajo una clave como Contacts:1.

El programa carga las claves que cumplen /^Contacts:\d+$/, comprueba los objetos, los ordena por identificador y crea las filas de la tabla. Al guardar, convierte el objeto a JSON; al eliminar, borra solo su clave.

Se conserva el formato anterior de los contactos: id, first_name, last_name y email. La antigua clave Contacts:index ya no es necesaria; se calcula el siguiente identificador a partir de las claves existentes. No se borra esa clave antigua automáticamente.

Los datos se muestran con textContent para que se interpreten como texto. Las acciones son botones y el formulario evita la recarga con preventDefault().

## 9. Cómo probar los ejemplos

1. Abre la carpeta del workspace con Live Server o un servidor local equivalente.
2. Mantén el mismo servidor y puerto durante las pruebas.
3. Guarda datos y prueba las recargas, la carga y el borrado.
4. En contactos, prueba añadir, editar, descartar y eliminar.
5. Abre las herramientas del navegador con F12 y busca Aplicación o Almacenamiento para inspeccionar las claves.

Evita abrir los archivos directamente mediante file://: el comportamiento del almacenamiento en esas direcciones no es uniforme entre navegadores.

## 10. Límites y errores habituales

- **La API puede existir y aun así fallar.** Las políticas del navegador pueden bloquear el acceso y el espacio disponible es limitado. Por eso usamos try...catch, en lugar de comprobar solo typeof Storage.
- **Las operaciones son síncronas.** Mientras se realizan, ocupan el hilo de JavaScript. Web Storage es apropiado para cantidades pequeñas; para datos más grandes o consultas complejas existe IndexedDB.
- **No es un lugar para secretos.** El JavaScript del mismo origen puede acceder a estos datos; no guardes contraseñas ni trates lo almacenado como información fiable o protegida.
- **No hay transacciones entre varias claves.** Si guardar varios campos falla a mitad, pueden quedar cambios parciales. Estos ejemplos son didácticos.
- **Varias pestañas pueden interferir.** El ejemplo de contactos relee antes de guardar, pero no garantiza escrituras simultáneas sin conflictos. No es una base de datos multiusuario.

## Ampliación El evento storage

Cuando otra página modifica un almacenamiento compartido, podemos recibir el evento storage. No se dispara en la misma ventana que realizó el cambio.

~~~js
window.addEventListener('storage', function (evento) {
    console.log('Clave modificada:', evento.key);
    console.log('Nuevo valor:', evento.newValue);
});
~~~

Con localStorage permite reaccionar a cambios de otras pestañas del mismo origen. Con sessionStorage no comunica pestañas independientes; se limita a documentos que comparten su área de sesión, como ciertos marcos de una misma pestaña. Los ejemplos no implementan actualización automática entre pestañas.

## Documentación

- [Web Storage API en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Uso de Web Storage en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [localStorage en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [sessionStorage en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [Estándar HTML de Web Storage](https://html.spec.whatwg.org/dev/webstorage.html)
