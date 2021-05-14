const app = require('express')();
const http = require('http');
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'https://lets-chat-project.herokuapp.com',
    }
});

const cors = require('cors');
const schedule = require('node-schedule');
const port = process.env.PORT || 8000;

const { Message } = require('./db/model/message');
const { Rooms } = require('./utils/rooms');
const { translateMsg } = require('./utils/translator');
const { listLang } = require('./utils/translator');

app.use(cors());

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

    socket.on('messages', async msg => {
        var translatedMsg = await translateMsg(msg.message, msg.language);
        
        try {
            const message = new Message({message: translatedMsg, date: Date.now()});
            await message.save();
        } catch (err) {
            console.log(err);
        }

        var room = rooms.findRoom(socket.id);

        io.to(room.id).emit('messages', translatedMsg);
    });

    socket.on('partner', partner => {
        var room = rooms.findRoom(socket.id);
        io.to(room.id).emit('newPartner', {
            id: socket.id,
            name: partner.name,
            language: partner.language
        });
    });

    socket.on('leave', () => {
        var room_id = rooms.leaveRoom(socket.id);
        socket.to(room_id).emit('messages', 'Your Partner has left the Chat 😢');
        socket.leave(room_id);
    });

    socket.on('disconnect', () => {
        console.log(`User: ${socket.id} has disconnected!`)
    });
});

app.get('/findOrCreateRoom', (req, res) => {
    res.send(`${rooms.findOrCreateRoom()}`);
});

app.get('/header', (req, res) => {
    res.send('Lets Chat');
});

app.get('/listAllLanguages', async (req, res) => {
    const langData = await listLang();
    res.json(langData);
});

const job = schedule.scheduleJob('*/30 * * * *', () => {
    http.get('https://lets-chat-project.herokuapp.com/');
    http.get('https://lets-chat-server1.herokuapp.com/');
});

httpServer.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});