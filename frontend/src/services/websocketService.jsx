import { API_BASE } from "./apiService";

let socket = null;
let reconnectTimeout = null;
const messageHandlers = {};

const isLocalhost = window.location.hostname === "localhost";
const isSecure = window.location.protocol === "https:" && !isLocalhost;
const WS_PROTOCOL = isSecure ? "wss" : "ws";

const WS_BASE = API_BASE
  .replace(/^http:/, "ws:")
  .replace(/^https:/, "wss:")
  .replace(/\/api\/?$/, "");

export const WebSocketService = {
  connect(token, { onOpen, onClose, onError } = {}) {
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const endpoint = `${WS_BASE}/ws/events?token=${token}`;
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
      try {
        const message = JSON.parse(event.data);
        const type = message.type;
    
        const handlers = messageHandlers[type];
        if (handlers && handlers.length > 0) {
          handlers.forEach((handler) => handler(message));
        } else {
          console.warn("Unhandled WebSocket message type:", type, event.data);
        }
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };

    socket.onclose = (event) => {
      console.warn("WebSocket disconnected:", event);
      if (onClose) onClose(event);
      this._retryConnection(token, { onOpen, onClose, onError });
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      if (onError) onError(err);
      this._retryConnection(token, { onOpen, onClose, onError });
    };
  },

  _retryConnection(token, options) {
    if (reconnectTimeout) return;
    reconnectTimeout = setTimeout(() => {
      console.warn("Attempting WebSocket reconnect...");
      this.connect(token, options);
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
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket is not open. Can't send:", message);
      return;
    }

    socket.send(JSON.stringify(message));
  },

  isConnected() {
    return socket && socket.readyState === WebSocket.OPEN;
  },

  /**
   * Subscribe to a specific message type
   * @param {string} type 
   * @param {function} callback 
   * @returns {function} Unsubscribe function
   */
  subscribe(type, callback) {
    if (!messageHandlers[type]) {
      messageHandlers[type] = [];
    }
    messageHandlers[type].push(callback);
    return () => {
      messageHandlers[type] = messageHandlers[type].filter(cb => cb !== callback);
    };
  }
};
