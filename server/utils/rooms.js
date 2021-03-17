class Rooms {
    constructor() {
        this.room = {users: []};
    }

    joinRoom(socket_id) {
        this.room.users.push(socket_id);
    }

    leaveRoom(socket_id) {
        this.room.users.filter(user => user != socket_id);
    }

    findNewRoom() {
        return this.room;
    }
}

module.exports = { Rooms };

/* 

How does Rooms work in Socket.IO?

Rooms in Socket.IO don't need to be created. One is 'created' when a socket joins it. 

This class will keep a list of rooms. Each room will have their own unique IDs and number
of users in the room to check if its empty, user is waiting for a match or full (users: 2)

*/