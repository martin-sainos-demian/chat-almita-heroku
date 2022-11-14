let mensaje = document.getElementById("mensaje")
let usuario = document.getElementById("usuario")
let salida = document.getElementById("salida")
let notificaciones = document.getElementById("notificaciones")
let boton = document.getElementById("enviar")
let namebtn = document.getElementById("namebtn")
//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io.connect('https://chat-almita.herokuapp.com');

var clientes=[]

var nombre=""

mensaje.hidden=true
boton.hidden=true

namebtn.addEventListener("click", function(){
  nombre=usuario.value
  if(nombre!=""){
    usuario.hidden=true
    namebtn.hidden=true
    mensaje.hidden=false
    boton.hidden=false
  }else{
    alert("NOMBRE REQUERIDO")
  }
})
boton.addEventListener("click", function(){
  var data={
    mensaje: mensaje.value,
    usuario: nombre
  }

  if(mensaje.value === "" || nombre === ""){
    alert("MENSAJE REQUERIDO")
  }else{
    mensaje.value=""
    socket.emit("chat:mensaje", data)
  }
})

mensaje.addEventListener("keydown", function(){
  socket.emit("chat:escribiendo", nombre)
})


socket.on('chat:mensaje', function(data){
  salida.innerHTML+= 
    '<b>' +data.usuario+ '</b> ✉︎ ' + data.mensaje + '<br>'
  avisos.innerHTML=''
});

socket.on('chat:escribiendo', function(data){
  avisos.innerHTML="<p><em>"+data+"</em> 📠</p>"
});

socket.on('socket_desconectado', function(data){
  console.log(data)
  clientes=clentes.filter(function(cliente){
    console.log(cliente)
    return cliente.id!=data.id
  })
});

socket.on('socket_conectado', function(data){
  console.log(data)
  notificaciones.innerHTML+=JSON.stringify(data)
});
