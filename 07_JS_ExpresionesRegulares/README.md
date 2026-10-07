# 07 · Expresiones regulares en JavaScript

Una **expresión regular** es una regla para buscar texto. Por ejemplo, podemos buscar una palabra, comprobar si un texto contiene números o exigir que un código tenga cinco dígitos.

Se suelen usar para:

- **Validar datos:** comprobar el formato de lo que escribe el usuario en un formulario, como un código postal de cinco dígitos, un teléfono o una contraseña con ciertas reglas.
- **Buscar texto:** encontrar palabras, números o patrones dentro de una frase o un documento.
- **Extraer información:** obtener los números de un texto o separar las partes de una fecha.
- **Reemplazar texto:** sustituir coincidencias, por ejemplo ocultar números o cambiar varios separadores por uno solo.

Comprobar el **formato** no garantiza que el dato sea real: un teléfono puede tener la cantidad correcta de dígitos y no existir.

Puedes probar los ejemplos en la consola del navegador (F12). El [archivo HTML de esta carpeta](01_JS_ExpresionesRegulares.html) también muestra ejemplos en la consola.

## 1. Crear una expresión regular y probarla

En JavaScript escribimos el patrón entre dos barras: /patrón/.

~~~js
const patron = /pepe/;

patron.test('conoces a pepe?'); // true: encuentra «pepe».
patron.test('conoces a ana?');  // false: no encuentra «pepe».
~~~

**test()** responde a una pregunta: «¿Este texto cumple el patrón?». Devuelve true (sí) o false (no).

En este caso, /pepe/ busca esas cuatro letras seguidas **en cualquier parte del texto**. Las barras / no forman parte del texto que buscamos.

## 2. Caracteres: qué queremos encontrar

### El punto: un carácter cualquiera

El punto . ocupa el lugar de **un solo carácter**.

~~~js
/a.c/.test('abc');  // true: el punto ocupa el lugar de «b».
/a.c/.test('a7c');  // true: también puede ser un número.
/a.c/.test('a c');  // true: también puede ser un espacio.
/a.c/.test('ac');   // false: falta el carácter intermedio.
/a.c/.test('abbc'); // false: hay dos caracteres entre «a» y «c».
~~~

Por defecto, el punto no admite saltos de línea. Veremos al final cómo cambiarlo.

### Atajos para tipos de caracteres

Estos símbolos permiten buscar un tipo de carácter sin escribir todas las opciones.

| Símbolo | Busca un carácter que sea… |
| --- | --- |
| \d | Un dígito: del 0 al 9. |
| \D | Cualquier cosa excepto un dígito del 0 al 9. |
| \s | Un espacio en blanco: espacio, tabulación o salto de línea, entre otros. |
| \S | Cualquier cosa excepto un espacio en blanco. |
| \w | Una letra de a a z o de A a Z, un dígito o un guion bajo (_). |
| \W | Cualquier cosa que no admita \w. |

Las parejas en minúscula y mayúscula significan lo contrario: \d busca un dígito; \D busca un carácter que no sea un dígito.

~~~js
/\d/.test('Tengo 3 libros'); // true: encuentra el «3».
/\d/.test('Tengo libros');   // false: no hay dígitos.
/\s/.test('hola mundo');     // true: hay un espacio.
/\w/.test('_');              // true: el guion bajo está incluido.
/\w/.test('!');              // false: «!» no está incluido.
~~~

**De momento, cada símbolo busca un solo carácter.** Más adelante veremos cómo pedir varios.

### Corchetes: elegir los caracteres permitidos

[abc] significa «una a, una b o una c». No significa la palabra «abc».

~~~js
/[abc]/.test('b'); // true.
/[abc]/.test('d'); // false.
~~~

Podemos usar un guion para indicar un rango:

| Patrón | Admite un carácter… |
| --- | --- |
| [a-z] | Entre a y z, en minúscula. |
| [A-Z] | Entre A y Z, en mayúscula. |
| [0-9] | Entre 0 y 9; es lo mismo que \d. |
| [A-Za-z] | Que sea una letra inglesa, mayúscula o minúscula. |
| [A-Za-z0-9_] | Que sea una letra inglesa, un dígito o un guion bajo; es el uso habitual de \w. |

Estos rangos de letras no incluyen «ñ» ni vocales con tilde.

### Negación: excluir caracteres

