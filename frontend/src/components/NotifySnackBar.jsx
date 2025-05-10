import { useEffect, useState } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import { useWebSocketEvents } from "../context/WebSocketEventContext";
import { useNavigate } from "react-router-dom";

const NotifySnackBar = () => {
    const { groupAcceptedData, pendingRequests, setPendingRequests } = useWebSocketEvents();
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    if (groupAcceptedData) {
        setNotifications((prev) => [
        ...prev,
        {
            key: new Date().getTime(),
            ...groupAcceptedData,
        },
        ]);
    }
    }, [groupAcceptedData]);

    useEffect(() => {
        if (pendingRequests.length > 0) {
            const enriched = pendingRequests.map((req) => ({
            ...req,
            type: req.type || "pendingJoinRequest",
            key: req.key || Date.now() + Math.random(), // avoid duplicates
            }));
            setNotifications((prev) => [...prev, ...enriched]);
            setPendingRequests([]);
        }
    }, [pendingRequests]);

    const handleClose = (key) => {
    setNotifications((prev) => prev.filter((n) => n.key !== key));
    };

    const handleClick = (groupId, ownerId, key) => {
    navigate(`/group/${groupId}/${ownerId || ""}`);
    handleClose(key);
    };

    return (
    <>
        {notifications.map((notification, index) => (
        <Snackbar
            key={notification.key}
            open
            autoHideDuration={6000}
            onClose={() => handleClose(notification.key)}
            slots={{ transition: Slide }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            sx={{ mb: `${index * 70}px` }}
        >
            <Alert
                onClick={() =>
                    navigate(`/group/${notification.groupId}/${notification.ownerId || ""}`)
                }
                severity={notification.type === "pendingJoinRequest" ? "info" : "success"}
                sx={{ width: "100%", cursor: "pointer" }}
                >
                {notification.type === "pendingJoinRequest"
                    ? `${notification.requesterName} requested to join your group #${notification.groupId}`
                    : `You've been accepted into the group “${notification.groupName || notification.name}”! Click to view.`}
            </Alert>
        </Snackbar>
        ))}
    </>
    );
};

export default NotifySnackBar;
