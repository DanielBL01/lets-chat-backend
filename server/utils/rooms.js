class Rooms {
    constructor() {
        this.rooms = [];
    }
    
    /**
     * Create and store a new Rooms object. Generate an id by representing the current date as a single number using the unary + operator
     * @returns {number} id of room
     */
    createRoom() {
        var room = {id: + Date.now(), users: []};
        this.rooms.push(room);
        console.log('createRoom: ' + room.id);
        return room.id;
    }

    /**
     * Every new room is pushed to the highest index of the rooms array. Find if the newest room is empty or has less than two users, else create a new room
     * @returns {(number|number} id of existing room or id of new room
     */
    findOrCreateRoom() {
        if (this.rooms[this.rooms.length - 1] && this.rooms[this.rooms.length - 1].users.length < 2) {
            console.log('findOrCreateRoom: ' + this.rooms[this.rooms.length - 1].id);
            return this.rooms[this.rooms.length - 1].id;
        } 
        
        return this.createRoom();
    }

    /**
     * Add User's Socket ID to existing Rooms object
     * @param {number} room_id - Identify room by ID
     * @param {string} socket_id - Identify user by their Socket ID
     */
    joinRoom(room_id, socket_id) {
        var room = this.rooms.find((room) => room.id == room_id);
        if (room) {
            room.users.push(socket_id);
        }
    }

    /**
     * Find the Rooms object which has the user in its users attribute
     * @param {string} socket_id - Identify user by their Socket ID
     * @returns {Rooms} - Rooms object
     */
    findRoom(socket_id) {
        var room = this.rooms.find(room => room.users.includes(socket_id));
        if (room) {
            return room;
        }
    }

    /**
     * Remove User's Socket ID to existing Rooms object users array. If the room afterwards contains 0 users, destory the Room object
     * @param {string} socket_id - Identify user by their Socket ID
     */
    leaveRoom(socket_id) {
        var room = this.findRoom(socket_id);

        if (room) {
            var room_id = room.id;
            
            room.users = room.users.filter(user => {
                return user !== socket_id;
            });
    
            if (room.users.length === 0) {
                this.rooms = this.rooms.filter(room => {
                    return room !== room;
                });
            }

            return room_id;
        }
    }
}

module.exports = { Rooms };

/* 

How does Rooms work in Socket.IO?

Rooms in Socket.IO don't need to be created. One is 'created' when a socket joins it. 

This class will keep a list of rooms. Each room will have their own unique IDs and number
of users in the room to check if its empty, user is waiting for a match or full (users: 2)

*/