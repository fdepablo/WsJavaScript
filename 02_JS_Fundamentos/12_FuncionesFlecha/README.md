# 12 · Aprender funciones flecha

Una **función flecha** es una función de JavaScript que se escribe utilizando el símbolo `=>` en lugar de la palabra `function`. Puede recibir parámetros, ejecutar instrucciones y devolver un resultado. Su sintaxis permite escribir funciones de forma más breve, especialmente cuando las pasamos como argumentos a otras funciones.

Por ejemplo, esta función recibe un número y devuelve su doble:

```js
const doble = (numero) => {
    return numero * 2;
};

console.log(doble(5)); // 10
```

`doble` es el nombre de la variable que guarda la función, `numero` es su parámetro y `=>` separa los parámetros de las instrucciones que se ejecutarán al llamarla.

Para empezar no necesitas aprender un paradigma nuevo: nos apoyaremos en lo que ya sabes sobre parámetros, instrucciones y resultados. Las flechas tienen algunas diferencias con las funciones tradicionales, así que no siempre son intercambiables; las veremos al final del recorrido.

## Antes de empezar

Debes comprender las variables, los operadores, el control de flujo, los arrays, las funciones normales y los objetos. 

Abre cada HTML con el navegador y pulsa F12 para ver la consola. Lee el código en el editor y compara el resultado con los comentarios. Cada página propone una pequeña tarea: resuélvela en una copia para conservar el ejemplo original.

## 1. Primero una función conocida

~~~js
function sumar(a, b) {
    return a + b;
}
~~~

Ahora guardamos una versión flecha en una constante:

~~~js
const sumarConFlecha = (a, b) => {
    return a + b;
};

console.log(sumarConFlecha(2, 3)); // 5
~~~

La variable sumarConFlecha contiene la función. Los paréntesis reciben los parámetros; => separa los parámetros del cuerpo. Después la llamamos igual que antes.

Es posible abreviarla más, pero esta es la mánera más sencilla de entender las funciones flecha, con llaves y return.

## 2. Después podemos abreviar

Cuando el cuerpo es **una sola expresión**, podemos quitar las llaves y return:

~~~js
const sumar = (a, b) => a + b;
const doble = numero => numero * 2;
const saludar = () => 'Hola';
~~~

Nótese que con un **único parámetro sencillo**, los paréntesis son opcionales. Con cero o varios parámetros, se necesitan.

**Si utilizas llaves, el resultado que quieras devolver necesita return.**

~~~js
const correcto = numero => { return numero * 2; };
const sinResultado = numero => { numero * 2; };

console.log(correcto(3));     // 6
console.log(sinResultado(3)); // undefined porque  no usamos return
~~~

### Devolver un objeto

Una función también puede devolver un **objeto**, es decir, un conjunto de propiedades y valores. Por ejemplo, queremos recibir el nombre y la edad de una persona y devolver un objeto con ambos datos.

Primero lo escribimos con llaves y `return`, como ya conocemos:

~~~js
const crearPersona = (nombre, edad) => {
    return {
        nombre: nombre,
        edad: edad
    };
};

const persona = crearPersona('Ana', 25);
console.log(persona);        // { nombre: 'Ana', edad: 25 }
console.log(persona.nombre); // 'Ana'
console.log(persona.edad);   // 25
~~~

En `nombre: nombre`, la parte de la izquierda es el **nombre de la propiedad** y la de la derecha es el **valor del parámetro**. Lo mismo sucede con `edad: edad`. Separamos las propiedades con una coma. Al llamar con `'Ana'` y `25`, obtenemos `{ nombre: 'Ana', edad: 25 }`. Escribir el objeto directamente entre llaves se llama crear un **objeto literal**.

**Aquí no podemos usar `this` para distinguir las propiedades de los parámetros, como haríamos en un constructor de Java.** En este objeto literal escribimos `propiedad: valor`; En un constructor de clase JavaScript sí podemos escribir `this.nombre = nombre`, pero es un caso diferente.

