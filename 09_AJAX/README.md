
 Instrucciones
---------------
Los ficheros de este ejemplo hay que desplegarlos en algun servidor como puede ser TOMCAT o APACHE
habitualmente. Tambien se puede utilizar algun extension de Visual Studio Code como "live server"
para ejecutarlo. Estos ejemplos estan configurados con VSC + Live Server

 Visual Studio Code + Live Server
----------------------------------
Bajarse la extensión "Live Server". Esto emula un servidor en el puerto 5500
Ponerse sobre el fichero html que se quiere ejecutar, pulsar boton derecho y elegir la opcion
"Open With Live Server"
Para apagar el servidor hay una opcion abajo a la derecha del VSC "Cerrar Port:5500"

 APACHE
--------
Ir a la carpeta "HTDOCS" donde tengamos instalado nuestro APACHE y crear la carpeta "JS"
Dentro de esta carpeta pegar todo el contenido que hay en este ejemplo de AJAX
    01_JS_AJAX.html
    02_JS_AJAX_XML.html
    fichero.txt
    musica.xml
    etc...
Arrancar el servidor apache
Abrir el navegado e ir al a ruta determinada (ojo, revisar las URLs de los ejemplos) EJ:
    1) http://localhost/JS/01_JS_AJAX.html
    2) http://localhost/JS/02_JS_AJAX_XML.html

 ECLIPSE + TOMCAT
------------------
Configurar eclipse con el servidor TOMCAT
Crear un nuevo proyecto dinamico (dinamic web proyect) y lo llamamos "JS"
Una vez creado, vamos a la carpeta "webcontent" y pegamos todo el contenido que hay en este ejemplo de AJAX 
    01_JS_AJAX.html
    02_JS_AJAX_XML.html
    fichero.txt
    musica.xml
    etc...
Arrancamos el servidor con el proyecto desplegado
Abrir el navegado e ir al a ruta determinada (ojo, revisar las URLs de los ejemplos) EJ:
    1) http://localhost:8080/JS/01_JS_AJAX.html
    2) http://localhost:8080/JS/02_JS_AJAX_XML.html

