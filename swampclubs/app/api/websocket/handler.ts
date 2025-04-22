import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { verify } from 'jsonwebtoken';

export function initializeWebSocket(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinChannel', (channelId: string) => {
      socket.join(channelId);
    });

    socket.on('leaveChannel', (channelId: string) => {
      socket.leave(channelId);
    });

    socket.on('sendMessage', async (message) => {
      io.to(message.channelId).emit('newMessage', message);
    });
  });

  return io;
}