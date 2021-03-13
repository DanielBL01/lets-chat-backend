const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 8000;

const { Message } = require('./db/model/message');
const { Rooms } = require('./utils/rooms');
var rooms = new Rooms();

io.on('connection', socket => {
    console.log('A User has connected');

    socket.on('join', room => {
        socket.join(room);
        rooms.joinRoom(room, socket.id);
        var room = rooms.findRoom();
        console.log(room);
    });

    socket.on('disconnect', () => {
        var id = socket.id;
        console.log(`User: ${id} has disconnected!`)
    })
});

// Test API call to Frontend 
app.get('/title', (req, res) => {
    res.send('Lets Chat 😎');
});

// Test MongoDB Connection to store message data
app.get('/message', async (req, res) => {
    try {
        var message = new Message({message: 'Testing MongoDB', date: Date.now()});
        await message.save();
        res.send('message saved to MongoDB at lets-chat');
    } catch (err) {
        console.log(err);
        res.send('message failed to save to MongoDB at lets-chat');
    }
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});