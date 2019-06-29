const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el evento siguiente ticket desde el cliente
    client.on('siguienteTicket', (data, callback) =>{
        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);
    });

    // emitit un evento lamado estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4Ticket()
    });

    client.on('atenderTicket', (data, callback)=>{

        if( !data.escritorio){
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar o notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimos4Ticket()
        });

    });
    
});