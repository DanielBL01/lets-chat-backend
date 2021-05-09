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