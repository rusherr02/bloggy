import { io, Socket } from 'socket.io-client';
import type { Comment } from 'shared';

class SocketService {
  private socket: Socket | null = null;
  private currentBlogId: number | null = null;

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.currentBlogId = null;
    }
  }

  joinBlog(blogId: number) {
    if (!this.socket) {
      this.connect();
    }

    if (this.currentBlogId !== blogId) {
      if (this.currentBlogId !== null) {
        this.socket?.emit('leave-blog', this.currentBlogId);
      }
      this.socket?.emit('join-blog', blogId);
      this.currentBlogId = blogId;
    }
  }

  leaveBlog(blogId: number) {
    if (this.socket && this.currentBlogId === blogId) {
      this.socket.emit('leave-blog', blogId);
      this.currentBlogId = null;
    }
  }

  onNewComment(callback: (comment: Comment) => void) {
    if (!this.socket) {
      this.connect();
    }
    this.socket?.on('new-comment', callback);
  }

  offNewComment(callback: (comment: Comment) => void) {
    this.socket?.off('new-comment', callback);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();
