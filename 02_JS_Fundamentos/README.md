# 02 · Fundamentos de JavaScript

En este apartado aprenderemos las bases del lenguaje: guardar datos, hacer operaciones, tomar decisiones, repetir instrucciones y organizar el código mediante funciones y objetos.

El objetivo es comprender qué hace cada instrucción y cómo combinarla con otras para resolver problemas sencillos. Al principio tendremos una primera interacción con una página HTML, que ampliaremos en los apartados de DOM y eventos.

## Antes de empezar

Conviene conocer la estructura básica de un documento HTML y cómo incluir JavaScript con la etiqueta `<script>`. No necesitas dominar todavía los formularios ni la manipulación de páginas.

Abre cada ejemplo en el navegador, preferiblemente con Live Server. Pulsa **F12** y entra en la pestaña **Consola** de las herramientas de desarrollo: allí verás lo que muestra `console.log()`. Muchos ejemplos apenas muestran contenido en la página porque sus resultados aparecen en la consola.

## Qué vamos a ver

### 01 Variables

[01_JS_Variables.html](01_JS_Variables.html)

Una variable permite guardar un valor para utilizarlo después. Veremos declaraciones con `var`, `let` y `const`, asignaciones y tipos de datos: números, textos y valores booleanos (`true` y `false`).

También aparecerán la concatenación, las plantillas de texto, `typeof`, los valores `undefined`, `null` y `NaN`, y el **ámbito**: desde qué partes del programa podemos acceder a una variable.

**Al terminar:** deberías poder guardar un nombre y una edad, mostrarlos por consola y distinguir entre una variable que se reasigna y una constante.

### 02 Introducción a los eventos

[02_JS_IntroduccionEventos.html](02_JS_IntroduccionEventos.html)

Conectaremos las funciones con acciones del usuario, como pulsar un botón. También veremos cómo acceder a elementos HTML, leer campos y cambiar contenido o estilos.

**Al terminar:** deberías poder explicar cómo una pulsación provoca la ejecución de una función. Los apartados de DOM, eventos y formularios desarrollan estos conceptos más adelante.

### 03 Operadores

[03_JS_Operadores.html](03_JS_Operadores.html)

Los operadores permiten calcular resultados, comparar valores y combinar condiciones. Trabajaremos la asignación, las operaciones aritméticas, el incremento y decremento y las asignaciones abreviadas, como `+=`.

Después veremos comparaciones, las diferencias entre `==` y `===`, y los operadores lógicos `&&` (y), `||` (o) y `!` (negación).

**Al terminar:** deberías poder calcular un precio y comprobar si cumple una condición, como superar una cantidad determinada.

### 04 Control de flujo

[04_JS_ControDeFlujo.html](04_JS_ControDeFlujo.html)

Un programa puede elegir un camino según una condición o repetir una tarea varias veces. Veremos decisiones con `if`, `else if`, `else`, `switch` y el operador ternario.

Para las repeticiones utilizaremos `for`, `while` y `do...while`, además de `break` y `continue` para controlar el recorrido.

**Al terminar:** deberías poder decidir si una persona es mayor de edad y recorrer una secuencia de números sin crear un bucle infinito.

### 05 Arrays

[05_JS_Arrays.html](05_JS_Arrays.html)

Un array agrupa valores en una lista ordenada. Aprenderemos a crear listas, acceder a sus elementos por índice y consultar su longitud con `length`.

Veremos métodos como `push()`, `pop()`, `shift()`, `splice()`, `join()` y `reverse()`, y distintas formas de recorrer colecciones. También habrá un primer contacto con estructuras de clave y valor.

**Al terminar:** deberías poder gestionar una lista de nombres y mostrar sus elementos. El primer índice es **0**. Para listas usaremos arrays; para datos identificados por claves distinguiremos los objetos y `Map`.

### 06 Cadenas de texto

[06_JS_String.html](06_JS_String.html)

Trabajaremos con cadenas para consultar su longitud, convertir a mayúsculas, acceder a caracteres, buscar posiciones, eliminar espacios de los extremos y extraer partes de un texto.

**Al terminar:** deberías poder limpiar los espacios de un nombre y obtener una versión en mayúsculas. Las cadenas son inmutables: estas operaciones devuelven un resultado y no cambian el texto original.

