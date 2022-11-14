let mensaje = document.getElementById("mensaje")
let usuario = document.getElementById("usuario")
let salida = document.getElementById("salida")
let notificaciones = document.getElementById("notificaciones")
let boton = document.getElementById("enviar")
//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io.connect('https://chat-almita.herokuapp.com');

var clientes=[]

boton.addEventListener("click", function(){
  var data={
    mensaje: mensaje.value,
    usuario: usuario.value
  }

  if(mensaje.value === "" || usuario.value === ""){
    alert("USUARIO Y MENSAJE REQUERIDOS")
  }else{
    mensaje.value=""
    socket.emit("chat:mensaje", data)
  }
})

mensaje.addEventListener("keydown", function(){
  socket.emit("chat:escribiendo", usuario.value)
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