Si queremos abreviar y quitar `return`, debemos rodear el objeto con paréntesis:

~~~js
const crearPersonaCorta = (nombre, edad) => ({ nombre: nombre, edad: edad });

console.log(crearPersonaCorta('Ana', 25)); // { nombre: 'Ana', edad: 25 }
~~~

Los paréntesis indican que lo que viene después de la flecha es una expresión cuyo resultado queremos devolver. Las llaves de dentro siguen siendo las del objeto.

Sin esos paréntesis, JavaScript interpreta las llaves como **el bloque de instrucciones de la función**, no como un objeto que debe devolver:

~~~js
// Incorrecto: esta línea provocaría un error de sintaxis al descomentarla.
// const crearPersonaIncorrecta = (nombre, edad) => { nombre: nombre, edad: edad };
~~~

En ese último caso, las llaves se interpretan como un bloque de instrucciones y no como el objeto que queríamos devolver. Quédate con estas dos formas correctas: 
- **Con `return`: `=> { return { ... }; }`**
- **Sin `return`: `=> ({ ... })`**.

Puedes seguir usando la primera forma hasta que te resulte cómoda la abreviada.

## 3. Una función también es un valor

Podemos pasarla a otra función como pasamos un número. A esa función entregada como argumento la llamamos **función callback**.

~~~js
const doble = numero => numero * 2;

function aplicar(numero, operacion) {
    return operacion(numero);
}

console.log(aplicar(4, doble)); // 8
~~~

En la llamada pasamos doble, sin paréntesis. Dentro de aplicar, operacion(numero) sí ejecuta la función.

## 4. Elegir una operación con arrays

| Si quieres… | Usa | Qué devuelve el método |
| --- | --- | --- |
| Hacer algo con cada elemento, como mostrarlo por consola | `forEach()` | No devuelve una lista de resultados. Su retorno es `undefined`. |
| Obtener un valor transformado por elemento | map() | Un nuevo array con la misma cantidad de elementos. |
| Conservar solo los elementos que cumplen una condición | filter() | Un nuevo array con los seleccionados. |

Para **mostrar el doble de cada número por consola**, usamos `forEach()` directamente, sin asignarlo a una variable:

~~~js
const numeros = [1, 2, 3, 4, 5];

numeros.forEach(numero => {
    console.log(numero * 2);
});
// Muestra por consola, uno por uno: 2, 4, 6, 8 y 10.
~~~

La función se ejecuta una vez por cada elemento y muestra su doble. La función `forEach()` **NO** devulve una lista de resultados. Aquí loo que nos interesa es la acción que realiza con cada número. El array `numeros` no cambia, sigue siendo `[1, 2, 3, 4, 5]`.

Caso diferente es con `map()`. Si queremos **obtener una nueva lista con los dobles**, usamos `map()`:

~~~js
const dobles = numeros.map(numero => numero * 2);
console.log(dobles); // [2, 4, 6, 8, 10]
~~~

Aquí `map()` sí recoge lo que devuelve el callback en cada llamada y construye un nuevo array. Podemos guardarlo en una variable y utilizarlo después.

Un ejemplo de uso de `filter()` sería para **quedarnos solo con los números mayores que 2**, nótese que también devuelve un array como `map()`:

~~~js
const mayoresQueDos = numeros.filter(numero => numero > 2);
console.log(mayoresQueDos); // [3, 4, 5]
console.log(numeros);       // [1, 2, 3, 4, 5]: la lista original no cambia.
~~~

La flecha comprueba la condición para cada número: para `1` y `2` devuelve `false`, y para `3`, `4` y `5` devuelve `true`. `filter()` crea una nueva lista con los elementos que cumplen la condición, sin transformarlos.

Estos métodos recorren el array por nosotros. La función flecha recibe cada elemento e indica qué hacer con él: mostrarlo con `forEach()`, transformarlo con `map()` o comprobar si debe conservarse con `filter()`.

No estás obligado a usar flechas: estos métodos también aceptan funciones tradicionales. También podemos obtener el mismo resultado con un `for` clásico o un `for...of`, sin utilizar `filter()`. Comparamos las cuatro formas:

