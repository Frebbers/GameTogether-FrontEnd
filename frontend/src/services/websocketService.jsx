import { API_BASE } from "./apiService";

let socket = null;
let reconnectTimeout = null;
const isLocalhost = window.location.hostname === "localhost";
const isSecure = window.location.protocol === "https:" && !isLocalhost;
const WS_PROTOCOL = isSecure ? "wss" : "ws";

// This keeps the host + port from API_BASE
const WS_BASE = API_BASE
  .replace(/^http:/, "ws:")
  .replace(/^https:/, "wss:")
  .replace(/\/api\/?$/, "");

  export const WebSocketService = {
    connect(token, { onMessage, onOpen, onClose, onError, chatId }) {
      if (socket) {
        if (socket.readyState === WebSocket.OPEN) return;
        if (socket.readyState === WebSocket.CONNECTING) {
          socket.close(); // safely close in-progress one
        }
      }
    
      const endpoint = `${WS_BASE}/ws/chat?token=${token}&chatId=${chatId}`;
      socket = new WebSocket(endpoint);
    
      socket.onopen = () => {
        console.log("WebSocket connected:", endpoint);
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }
        if (onOpen) onOpen();
      };
    
      socket.onmessage = (event) => {
        console.log("WebSocket received:", event.data);
        if (onMessage) onMessage(event.data);
      };
    
      socket.onclose = (event) => {
        console.warn("WebSocket disconnected:", event);
        if (onClose) onClose(event);
        this._retryConnection(token, { onMessage, onOpen, onClose, onError, chatId });
      };
    
      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        if (onError) onError(err);
        this._retryConnection(token, { onMessage, onOpen, onClose, onError, chatId });
      };
    },
  
    _retryConnection(token, options) {
      if (reconnectTimeout) return;
      reconnectTimeout = setTimeout(() => {
        console.warn("Attempting WebSocket reconnect...");
        WebSocketService.connect(token, options);
      }, 3000);
    },
  
    disconnect() {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
      if (socket) {
        socket.close();
        socket = null;
      }
    },
  
    send(message) {
      if (!socket) {
        console.warn("WebSocket is not initialized. Cant send message:", message);
        return;
      }
    
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.warn("WebSocket is not open. ReadyState:", socket.readyState, "Message:", message);
      }
    },
  
    isConnected() {
      return socket && socket.readyState === WebSocket.OPEN;
    }
  };