# 08 · Geolocalización en JavaScript

La geolocalización permite solicitar la posición aproximada del dispositivo desde el navegador. Podemos usarla para mostrar servicios cercanos, centrar un mapa o actualizar una ubicación mientras la página está en uso.

Primero aprenderemos a obtener las coordenadas. Los mapas quedan para el final: son una herramienta adicional, no un requisito para usar la geolocalización.

## 1. Latitud y longitud

La posición se expresa mediante dos ángulos en grados decimales:

| Coordenada | Qué indica | Valores |
| --- | --- | --- |
| Latitud | La posición al norte o al sur del ecuador. | De −90 a 90. Norte positivo, sur negativo. |
| Longitud | La posición al este o al oeste del meridiano de Greenwich. | De −180 a 180. Este positivo, oeste negativo. |

Por ejemplo, Madrid está aproximadamente en latitud 40.42 y longitud −3.70. Son medidas angulares, no distancias en kilómetros.

El navegador puede apoyarse en GPS, redes wifi, información de red u otros recursos. Desde JavaScript no elegimos el proveedor y no podemos garantizar una posición exacta. En un ordenador puede haber bastante diferencia respecto a la ubicación real.

## 2. Permisos y requisitos

- La API requiere un contexto seguro: HTTPS. Para desarrollar, los navegadores también consideran confiable http://localhost; puedes usar Live Server con esa dirección.
- El usuario debe conceder permiso. El navegador puede recordar una decisión anterior: no tiene por qué preguntar en cada llamada.
- La configuración del navegador, del sistema operativo o las políticas de la página también pueden impedir el acceso.
- Acceder desde otro dispositivo a una dirección HTTP de la red local no equivale a usar localhost; puede requerir HTTPS.

Los ejemplos solicitan la posición al pulsar un botón. Los primeros tres no necesitan Google Maps ni una clave de API.

## 3. Pedir una posición

La API está en navigator.geolocation. getCurrentPosition() solicita una posición y llama después a una función con el resultado.

~~~js
function mostrarPosicion(posicion) {
    console.log(posicion.coords.latitude);
    console.log(posicion.coords.longitude);
}

function mostrarError(error) {
    console.log('No se ha obtenido la posición. Código:', error.code);
}

if (window.isSecureContext && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
}
~~~

Las funciones que pasamos como argumentos se llaman **callbacks**. No ponemos mostrarPosicion(): queremos que el navegador la ejecute más tarde, cuando tenga un resultado.

Esta operación es **asíncrona**: el programa continúa mientras se solicita el permiso y se obtiene la ubicación. getCurrentPosition() no devuelve las coordenadas ni una promesa; las coordenadas llegan al callback de éxito.

## 4. Leer el resultado

El navegador entrega un objeto GeolocationPosition. Su propiedad coords contiene las coordenadas:

| Propiedad | Qué contiene |
| --- | --- |
| coords.latitude | Latitud en grados decimales. |
| coords.longitude | Longitud en grados decimales. |
| coords.accuracy | Precisión horizontal estimada en metros, con un nivel de confianza del 95 %. Un valor menor indica mayor precisión. |
| timestamp | Momento en que se obtuvo la posición, en milisegundos desde el inicio de 1970. |

También puede haber altitud, precisión de altitud, rumbo y velocidad. Estos datos pueden ser null si no están disponibles; no hay que asumir que siempre existen.

Mostrar muchas cifras decimales no significa que la ubicación sea más precisa. Conviene mostrar también accuracy.

## 5. Gestionar errores

El callback de error recibe un objeto con code y message. Los códigos definidos son:

| Código | Nombre | Significado |
| --- | --- | --- |
| 1 | PERMISSION_DENIED | El acceso no está permitido, por decisión del usuario o por restricciones. |
| 2 | POSITION_UNAVAILABLE | No se ha podido determinar la ubicación. |
| 3 | TIMEOUT | Se ha agotado el tiempo disponible para obtenerla. |

No existe un código estándar 0 de «error desconocido». Podemos utilizar default en un switch para cualquier caso inesperado.

En los ejemplos mostramos mensajes propios en español. Si un permiso se ha bloqueado, hay que revisarlo en los ajustes del sitio; volver a pulsar no obliga al navegador a preguntar otra vez.

## 6. Opciones de la solicitud

Podemos pasar un tercer argumento:

~~~js
const opciones = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};

navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError, opciones);
~~~

| Opción | Función | Valor por defecto |
| --- | --- | --- |
| enableHighAccuracy | Solicita mayor precisión si el dispositivo puede ofrecerla. Puede tardar más y consumir más batería; no garantiza GPS ni precisión exacta. | false |
| timeout | Tiempo máximo de adquisición, en milisegundos. 10000 son 10 segundos. | Infinity |
| maximumAge | Antigüedad máxima aceptada para una posición guardada en caché, en milisegundos. 0 solicita una nueva; Infinity permite una guardada de cualquier antigüedad. | 0 |

El tiempo esperando permiso y ciertas esperas de visibilidad no se cuentan como tiempo de adquisición. Por eso timeout no debe entenderse como un cronómetro exacto desde que se pulsa el botón.

Un tiempo de 500 milisegundos es muy corto y puede provocar TIMEOUT, pero no garantiza que ocurra siempre. El ejemplo 03 permite modificarlo para comparar resultados.

## 7. Obtener actualizaciones y detenerlas

getCurrentPosition() solicita un resultado. watchPosition() registra un seguimiento y puede llamar varias veces al callback cuando hay nuevas posiciones.

~~~js
let watchId = null;

