const app = require('express')();
const httpServer = require('http').createServer(app);

// The cors config is needed so that HTTP requests sent by the frontend are allowed to reach the server.
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

const port = process.env.PORT || 8000;
const { Message } = require('./db/model/message');
const { Rooms } = require('./utils/rooms');

var rooms = new Rooms();

io.on('connection', socket => {
    console.log('A User has connected');

    socket.on('join', room_id => {
        rooms.joinRoom(room_id, socket.id);
        socket.join(room_id);

        var room = rooms.findRoom(socket.id);
        if (room) {
            if (room.users.length === 1) {
                io.to(room.id).emit('status', 'matching');
            } else if (room.users.length === 2) {
                io.to(room.id).emit('status', 'chatting');
            }
        }
    });

    socket.on('messages', msg => {
        var room = rooms.findRoom(socket.id);
        io.to(room.id).emit('messages', msg);
    });

    socket.on('disconnect', () => {
        console.log(`User: ${socket.id} has disconnected!`)
    });
});

// STEP 1 - Find or Create a new Room in the Rooms class and send it to Client
app.get('/findOrCreateRoom', (req, res) => {
    res.send(`${rooms.findOrCreateRoom()}`);
});

// Test API call to Frontend 
app.get('/header', (req, res) => {
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