const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 8000;

const { Message } = require('./db/model/message');

io.on('connection', socket => {
    console.log('A User has connected');

    socket.on('disconnect', () => {
        console.log('user has disconnected')
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        io.emit('chat message', msg);
    });
});

app.get('/title', (req, res) => {
    res.send('Lets Chat 😎');
});

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