function retornarFecha(){
  var fecha = new Date();//fecha actual del sistema, tiempo va en milisegundos desde el año 1970
  var cadena = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();// 23/03/2022
  return cadena;
}

function retornarHora(){
  var fecha = new Date();
  var cadena = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
  return cadena; 
}

function retornarMilisegundos(){
  var fecha = new Date();
  var tiempoEnMilisegundos = fecha.getTime();
  return tiempoEnMilisegundos;//devolvemos el numero de milisegundos desde 1970
}