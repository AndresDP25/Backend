const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./api/Contenedor');
const HistoryChat = require('./api/historychat');
const myRoutes =require('./api/routes');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const Contenedor1 = new Contenedor();
const history = new HistoryChat();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//01_Seteamos nuestra ruta
app.use(myRoutes);


app.set('view engine', 'ejs');
app.set('views','./public/views');

const messages = [
    
 ];

io.on('connection', async (socket) => {
    console.log("Un usuario se ha conectado");
    
    //socket Productos
    socket.emit("Productos", Contenedor1.getAll());

    socket.on('guardarNuevoProducto', (nuevoProducto) => {
        Contenedor1.save(nuevoProducto);
        io.sockets.emit("Productos", Contenedor1.getAll())
    });
     
    socket.emit('messages', messages);

   //socket mensajes
   const message = await history.loadMessage()
   socket.emit('messages', message )
  
   socket.on('messagesNew',async data => {
       await history.saveMessage(data)
       const message2 = await history.loadMessage()
       io.sockets.emit('messages', message2 );
   });

});

const PORT = 8080 
httpServer.listen(PORT, () => console.log('Servidor corriendo en http://localhost:8080'))