Si ponemos ^ **justo después de abrir el corchete**, significa «cualquier carácter excepto estos».

~~~js
/[^a]/.test('b'); // true: no es «a».
/[^a]/.test('a'); // false.
/[^a]/.test('7'); // true: también admite números.
~~~

Cuidado: [a-z^c] **no excluye la c**. Para admitir letras de a a z excepto la c, podemos escribir [a-bd-z]: de a a b, y de d a z.

## 3. Cuantificadores: cuántas veces debe aparecer

Un **cuantificador** indica cuántas veces se repite lo que tiene justo delante.

~~~js
/\d/.test('abc');   // false: busca un dígito.
/\d{3}/.test('123'); // true: busca tres dígitos seguidos.
~~~

| Patrón | Se lee como… |
| --- | --- |
| a* | La a puede aparecer cero o más veces. |
| a+ | La a debe aparecer una o más veces. |
| a? | La a puede aparecer cero o una vez. |
| a{3} | La a debe aparecer exactamente tres veces seguidas. |
| a{2,} | La a debe aparecer al menos dos veces seguidas. |
| a{2,4} | La a debe aparecer entre dos y cuatro veces seguidas. |

En a{n}, sustituimos n por el número que necesitemos. En a{n,m}, n es el mínimo y m el máximo.

Veamos la diferencia entre *, + y ? con una palabra:

~~~js
/ab*c/.test('ac');    // true: puede haber cero «b».
/ab*c/.test('abbbc'); // true: también puede haber varias.

/ab+c/.test('ac');    // false: exige al menos una «b».
/ab+c/.test('abbc');  // true.

/ab?c/.test('ac');    // true: cero «b».
/ab?c/.test('abc');   // true: una «b».
/ab?c/.test('abbc');  // false: dos «b» no están permitidas.
~~~

## 4. Anclajes: comprobar el texto completo

Hasta ahora hemos buscado **dentro** de un texto. Para validar un dato, normalmente queremos que **todo el texto** cumpla la regla.

- ^ indica el inicio del texto.
- $ indica el final del texto.

~~~js
/\d{3}/.test('abc123xyz');   // true: encuentra tres dígitos dentro.
/^\d{3}$/.test('abc123xyz'); // false: el texto tiene que empezar por 3 digitos y acabar con tres digitos.
/^\d{3}$/.test('123');       // true: el texto empieza por 3 digiots y acaba con tres digitos.
/^\d{3}$/.test('1234');      // false: tiene cuatro digitos.
~~~

Leemos /^\d{3}$/ así: «Desde el principio hasta el final, debe haber exactamente tres dígitos».

**El símbolo ^ tiene dos usos:** fuera de corchetes indica el inicio; al principio de los corchetes [^...] indica negación.

## 5. Escapar caracteres especiales

¿Qué hacemos si queremos buscar un punto de verdad? Como . tiene un significado especial, ponemos una **barra invertida** delante: \..

Esto se llama **escapar** un carácter: le quitamos su función especial para buscarlo tal cual.

~~~js
/^3.14$/.test('3x14');  // true: el punto acepta la «x».
/^3\.14$/.test('3x14'); // false: ahora exige un punto.
/^3\.14$/.test('3.14'); // true.
~~~

Otros ejemplos: \+ busca un signo más, \? busca un signo de interrogación y \\ busca una barra invertida.

