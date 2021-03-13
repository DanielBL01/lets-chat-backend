const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoDB = 'mongodb://127.0.0.1:27017/lets-chat';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var messageSchema = new Schema({
    message: {
        type: String,
        required: true,
        minLength: 1
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = { Message };

/*

Models are constructors for Schema definitions. An instance of a model is called a Document
Mongoose documents represent a one-to-one mapping to documents as stored in MongoDB
Documents in MongoDB are stored in a Collection which are stored in Databases 

Using MongoDB shell
---

If the lets-chat database isn't created, it will be created so you do not have to create the database manually
Mongoose Model is a MongoDB Collection where your Collection is the lowercase and plural form of your Model Name i.e. 'Message' -> 'messages'
An instace of your Mongoose model will become a document in the given Collection

*/