### 07 Funciones

[07_JS_Funciones.html](07_JS_Funciones.html)

Una función agrupa instrucciones para ejecutarlas cuando las necesitemos y reutilizarlas con distintos datos. Veremos cómo declararla, invocarla, recibir parámetros y devolver resultados con `return`.

Probaremos qué sucede si faltan argumentos o se pasan valores de tipos distintos. El ejemplo también introduce `arguments`, que permite consultar los argumentos recibidos por una función tradicional.

**Al terminar:** deberías poder escribir una función que reciba dos números y devuelva su suma. Mostrar un resultado por consola y devolverlo con `return` son acciones diferentes.

### 08 Math

[08_JS_Math.html](08_JS_Math.html)

El objeto `Math` reúne herramientas matemáticas que utilizamos directamente, sin crear una instancia: constantes como `Math.PI`, números pseudoaleatorios con `Math.random()`, redondeos con `round()`, `floor()` y `ceil()`, potencias y raíces cuadradas.

**Al terminar:** deberías poder elegir un redondeo adecuado y combinar operaciones para generar un número entero aleatorio dentro de un rango.

### 09 Date

[09_JS_Date.html](09_JS_Date.html)

Usaremos objetos `Date` para representar fechas y horas, crearlas de distintas formas, consultar sus partes y modificar algunos valores.

**Al terminar:** deberías poder crear una fecha y obtener su año, mes y día. Presta atención a los meses: en el constructor numérico y en `getMonth()` se numeran de **0 a 11**.

### 10 Objetos

[10_JS_Objetos.html](10_JS_Objetos.html)

Un objeto agrupa datos relacionados mediante propiedades y puede incorporar funciones, llamadas métodos. Por ejemplo, una persona puede tener nombre, edad y un método para presentarse.

Veremos acceso con punto y corchetes, modificación de propiedades y uso de `this`. Después se introducen funciones constructoras, prototipos y propiedades y funciones asociadas al constructor.

**Al terminar:** deberías poder crear un objeto sencillo y llamar a uno de sus métodos. La parte de prototipos requiere más calma y puede repasarse después de trabajar las clases.

### 11 Clases

[11_JS_Clases01.html](11_JS_Clases01.html)

Una clase describe cómo crear objetos con características y comportamientos comunes. Veremos `class`, el constructor, la creación de instancias con `new`, las propiedades públicas y los campos privados con `#`.

También se introducen métodos, getters y setters, miembros estáticos y herencia con `extends` y `super`.

**Al terminar:** deberías poder crear una clase sencilla, construir dos objetos y entender que cada uno conserva sus propios datos de instancia.

### 12 Funciones flecha

[12_FuncionesFlecha/README.md](12_FuncionesFlecha/README.md)

Un recorrido con varios ejemplos pequeños para pasar de funciones tradicionales a funciones flecha. Primero practicaremos la sintaxis, los parámetros y el retorno; después pasaremos funciones como argumentos y trabajaremos con listas mediante forEach(), map() y filter().

**Al terminar:** deberías poder escribir una flecha sencilla, utilizarla como callback y elegir cómo recorrer, transformar o filtrar una lista. La explicación de this queda como ampliación opcional.

## Cómo trabajar este apartado

Sigue el orden de los archivos. En cada ejemplo, lee un bloque pequeño, intenta anticipar su resultado y compruébalo en la consola. Después prueba una variación en una copia de trabajo: cambia un valor, una condición o un argumento y observa qué ocurre.

No hace falta memorizar todos los métodos. Lo importante es entender para qué sirve cada concepto y saber localizar un ejemplo cuando lo necesites.

Conviene afianzar primero variables, operadores, condiciones, bucles, arrays y funciones. Los callbacks, los prototipos y la herencia pueden necesitar varias lecturas.

## Qué deberías poder hacer al finalizar

- Guardar y transformar datos sencillos.
- Elegir qué instrucciones ejecutar y repetir tareas.
- Trabajar con listas y textos.
- Organizar una solución mediante funciones.
- Agrupar datos y comportamientos en objetos y clases.
- Reconocer cómo una acción del usuario puede ejecutar código sobre una página.

Con esta base podrás avanzar al apartado **03_JS_DOM** y aprender a manipular los elementos de una página con más detalle.
