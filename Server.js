const express = require("express");
const app = express();
const { v4 : uuidv4 } = require("uuid");
const server =require('http').Server(app);
const io= require('socket.io')(server);
const {ExpressPeerServer}=require('peer');
const peerServer=ExpressPeerServer(server, {
    debug:true
});


app.set('view engine','ejs');
app.use(express.static('public'))
app.use('/peerjs',peerServer);
app.get('/',(req,res)=>{
    res.redirect(`/${ uuidv4()}`);
    //console.log(__dirname+'working')
})
app.get('/:room',(req,res)=>{
    res.render('room',{roomid:req.params.room,  fullUrl: 'https://' + req.get('host') + req.originalUrl
});

    //console.log(__dirname+'working and the room id is:: '+req.params.room)
    //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    //console.log(fullUrl);
})

io.on('connection', (socket) => {
    socket.on('join-room', (id,idu) => {
        socket.join(id);
        socket.to(id).broadcast.emit('user-conected',idu);
        //console.log('user joined the room');
      });
      socket.on('disconnect', () => {
        console.log('user leave the room');
      });
    
  });

  



server.listen( process.env.PORT || 3000);