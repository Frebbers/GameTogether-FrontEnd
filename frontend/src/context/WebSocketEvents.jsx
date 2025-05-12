import { useEffect, useContext } from "react";
import { WebSocketService } from "../services/websocketService";
import { useWebSocketEvents } from "./WebSocketEventContext";
import { AuthContext } from "./AuthContext";

const WebSocketEvents = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { setGroupAcceptedData, setPendingRequests } = useWebSocketEvents();


  useEffect(() => {
    if (!isLoggedIn) return;
  
    const token = localStorage.getItem("token");
    if (!token) return;
  
    WebSocketService.connect(token);
  
    const unsubGroupAccepted = WebSocketService.subscribe("group.accepted", (event) => {
      console.log("groupAccepted received:", event);
      setGroupAcceptedData({
        ...event,
        type: "groupAccepted",
      });
    });
  
    const unsubPendingRequest = WebSocketService.subscribe("pending.join.request", (event) => {
      console.log("pendingJoinRequest received:", event);
      setPendingRequests((prev) => [
        ...prev,
        {
          ...event,
          type: "pendingJoinRequest",
          key: Date.now() + Math.random(),
        },
      ]);
    });
  
    return () => {
      unsubGroupAccepted();
      unsubPendingRequest();
    };
  }, [isLoggedIn]);

  return null;
};

export default WebSocketEvents;
