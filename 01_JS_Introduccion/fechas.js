function retornarFecha(){
  var fecha = new Date();
  var cadena=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
  return cadena;
}

function retornarHora(){
  var fecha = new Date();
  var cadena = fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
  return cadena; 
}