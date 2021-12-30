const Chat = require('../../models/chat');

const onChatsConnection = async (io, socket) => {
    const {id} = socket;
    const {roomName} = socket.handshake.query;
    console.log('socket connected:', id, 'roomName', roomName);

    let messages = [];

    if (roomName) {
        socket.join(roomName);
        messages = await Chat.find({bookId: roomName}).select('-_id currentUser receiver text');
    }

    if (messages && messages.length > 0) {
        socket.emit('chatHistory', messages);
    }

    socket.on('disconnect', () => {
        console.log('socket disconnected:', id);
    });

    socket.on('sendMessage', (message) => {
        socket.to(roomName).emit('newMessage', message);
        socket.emit('newMessage', message);

        const newChat = new Chat({
            currentUser: roomName,
            receiver: message.receiver,
            text: message.text,
        });

        try {
            newChat.save();
        } catch (e) {
            console.log(e);
        }
    });
};

module.exports = onChatsConnection;