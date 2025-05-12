import { createContext, useContext, useState } from "react";

export const WebSocketEventContext = createContext();

export const WebSocketEventProvider = ({ children }) => {
  const [groupAcceptedData, setGroupAcceptedData] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingRequest, setPendingRequest] = useState(null);

  return (
    <WebSocketEventContext.Provider value={{
        groupAcceptedData,
        setGroupAcceptedData,
        pendingRequests,
        setPendingRequests,
        pendingRequest,
        setPendingRequest
      }}>
      {children}
    </WebSocketEventContext.Provider>
  );
};

export const useWebSocketEvents = () => useContext(WebSocketEventContext);