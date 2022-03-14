![JavaScript](img/js.png "Aprende JavaScript!!")

# WsJavaScript

Workspace con teoría y ejemplos sobre JavaScript

Se utiliza Visual Studio Code (VSC) como IDE aunque se puede utilizar cualquier otro

Ruta del repositorio:
[https://github.com/fdepablo/WsJavaScript](https://github.com/fdepablo/WsJavaScript)

## Pasos para trabajar con este repositorio

1. Para arrancar este proyecto en VSC, primero clonarse o bajarse este repositorio de GitHub

2. Instalar VSC

3. Abrir Visual Studio Code -> File -> Open Workspace -> Elegir el fichero WorkspaceJS.code-workspace

4. Algunas extensiones recomendadas (ultimo icono de la barra de la derecha)
    - Open in browse, para abrir directamente una pagina web en un navegador
    - Beautify, para que nos ayude para hacer HTML, CSS y JS
    - Live Server, para la parte de AJAX y para desplegar JS en un servidor (Optativa)
    - Markdown Preview Enhanced, para visualizar ficheros MarkDown (Optativa). Boton derecho y "open preview" para visualizar los fichero MD

## Crear proyecto JS con Visual Studio Code

- Simplemente crear una carpeta y luego crear los ficheros que queramos con su extensión
- Se puede salvar luego como workspace (optativo)
- Para abrir paginas directamente podemos usar la extension "open in browser" de visual studio code y luego pulsar ALT+B. Tambien podemos abrirlas con Live Server.

## Configuraciones especiales en VSC

Si queremos hacer que los simbolos especiales esten coloreados, como por ejemplo los simbolos **()[]{}** y conseguir que el código sea más legible, debemos añadir las siguientes líneas de código en el fichero de configuración **settings.json** (al final de fichero, antes del cierre **}**): 

    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs":"active"

Para abrir el fichero **settings.json**:

1. pulsar **ctrl + mayusculas + p**
2. Escribir **settings.json**, a continuación debemos elegir de "Abrir la configuración (JSON)"

Debería quedar algo parecido a la siguiente imagen

![settingsjson](img/settingsjson.png "settingsjson")

## Crear un proyecto JS con Eclipse

1. File -> new -> Static web proyect
2. Parar abrir las paginas html, boton derecho sobre el fichero html -> open with -> Web Browser
3. Para elegir otro buscador web con el que abrir, Window -> Web Browser -> Elegir el que se quiera
4. Para abrir los fichero .js podemos abrirlos con boton derecho -> open with -> other -> js editor. De esta manera se facilita la lectura

## Bibliografía

 - <https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Introducci%C3%B3n>