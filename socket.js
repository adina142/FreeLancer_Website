const { Server } = require('socket.io');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', ({ senderId, receiverId, content }) => {
      io.emit(`chat:${receiverId}`, { senderId, content });
    });

    socket.on('jobPosted', ({ job, skills }) => {
      io.emit('newJob', { job, skills });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = initSocket;
