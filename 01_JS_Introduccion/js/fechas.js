function retornarFecha(){
  var fecha = new Date();//fecha actual del sistema, tiempo va en milisegundos desde el año 1970
  var cadena=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
  return cadena;
}

function retornarHora(){
  var fecha = new Date();
  var cadena = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
  return cadena; 
}