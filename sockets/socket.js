const {io} = require('../index.js');
//client: un dispositivo que se acaba de conectar a mi socket server
io.on('connection', client=>{
    console.log('cliente conectado');
    client.on('disconnect', ()=>{
        console.log('cliente desconectado');
    });
    client.on('mensaje', (data)=>{
        console.log('ha llegado un mensaje:', data);
        io.emit('mensaje_ingresado', {admin: "ha llegado un nuevo mensaje al servidor"});
        client.emit('mensaje', {admin: "esta es la resupesta al mensaje que enviaste al servidor"});
    });
});