function iniciar() {
    if (watchId !== null) return;
    watchId = navigator.geolocation.watchPosition(
        mostrarPosicion,
        mostrarError,
        { timeout: 10000 }
    );
}

function detener() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}
~~~

Este fragmento supone que ya se han comprobado el contexto seguro y la disponibilidad, como hacemos en los HTML.

watchPosition() devuelve un identificador que debemos guardar para pasárselo a clearWatch(). Usamos null para indicar que no hay seguimiento: un identificador 0 no debe confundirse con «no iniciado».

No se ejecuta a intervalos fijos ni garantiza seguimiento en segundo plano. No es exclusivo de móviles. En el ejemplo 05 evitamos seguimientos duplicados y detenemos el seguimiento al pulsar Detener, al abandonar la página o ante un error.

## 8. Geolocalización y Google Maps son cosas diferentes

**El navegador obtiene la posición; Google Maps dibuja el mapa.** La API de Google Maps no sustituye al permiso de geolocalización.

Los ejemplos 04 y 05 requieren una configuración adicional en Google Cloud:

1. Crear o elegir un proyecto con facturación habilitada y activar Maps JavaScript API.
2. Crear una clave propia y restringirla a los sitios autorizados y a esa API. Incluye el origen local que utilices para practicar.
3. Introducirla en el campo del ejemplo y pulsar Cargar API de mapas.
4. Esperar el mensaje de carga y pulsar el botón de ubicación o seguimiento.

Consulta las condiciones y precios de Google antes de utilizar el servicio. Los ejemplos no incluyen una clave funcional ni crean recursos o habilitan facturación automáticamente.

La clave de una aplicación web será visible en el navegador; su protección depende de las restricciones de uso, no de ocultarla en el HTML. No publiques claves personales sin restricciones.

### Esperar a que cargue la API

El script de Google se descarga de forma asíncrona. Nuestros ejemplos activan el botón de ubicación desde apiCargada(), la función indicada en el parámetro callback. Así no intentamos usar google.maps antes de que esté disponible.

Si falla la descarga, se muestra un mensaje. Los errores de autorización pueden requerir revisar la consola del navegador, las restricciones de clave, la API habilitada y la facturación, y después recargar la página.

### Mapa y marcador

El contenedor del mapa necesita una altura CSS distinta de cero para verse. El mapa se configura con center y zoom. Google utiliza un objeto con propiedades lat y lng para indicar el punto.

~~~js
const punto = { lat: 40.42, lng: -3.70 };
const mapa = new google.maps.Map(document.getElementById('mapa'), {
    center: punto,
    zoom: 15,
    mapId: 'DEMO_MAP_ID'
});

const marcador = new google.maps.marker.AdvancedMarkerElement({
    map: mapa,
    position: punto,
    title: 'Ubicación'
});
~~~

Este fragmento se ejecuta después de cargar Maps JavaScript API y su biblioteca marker. Utiliza DEMO_MAP_ID para practicar; en una aplicación real se configura un identificador de mapa propio.

El antiguo google.maps.Marker está declarado obsoleto desde febrero de 2024. Se ha sustituido por AdvancedMarkerElement, que requiere la biblioteca marker y un mapId. Las antiguas animaciones BOUNCE no se trasladan como opción a este marcador.

Durante el seguimiento conservamos el mapa y el marcador: actualizamos su centro y posición en vez de recrearlos con cada lectura.

## 9. Orden para probar los archivos

| Archivo | Qué practicar |
| --- | --- |
| [01_JS_Geolocalizacion.html](01_JS_Geolocalizacion.html) | Solicitar una posición y mostrar coordenadas y precisión. |
| [02_JS_Geolocalizacion.html](02_JS_Geolocalizacion.html) | Distinguir los tres errores definidos. |
| [03_JS_Geolocalizacion.html](03_JS_Geolocalizacion.html) | Cambiar el timeout y observar las opciones. |
| [04_JS_GoogleMaps.html](04_JS_GoogleMaps.html) | Mostrar una posición sobre un mapa. Requiere configuración de Google. |
| [05_JS_GoogleMaps.html](05_JS_GoogleMaps.html) | Iniciar y detener actualizaciones de posición sobre el mapa. |

Abre los archivos con Live Server en localhost. Prueba conceder y denegar el permiso y revisa cómo cambia el mensaje. Las herramientas de desarrollo de algunos navegadores permiten simular una ubicación o que no esté disponible; los nombres de esas opciones varían.

Para probar el ejemplo 03, reduce el tiempo y después vuelve a un valor razonable. No dependas de un TIMEOUT garantizado. En el 05, prueba detener antes de recibir la primera posición y reiniciar después.

## 10. Límites que conviene recordar

- La ubicación puede ser imprecisa o no estar disponible, incluso con permiso.
- Un mapa vacío no implica necesariamente un fallo de geolocalización: puede ser un error de carga o configuración de Google.
- Detener el seguimiento evita nuevas lecturas de ese registro; el ejemplo conserva la última posición en pantalla.
- Los ejemplos no guardan coordenadas en el workspace ni en Web Storage. Al usar los mapas, Google recibe las solicitudes necesarias para representarlos.

## Documentación

- [getCurrentPosition en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)
- [Errores de geolocalización en MDN](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError)
- [watchPosition en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition)
- [Especificación de geolocalización](https://www.w3.org/TR/geolocation/)
- [Configurar Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Carga de Google Maps](https://developers.google.com/maps/documentation/javascript/load-maps-js-api)
- [Migrar a marcadores avanzados](https://developers.google.com/maps/documentation/javascript/advanced-markers/migration)
