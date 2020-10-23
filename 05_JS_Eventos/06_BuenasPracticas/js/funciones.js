/*
  El fichero js debería de cumplir la siguientes reglas

  1) El evento window.onload debe de encargarse de manejar los eventos, esto es, 
  de asignar a los elementos html los eventos y las funciones asociadas.
  Esto se hace así ya que hasta que no se ha cargado la página entera, no existen
  los elementos HTML, y por ende, no se le pueden asociar eventos.

  2) Las funciones deberían de ir fuera del evento window.onload para que puedan 
  ser usadas en cualquier momento, y no cuando se haya terminado de cargar la 
  página.

*/

//FUNCIONES
function muestraMensaje() {
  var elDiv = document.getElementById("div_principal");
  console.log("Has pulsado el raton");
}

function limitaOnLoad(textArea,maximoCaracteres) {
  if(textArea.value.length >= maximoCaracteres ) {
      maxNumeroAlcanzadoOnLoad.style.display = "block"
      return false;
  }else {
      maxNumeroAlcanzadoOnLoad.style.display = "none"
      return true;
  }
} 

function sumar(a, b) {
  var resultado = a + b;
  return resultado;
}

//FIN FUNCIONES

//WINDOW.ONLOAD (ADD EVENTOS)
window.onload = function () {
  //add evento textArea
  textArea.onkeypress = function (e) {
    if (!limitaOnLoad(textArea, 10)) {
      e.preventDefault()
    }
  }

  var elDiv = document.getElementById("div_principal");

  //add evento div
  elDiv.addEventListener("click", muestraMensaje);

  //add evento botonSumar
  botonSumar.onclick = function (e){
    let valor1 = parseInt(numero1.value)
    let valor2 = parseInt(numero2.value)
    let resultadoSuma = sumar(valor1, valor2)

    resultado.value = resultadoSuma 
    console.log(resultadoSuma)
  }
}//FIN WINDOW.ONLOAD