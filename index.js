const express = require('express');
const { createServer } = require('http');
const app = express();
const path = require('path');
//lee el archivo .env y establece las variables de entorno
require('dotenv').config();

//  node server
//utiliza la configuración que viene en express para implementar en el server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket.js');

//path público ( o carpeta pública )
//__dirname apunta a donde sea que esté mi servidor ( en desarrollo o en producción )
const publicPath = path.resolve(__dirname, 'public');
//estamos usando el directorio público para retornar en la petición get /
//aún no entiendo bien cómo
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err)=>{
    if( err ) throw new Error(err);
    console.log("servidor corriendo en puerto 3000");
});