~~~js
// Con una función tradicional.
const filtradosTradicional = numeros.filter(function (numero) {
    return numero > 2;
});

// Con una función flecha.
const filtradosFlecha = numeros.filter(numero => numero > 2);

// Con un for clásico.
const filtradosConFor = [];
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] > 2) {
        filtradosConFor.push(numeros[i]);
    }
}

// Con un for...of: recibimos directamente cada elemento.
const filtradosConForOf = [];
for (const numero of numeros) {
    if (numero > 2) {
        filtradosConForOf.push(numero);
    }
}

console.log(filtradosTradicional); // [3, 4, 5]
console.log(filtradosFlecha);      // [3, 4, 5]
console.log(filtradosConFor);      // [3, 4, 5]
console.log(filtradosConForOf);    // [3, 4, 5]
~~~

En las dos primeras versiones, `filter()` pasa cada número a la función y conserva aquellos para los que devuelve `true`. La función tradicional utiliza `function` y `return`; la flecha abreviada devuelve directamente el resultado de `numero > 2`.

En la versión con `for` clásico, hacemos el recorrido mediante un índice: `i` es la posición, `numeros[i]` es el elemento actual y `push()` lo añade a la nueva lista si cumple la condición.

Con `for...of`, la variable `numero` recibe directamente cada valor del array, sin tener que escribir un índice. Comprobamos la misma condición y añadimos los valores seleccionados con `push()`.

Las cuatro versiones obtienen `[3, 4, 5]` y conservan la lista original.

## Ampliación sobre this

Las flechas conservan el this del contexto donde se crean. Los métodos tradicionales pueden recibirlo según cómo se invocan. Por eso, para un método que necesita acceder al objeto mediante this, empieza utilizando un método tradicional.

Las flechas no tienen arguments propio ni se pueden utilizar como constructoras con new. Además, una flecha asignada a const debe utilizarse después de inicializar esa variable. El ejemplo 08 permite observar estas diferencias después de estudiar objetos.

## Orden de aprendizaje

En los ejemplos vamos a trabajar mejor todos estos conceptos que hemos aprendido.

| Ejemplo | Idea principal |
| --- | --- |
| [01 De function a flecha](01_DeFunctionAFlecha.html) | Comparar tres formas de escribir la misma suma. |
| [02 Parámetros y return](02_ParametrosYReturn.html) | Escribir flechas con cero, uno o varios parámetros y devolver resultados. |
| [03 Devolver objetos](03_DevolverObjetos.html) | Crear y visualizar un objeto con nombre y edad, con return o con paréntesis. |
| [04 Funciones como argumentos](04_FuncionesComoArgumentos.html) | Entender qué es un callback y cuándo se ejecuta. |
| [05 Recorrer con forEach](05_RecorrerConForEach.html) | Realizar una acción por cada elemento de una lista. |
| [06 Transformar con map](06_TransformarConMap.html) | Crear un array con un resultado por cada elemento. |
| [07 Seleccionar con filter](07_SeleccionarConFilter.html) | Crear un array con los elementos que cumplen una condición. |
| [08 Flechas y this](08_FlechasYThis.html) | Ampliación opcional sobre las diferencias con otras funciones. |

## Errores que conviene reconocer

- Escribir una flecha con llaves y olvidar return cuando necesitas un resultado.
- Utilizar forEach() esperando recibir una nueva lista.
- Usar map() para seleccionar elementos: para eso está filter().
- Creer que una flecha puede reemplazar cualquier función sin cambiar su comportamiento.

## Práctica final

Crea una lista de precios: [5, 12, 8, 20]. Obtén en una variable los mayores que 10 con filter(). En otra, calcula el doble de esos precios con map(). Finalmente, muestra cada resultado con forEach(). Deben aparecer 24 y 40.

Haz cada paso por separado y explica qué recibe y qué devuelve cada callback. No necesitas usar reduce() ni resolverlo en una sola línea.