Recuerda la diferencia: **/** delimita el patrón; **\** sirve para escapar o escribir atajos como \d.

## 6. Alternativas y grupos

### La barra vertical: una opción u otra

El símbolo | significa «o».

~~~js
/rojo|verde/.test('rojo');  // true.
/rojo|verde/.test('verde'); // true.
/rojo|verde/.test('azul');  // false.
~~~

### Paréntesis: agrupar reglas

Los paréntesis permiten tratar varios caracteres como un bloque.

~~~js
/^(ab)+$/.test('ab');     // true: un bloque «ab».
/^(ab)+$/.test('abab');   // true: dos bloques «ab».
/^(ab)+$/.test('abb');    // false: no son bloques completos.
~~~

El + repite todo el grupo (ab), porque es lo que tiene justo delante.

También podemos agrupar alternativas para comprobar el texto completo:

~~~js
/^(rojo|verde)$/.test('verde');      // true.
/^(rojo|verde)$/.test('verde claro'); // false.
~~~

Los paréntesis también permiten guardar partes del resultado, llamadas **capturas**. Encontrarás un ejemplo al final.

## 7. Banderas: cambiar cómo se busca

Las **banderas** son letras que se escriben después de la barra final. Para empezar, nos interesan dos:

| Bandera | Para qué sirve |
| --- | --- |
| i | Ignorar la diferencia entre mayúsculas y minúsculas. |
| g | Buscar todas las coincidencias, por ejemplo con match(). |

~~~js
/pepe/.test('PEPE');  // false.
/pepe/i.test('PEPE'); // true: usamos i.

'Pepe y pepe'.match(/pepe/gi); // ['Pepe', 'pepe']: usamos g e i juntas.
~~~

## 8. Métodos principales: qué hacemos con el patrón

Ya conocemos test(), que devuelve true o false. Estos otros métodos permiten obtener o modificar texto.

### match(): obtener lo que se ha encontrado

~~~js
'Hay 12 y 34'.match(/\d+/g); // ['12', '34'].
'No hay números'.match(/\d+/g); // null: no hay coincidencias.
~~~

\d+ busca uno o más dígitos seguidos. La bandera g hace que obtengamos todos los números.

### replace(): reemplazar coincidencias

~~~js
'Hay 12 y 34'.replace(/\d+/g, '#'); // 'Hay # y #'.
~~~

Devuelve una nueva cadena con los números reemplazados. Con g reemplaza todas las coincidencias; sin g, solo la primera.

### Otros métodos para consultar cuando los necesites

| Método | Para qué sirve |
| --- | --- |
| patron.exec(texto) | Obtener una coincidencia y detalles como su posición o sus capturas. Devuelve null si no encuentra nada. |
| texto.search(patron) | Obtener la posición de la primera coincidencia; devuelve -1 si no encuentra nada. |
| texto.split(patron) | Dividir el texto usando el patrón como separador. |
| texto.matchAll(patron) | Recorrer todas las coincidencias y sus capturas. Con una expresión regular, requiere g. |
| texto.replaceAll(patron, sustituto) | Reemplazar todas las coincidencias. Con una expresión regular, requiere g. |

## 9. Construir una validación paso a paso

Queremos comprobar un código de **cinco dígitos**:

1. \d pide un dígito.
2. \d{5} pide cinco dígitos seguidos.
3. ^\d{5}$ exige que todo el texto sean esos cinco dígitos.
4. Lo escribimos entre barras y usamos test().

~~~js
const codigoPostal = /^\d{5}$/;

codigoPostal.test('28001');  // true.
codigoPostal.test('2800');   // false: falta un dígito.
codigoPostal.test('280011'); // false: sobra un dígito.
codigoPostal.test('28A01');  // false: contiene una letra.
~~~

Otro ejemplo: un usuario de 3 a 16 caracteres, con letras inglesas, números o guion bajo.

~~~js
const usuario = /^[A-Za-z0-9_]{3,16}$/;

usuario.test('ana_23'); // true.
usuario.test('an');    // false: demasiado corto.
usuario.test('ana!');  // false: «!» no está permitido.
~~~

Se lee así: «Todo el texto debe tener entre 3 y 16 caracteres del conjunto permitido».

Para comprobar el **formato** de un DNI:

~~~js
const formatoDNI = /^\d{8}[A-Z]$/;
formatoDNI.test('12345678Z'); // true: ocho dígitos y una letra mayúscula.
~~~

La expresión comprueba la estructura. Para saber si la letra del DNI es la correcta, necesitamos calcularla con JavaScript. Del mismo modo, tener cinco dígitos no garantiza que un código postal exista.

### Usar un patrón en un formulario HTML

En el atributo pattern escribimos la regla **sin las barras /**. El navegador comprueba el valor completo. required hace que el campo no pueda quedar vacío.

~~~html
<input type="text" pattern="[A-Za-z]{3}" required
       title="Escribe exactamente tres letras inglesas">
~~~

Este campo acepta, por ejemplo, «Ana», pero no «An» ni «Ana1».

## 10. Errores frecuentes

- Buscar tres dígitos con /\d{3}/ cuando queremos validar todo el dato. Para eso usamos /^\d{3}$/.
- Confundir [abc] (un carácter de entre tres opciones) con (abc) (la secuencia completa).
- Usar . para un punto literal. Para un punto literal escribimos \..
- Creer que \w incluye todas las letras españolas: para empezar, recuerda letras inglesas, dígitos y guion bajo.
- Escribir [a-z^c] para excluir la c. Podemos usar [a-bd-z].

## Ampliación: para cuando domines lo anterior

No necesitas estas opciones para empezar. Puedes volver a esta sección cuando las reglas básicas te resulten familiares.

### Crear un patrón con new RegExp()

Además de las barras, existe el constructor RegExp. Es útil cuando el patrón se construye a partir de una variable.

~~~js
const palabra = 'pepe';
const patron = new RegExp(palabra, 'i');
patron.test('PEPE'); // true.
~~~

Como el constructor recibe una cadena, las barras invertidas se escriben dos veces:

~~~js
const conBarras = /\d+/;
const conConstructor = new RegExp('\\d+'); // El mismo patrón.
~~~

### Obtener capturas con exec()

Cada grupo entre paréntesis guarda la parte del texto que le corresponde.

~~~js
const resultado = /^(\d{2})-(\d{2})$/.exec('07-10');

console.log(resultado[0]); // '07-10': coincidencia completa.
console.log(resultado[1]); // '07': primer grupo.
console.log(resultado[2]); // '10': segundo grupo.
~~~

Si no hay coincidencia, exec() devuelve null. Comprueba que haya resultado antes de acceder a sus posiciones.

Si solo queremos agrupar y no guardar una captura, podemos escribir (?:...) en lugar de (...).

### Otras banderas y límites

| Símbolo o bandera | Función |
| --- | --- |
| m | Hace que ^ y $ también indiquen el principio y final de cada línea. |
| s | Permite que el punto . admita saltos de línea. |
| \b | Marca un límite de palabra, según los caracteres que reconoce \w. |
| \B | Marca una posición que no es un límite de palabra. |

~~~js
/a.b/.test('a\nb');  // false: hay un salto de línea entre «a» y «b».
/a.b/s.test('a\nb'); // true: s permite que el punto lo admita.
/\bpan\b/.test('pan caliente'); // true: encuentra la palabra «pan».
/\bpan\b/.test('pantalla');     // false: «pan» es parte de otra palabra.
~~~

### Buscar el máximo o el mínimo

Por defecto, * y + intentan abarcar todo lo que puedan. Si añadimos ? después, intentan abarcar lo mínimo necesario.

~~~js
'<b>hola</b>'.match(/<.*>/)[0];  // '<b>hola</b>': hasta el último >.
'<b>hola</b>'.match(/<.*?>/)[0]; // '<b>': hasta el primer >.
~~~

A estas dos formas se las llama **codiciosa** y **perezosa**, respectivamente.

### Reutilizar test() con la bandera g

Con g, test() y exec() recuerdan por dónde van buscando mediante la propiedad lastIndex. Por eso, repetir una llamada con el mismo patrón puede dar resultados distintos.

~~~js
const patron = /a/g;
patron.test('a'); // true.
patron.test('a'); // false: la búsqueda continúa desde la posición anterior.
~~~

Para una validación con test(), normalmente no necesitamos g. La bandera y también guarda esa posición.

### Letras de distintos idiomas con Unicode

[A-Za-z] no incluye «ñ» ni vocales con tilde. Para admitir letras de muchos idiomas, podemos usar **\p{L}** con la bandera **u**.

Unicode es un estándar que representa caracteres de distintos idiomas. \p{L} pide un carácter de la categoría «letra»; la L viene de *Letter*.

~~~js
const soloLetras = /^\p{L}+$/u;

soloLetras.test('España');    // true: admite la «ñ».
soloLetras.test('Álvaro');    // true: admite la «Á».
soloLetras.test('Ana23');     // false: contiene números.
soloLetras.test('Ana María'); // false: contiene un espacio.
~~~

Ahora ya podemos leerlo con las reglas que conocemos: ^ marca el inicio, \p{L} pide una letra, + pide una o más, y $ marca el final. La u permite usar esta propiedad Unicode.

Algunos acentos se guardan como una marca separada de la letra. Para letras acentuadas habituales, normalize('NFC') ayuda a unir ambas partes antes de comprobar el texto:

~~~js
soloLetras.test('Álvaro'.normalize('NFC')); // true.
~~~

### Aserciones que comprueban lo que hay alrededor

Ya conocemos ^ y $, que indican el inicio y el final del texto. Existen otras aserciones que comprueban qué hay antes o después de lo que buscamos, **sin incluir esos caracteres en la coincidencia**.

En las reglas siguientes, x e y representan los patrones que queramos comprobar; no es necesario escribir esas letras.

| Regla | Se lee como… | Ejemplo |
| --- | --- | --- |
| x(?=y) | Busca x si justo después viene y. | /Java(?=Script)/ encuentra «Java» en «JavaScript». |
| x(?!y) | Busca x si justo después no viene y. | /Java(?!Script)/ encuentra «Java» en «Java es un lenguaje», pero no en «JavaScript». |
| (?<=y)x | Busca x si justo antes viene y. | /(?<=€)\d+/ encuentra «25» en «€25». |
| (?<!y)x | Busca x si justo antes no viene y. | /(?<!€)25/ encuentra «25» en «Precio: 25», pero no en «€25». |

Las dos primeras comprueban lo que viene **después** (*lookahead*). Las otras dos comprueban lo que viene **antes** (*lookbehind*). El signo = indica que exigimos ese contexto; el signo ! indica que lo excluimos.

Por ejemplo, si queremos obtener un número que tenga el símbolo del euro delante:

~~~js
const texto = 'Precio: €25';
const resultado = texto.match(/(?<=€)\d+/);

console.log(resultado[0]); // '25': el símbolo € no se incluye.
~~~

### Límites de palabra con \b y \B

Estos símbolos comprueban una **posición** del texto, no un carácter que deban recoger.

- \b indica un límite de palabra: por ejemplo, el principio o el final de «pan» en «pan caliente».
- \B indica una posición que no es un límite de palabra: por ejemplo, entre la «n» y la «t» de «pantalla».

~~~js
/\bpan\b/.test('pan caliente'); // true: «pan» es una palabra completa.
/\bpan\b/.test('pantalla');     // false: después de «pan» sigue otra letra.

/pan\B/.test('pantalla');     // true: después de «pan» sigue otra letra.
/pan\B/.test('pan caliente'); // false: después de «pan» hay un límite.
~~~

Estos límites se basan en los caracteres que reconoce \w; no identifican perfectamente las palabras de todos los idiomas. Para practicar, utiliza primero palabras sin tildes ni ñ.

Para empezar, basta con dominar ^, $ y \b. Puedes volver a las comprobaciones de lo que viene antes o después cuando te resulten familiares las reglas básicas.

### Clases de caracteres y escapes menos habituales

La lista del HTML parece larga porque mezcla **atajos para tipos de caracteres** con **formas de escribir caracteres especiales**. No necesitas aprenderlos todos para validar un formulario.

Para empezar, quédate con . (un carácter cualquiera, salvo saltos de línea), \d (un dígito), \s (un espacio en blanco) y \w (letras inglesas, dígitos o guion bajo). Sus versiones en mayúscula, \D, \S y \W, buscan lo contrario. Ya los hemos practicado en las secciones iniciales.

#### Saltos de línea y tabulaciones

Algunos caracteres no se ven como una letra, pero también forman parte del texto. Estos escapes permiten escribirlos o buscarlos:

| Escape | Qué representa | Uso habitual |
| --- | --- | --- |
| \n | Salto de línea. | Pasar a la línea siguiente. |
| \r | Retorno de carro. | Puede aparecer junto a \n en los saltos de línea de archivos Windows. |
| \t | Tabulación. | Separar o alinear partes de un texto. |
| \f | Salto de página. | Poco habitual en formularios. |
| \v | Tabulación vertical. | Poco habitual en formularios. |

~~~js
const texto = 'Hola\nAna'; // El texto contiene un salto de línea.
/\n/.test(texto);         // true: encuentra ese salto.
/\s/.test(texto);         // true: \s también admite saltos de línea.

/\t/.test('Nombre\tAna'); // true: encuentra la tabulación.
~~~

En estos ejemplos, la cadena utiliza un escape para **crear** el carácter especial y la expresión regular utiliza el mismo escape para **buscarlo**.

#### Caracteres escritos mediante códigos

También podemos representar un carácter con su código numérico. No hace falta usar estos códigos cuando podemos escribir directamente la letra o el símbolo.

| Escape | Qué representa | Ejemplo |
| --- | --- | --- |
| \xhh | Un código hexadecimal de exactamente dos cifras. | \x41 representa «A». |
| \uhhhh | Una unidad de código Unicode de exactamente cuatro cifras hexadecimales. | \u0041 representa «A». |
| \u{...} | Un punto de código Unicode escrito entre llaves; requiere la bandera u o v. | /\u{1F600}/u reconoce «😀». |

Las letras h son marcadores: se sustituyen por cifras hexadecimales (0–9 y A–F). Por ejemplo, 41 es el código hexadecimal de «A».

~~~js
/\x41/.test('A');   // true.
/\u0041/.test('A'); // true.
/A/.test('A');      // true: para esta letra, es la forma más sencilla.
~~~

**Corrección de la lista original:** \uhhhhh no es la forma de escribir un código Unicode más largo. Utilizamos \u{...} con la bandera correspondiente.

#### Otros escapes que puedes dejar para más adelante

| Escape | Significado |
| --- | --- |
| \cX | Un carácter de control, donde X es una letra de A a Z. Por ejemplo, \cI representa una tabulación. |
| \0 | El carácter nulo, cuyo código es cero. No es el dígito «0»; no debe ir seguido de otro dígito en este escape. |
| [\b] | El carácter de retroceso (*backspace*), de código 8. No borra texto al usarlo en una expresión regular: busca ese carácter. |

**Cuidado con \b:** fuera de los corchetes indica un límite de palabra; dentro, como en [\b], representa el carácter de retroceso. Son dos significados distintos.

Por último, la barra invertida \ no es una clase de caracteres por sí sola: introduce escapes, como \d o \.. Para buscar una barra invertida literal, el patrón es /\\/.

Para el ejercicio del formulario, basta con dominar los corchetes, \d, los cuantificadores y ^ y $. Los escapes de control y los códigos numéricos quedan como material de consulta.

### Grupos con nombre y referencias a capturas

Ya hemos visto que (abc) agrupa la secuencia «abc» y guarda una captura. Estas dos opciones amplían esa idea. Son útiles para extraer información o comprobar repeticiones, pero no son necesarias para el formulario de la práctica.

#### Capturas con nombre

Con (?<nombre>...) podemos dar un nombre a la parte del texto que guardamos. Así podemos recuperarla por su nombre, en lugar de recordar si era el primer o el segundo grupo.

Por ejemplo, queremos separar el día y el mes de un texto como «07-10»:

~~~js
const patron = /^(?<dia>\d{2})-(?<mes>\d{2})$/;
const resultado = patron.exec('07-10');

if (resultado !== null) {
  console.log(resultado.groups.dia); // '07'.
  console.log(resultado.groups.mes); // '10'.
}
~~~

- (?<dia>\d{2}) guarda los primeros dos dígitos con el nombre dia.
- El guion exige un guion literal entre ambas partes.
- (?<mes>\d{2}) guarda los siguientes dos dígitos con el nombre mes.
- resultado.groups contiene las capturas con nombre.

exec() devuelve null si el texto no cumple el patrón; por eso comprobamos el resultado antes de acceder a los grupos. Este patrón solo comprueba el formato: no garantiza que el día o el mes sean válidos.

#### Referencias a una captura anterior

Una referencia como \1 significa «repite exactamente el texto que guardó el primer grupo». \2 se refiere al segundo grupo, y así sucesivamente. Los grupos se numeran según el orden de sus paréntesis de apertura; los grupos (?:...) no cuentan porque no capturan.

~~~js
const repeticion = /^(\w+)-\1$/;

repeticion.test('hola-hola');  // true.
repeticion.test('hola-adios'); // false.
repeticion.test('abc-abc');    // true.
~~~

El patrón se lee así:

1. ^ marca el inicio.
2. (\w+) guarda una secuencia de uno o más caracteres de palabra en el primer grupo.
3. - exige un guion literal.
4. \1 exige exactamente el mismo texto que guardó ese grupo.
5. $ marca el final.

La diferencia con /^(\w+)-(\w+)$/ es que ese otro patrón admite dos secuencias distintas, como «hola-adios». **\1 exige que la segunda sea igual a la primera**, no solo que tenga el mismo tipo de caracteres.

En la lista del HTML, \Number representa esta familia de referencias: al escribir el patrón, se sustituye Number por el número del grupo, como \1 o \2.

Como referencia final: (x) agrupa y captura; (?:x) agrupa sin capturar; (?<nombre>x) captura con nombre; y \1 reutiliza el texto de una captura anterior.
