// Comando para establecer la conexion con el servisor
var socket = io();

var searchParam = new URLSearchParams( window.location.search );

if(!searchParam.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParam.get('escritorio');
var label = $('small');
$('h1').text('Escritorio ' + escritorio );

$('button').on('click', function(){

    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function( resp ){

        if( resp === 'No hay Tickets'){
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket: ' + resp.numero);
    });

});

// // socket.on es para escuchar al servidor 
// socket.on('connect', function(){ 
//     console.log('Conectado al servidor');
// });
 
// // socket.on es para escuchar al servidor 
// socket.on('disconnect', function(){
//     console.log('Perdimos conexion con el servidor');
// });  

