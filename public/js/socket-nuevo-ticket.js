// Comando para establecer la conexion con el servisor
var socket = io();
// si se va a utilizar la referencia de un elemnto muchas veces
var label = $('#lblNuevoTicket');

socket.on('estadoActual', function(data){
    label.text(data.actual);
});

// socket.on es para escuchar al servidor 
socket.on('connect', function(){ 
    console.log('Conectado al servidor');
});
 
// socket.on es para escuchar al servidor 
socket.on('disconnect', function(){
    console.log('Perdimos conexion con el servidor');
});  

$('button').on('click', function(){
    // Emitir el evento siguiente ticket al servidor
    socket.emit('siguienteTicket', null, function( siguienteTicket ){
        label.text(siguienteTicket);
    });
});