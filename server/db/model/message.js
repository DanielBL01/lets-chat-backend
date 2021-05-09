const mongoose = require('mongoose');
const { Schema } = mongoose;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

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