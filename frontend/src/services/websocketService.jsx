import { API_BASE } from "./apiService";

let socket = null;

const WS_BASE = API_BASE.replace("http", "ws").replace("/api", "");

export const WebSocketService = {
  connect(token, { onMessage, onOpen, onClose, onError, chatId }) {
    if (socket && socket.readyState === WebSocket.OPEN) return;

    const endpoint = `${WS_BASE}/ws/chat?token=${token}&chatId=${chatId}`;
    socket = new WebSocket(endpoint);

    socket.onopen = () => {
      console.log("WebSocket connected");
      if (onOpen) onOpen();
    };

    socket.onmessage = (event) => {
      if (onMessage) onMessage(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      if (onClose) onClose();
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      if (onError) onError(err);
    };
  },

  disconnect() {
    if (socket) {
      socket.close();
      socket = null;
    }
  },

  send(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  },

  isConnected() {
    return socket && socket.readyState === WebSocket.OPEN;
  }
};
