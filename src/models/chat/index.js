const {Schema, model} = require('mongoose');

const chatSchema = new Schema({
    currentUser: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

module.exports = model('Chat', chatSchema);