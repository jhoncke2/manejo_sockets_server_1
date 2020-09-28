const {io} = require('../index.js');
const Civilizations = require('../models/civilizations.js');
const Civilization = require('../models/civilization.js');
const civilizations = new Civilizations();
console.log('init socket');
civilizations.addCivilization(
    new Civilization(
        'mongoles'
    )
);
civilizations.addCivilization(
    new Civilization(
        'sarracenos'
    )
);
civilizations.addCivilization(
    new Civilization(
        'teutones'
    )
);
civilizations.addCivilization(
    new Civilization(
        'vikingos'
    )
);
console.log('civilizations: ', civilizations);

//client: un dispositivo que se acaba de conectar a mi socket server
io.on('connection', client=>{
    console.log('cliente conectado');
    client.emit('civilizaciones_activas', civilizations.civilizations);
    client.on('disconnect', ()=>{
        console.log('cliente desconectado');
    });
    client.on('mensaje', (data)=>{
        console.log('ha llegado un mensaje:', data);
        io.emit('mensaje_ingresado', {admin: "ha llegado un nuevo mensaje al servidor"});
        client.emit('mensaje', {admin: "esta es la respuesta al mensaje que enviaste al servidor"});
        //client.broadcast.etmit: emitir evento a todos menos a client.
        client.broadcast.emit('mensaje', {admin:'esta es la respuesta al último mensaje envíado al servidor'});
    });
    client.on('mensaje_desde_flutter', (data)=>{
        console.log('ha llegado un mensaje desde flutter:\n', data);
    });
    client.on('mensaje_desde_flutter_status',  (data)=>{
        console.log('se ha recibido un mensaje desde flutter status: ', data);
        io.broadcast.emit('mensaje_desde_flutter_status', data);
    });
    client.on('add_civilization', (data)=>{
        console.log('add civilization:', data);
        civilizations.addCivilization(new Civilization(
            data['name']
        ));
        console.log(civilizations.civilizations);
        io.emit('civilizaciones_activas', civilizations.civilizations);

    });
    client.on('vote_civilization', (data)=>{
        console.log('id de votado: ', data);
        civilizations.voteCivilization(data['id']);
        io.emit('civilizaciones_activas', civilizations.civilization );
    })
    client.on('remove_civilization', (data)=>{
        console.log('id del eliminado: ', data);
        civilizations.removeCivilization(data['id']);
        console.log(civilizations.civilizations);
        io.emit('civilizaciones_activas', civilizations.civilizations);
    });
});