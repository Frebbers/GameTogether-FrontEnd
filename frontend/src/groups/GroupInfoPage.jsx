import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {  fetchGroupById,  fetchProfile,  joinGroup,  AcceptUserIntoGroup,  RejectUserFromGroup,  leaveGroup,} from "../services/apiService";
import Dialog from "../components/Modal";
import background from "../images/background.jpg";
import ChatBox from "../components/ChatBox";
import {  Box,  Paper,  Typography,  Chip,  Button,  Divider,  Stack,  Container, Tab, Tabs} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CircularProgress from '@mui/material/CircularProgress';
import { useWebSocketEvents } from "../context/WebSocketEventContext";

const GroupInfoPage = ({ groups, setGroups }) => {
  const { groupId, ownerId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPendingDialogOpen, setIsPendingDialogOpen] = useState(false);
  const [isPendingMember, setIsPendingMember] = useState(false);
  const [isAcceptedMember, setIsAcceptedMember] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { groupAcceptedData } = useWebSocketEvents();
  const { pendingRequests, setPendingRequests } = useWebSocketEvents();

  const claims = jwtDecode(localStorage.getItem("token"));
  const isGroupOwner = claims.nameid === ownerId;

  useEffect(() => {
    if (
      groupAcceptedData?.groupId === Number(groupId) &&
      groupAcceptedData?.userId === Number(claims.nameid)
    ) {
      fetchGroupById(groupId)
        .then((updated) => {
          setGroup(updated);
          setIsAcceptedMember(true);
          setIsPendingMember(false);
        })
        .catch(console.error);
    }
  }, [groupAcceptedData]);

  const latestPendingRequest = pendingRequests
    .filter(req => req.groupId === Number(groupId))
    .slice(-1)[0];

  useEffect(() => {
    if (
      latestPendingRequest &&
      String(claims.nameid) === String(ownerId)
    ) {
      fetchGroupById(groupId)
        .then(setGroup)
        .catch(console.error);
    }
  }, [pendingRequests]);

  useEffect(() => {
    if (isPendingDialogOpen) {
      setPendingRequests(prev => prev.filter(r => r.groupId !== Number(groupId)));
    }
  }, [isPendingDialogOpen]);
  
  useEffect(() => {
    fetchGroupById(groupId).then(setGroup).catch(console.error);
  }, [groupId]);

  useEffect(() => {
    if (ownerId) {
      fetchProfile(ownerId).then(setOwner).catch(console.error);
    }
  }, [ownerId]);

  useEffect(() => {
    if (group && claims?.nameid) {
      const pending = group.members?.some(
        (m) => String(m.userId) === claims.nameid && m.groupStatus === 0
      );
      const accepted = group.members?.some(
        (m) => String(m.userId) === claims.nameid && m.groupStatus === 1
      );
      setIsPendingMember(pending);
      setIsAcceptedMember(accepted);
    }
  }, [group, claims]);

  const handleJoin = async () => {
    try {
      await joinGroup(groupId);
      const updated = await fetchGroupById(groupId);
      setGroup(updated);
      setIsDialogOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveGroup(groupId);
      const updated = await fetchGroupById(groupId);
      setGroup(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAccept = async (userId) => {
    await AcceptUserIntoGroup(groupId, userId);
    const updated = await fetchGroupById(groupId);
    setGroup(updated);
  };

  const handleReject = async (userId) => {
    await RejectUserFromGroup(groupId, userId);
    const updated = await fetchGroupById(groupId);
    setGroup(updated);
  };

  if (!group) return null;

  const members = group.members?.filter((m) => m.groupStatus === 1) || [];
  const guests = group.nonUserMembers || [];
  const pending = group.members?.filter((m) => m.groupStatus === 0) || [];

  const ownerName =
    owner?.username ||
    group.members?.find((m) => String(m.userId) === String(ownerId))?.username ||
    "Unknown";

    const pendingUsers = group?.members?.filter(m => m.groupStatus === 0).length || 0;

  const paperStyle = {
    p: { xs: 2, md: 4 },
    backgroundColor: "rgba(27, 31, 59, 0.9)",
    color: "white",
  };

  const memberCardStyle = {
    p: { xs: 1.5, md: 2 },
    backgroundColor: "rgba(255,255,255,0.05)",
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          {/* LEFT COLUMN */}
          <Box sx={{ flex: "0 0 33%"}}>
            <Stack spacing={2}>
            <Paper elevation={10} sx={{ ...paperStyle, p: 0,
              height: { xs: "auto", md: "55vh" },
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}>
            <Tabs
              value={tabIndex}
              onChange={(e, newVal) => setTabIndex(newVal)}
              textColor="inherit"
              indicatorColor="primary"
              variant="fullWidth"
              size="small"
            >
              <Tab label="Info" />
              <Tab label="Description" />
              <Tab label="Members" />
            </Tabs>

            {tabIndex === 0 && (
              <Box sx={{ p: 3, height: "100%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                <Box sx={{display: "flex", flexDirection: "column", gap: "4px"}}>
                <Typography sx={{ wordBreak: "break-word" }} variant="h4">
                  {group.title}
                </Typography>
                
                <Divider sx={{ borderColor: "#888", mb: 1 }} />
                <Typography sx={{mb: 1}}>
                    Visibility: {group.isVisible ? "Public" : "Private"}
                </Typography>
                <Typography sx={{mb: 1}}>Age Range: {group.ageRange}</Typography>
                <Typography>Max Members: {group.maxMembers}</Typography>
                <Typography sx={{ mb: 1, mt: 1 }}>Tags:</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {group.tags?.length ? (
                    group.tags.map((tag, i) => (
                      <Chip key={i} label={tag} size="large" color="success" />
                    ))
                  ) : (
                    <Chip label="No tags" size="large" color="error" />
                  )}
                </Stack>
                  </Box>

                <Box mt={0} display="flex" flexDirection="column" gap={1}>
                  {!isAcceptedMember && !isPendingMember && (
                    <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                      Request to Join
                    </Button>
                  )}

                  {isPendingMember && (
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      startIcon={<CircularProgress color="inherit" size={16} />}
                      variant="outlined"
                      disabled
                      color="primary"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        ".MuiLoadingButton-loadingIndicator": {
                          color: "white",
                        },
                        "&.Mui-disabled": {
                          opacity: 1,
                          color: "white",
                          borderColor: "white",
                        },
                      }}
                    >
                      Pending Approval
                    </LoadingButton>
                  )}
                  {isAcceptedMember && (
                    <Button variant="outlined" color="error" onClick={handleLeave}>
                      {isGroupOwner ? "Disband Group" : "Leave Group"}
                    </Button>
                  )}
                  {isGroupOwner && ( // Pending users button
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => setIsPendingDialogOpen(true)}
                    sx={{ position: "relative" }}
                  >
                    Pending Users
                        {(
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "red",
                          color: "white",
                          borderRadius: "50%",
                          width: 18,
                          height: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        {pendingUsers}
                      </Box>
                    )}
                </Button>
                  )}
                </Box>
              </Box>
            )}

            {tabIndex === 2 && (
              <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
                <Typography variant="h6">
                  Members ({members.length + guests.length}/{group.maxMembers})
                </Typography>
                <Divider sx={{ borderColor: "#888", my: 1 }} />
                <Stack spacing={1}>
                  {members.map((m) => (
                    <Button
                      key={m.userId}
                      fullWidth
                      variant="contained"
                      onClick={() =>
                        navigate(String(m.userId) === String(claims.nameid) ? `/profile/me` : `/profile/${m.userId}`)
                      }
                      sx={{
                        backgroundColor: "rgba(27, 31, 59, 0.9)",
                        color: "white",
                        textTransform: "none",
                        justifyContent: "space-between",
                        borderRadius: "8px",
                        boxShadow: "0 0 8px rgba(255, 255, 255, 0.1)",
                        p: 2,
                        "&:hover": {
                          transform: "translateY(-2px) scale(1.01)",
                          backgroundColor: "rgba(27, 31, 59, 0.95)",
                          boxShadow: "0 6px 15px rgba(255, 255, 255, 0.2)",
                        },
                      }}
                    >
                      <Typography>{m.username}</Typography>
                      {String(m.userId) === String(ownerId) && (
                        <Chip label="Owner" size="small" color="primary" />
                      )}
                    </Button>
                  ))}
                  {guests.map((g, i) => (
                    <Paper key={i} sx={memberCardStyle}>
                      <Typography variant="body2" sx={{ fontStyle: "italic", color: "white" }}>
                        {g}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}
              {tabIndex === 1 && (
              <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Divider sx={{ borderColor: "#888", my: 1 }} />
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {group.description?.trim() || "No description provided."}
                </Typography>
              </Box>
            )}
            </Paper>
            </Stack>
          </Box>

          {/* Chat */}
          {isAcceptedMember ? (
            <Box sx={{ flex: 1, maxWidth: "100%" }}>
              <Box sx={{ height: "55vh" }}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 0,
                    backgroundColor: "rgba(27, 31, 59, 0.8)",
                    color: "white",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ChatBox
                    currentUserId={claims.nameid}
                    groupId={groupId}
                    participants={members}
                    chatId={group.chat.chatId}
                    canChat={isAcceptedMember}
                  />
                </Paper>
              </Box>
            </Box>
          ) : (
            <Box sx={{ flex: 1, maxWidth: "100%" }}>
              <Box sx={{ height: "55vh" }}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(27, 31, 59, 0.8)",
                    color: "white",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" align="center">
                    You must be a member of this group to view the chat.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      {isDialogOpen && ( //Confirm join group dialog
        <Dialog
          title="Join Group"
          message={`Do you want to join session #${groupId}?`}
          onClose={() => setIsDialogOpen(false)}
          actions={
            <>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleJoin}>
                Confirm
              </Button>
            </>
          }
        />
      )}

      {isPendingDialogOpen && pendingUsers > 0 && ( //only show pending users if there are any
        <Dialog
          title="Pending Users"
          message={
            <Stack spacing={1}>
              {pending.map((user) => (
                <Box
                  key={user.userId}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>{user.username}</Typography>
                  <Box>
                    <Button
                      size="small"
                      onClick={() => handleAccept(user.userId)}
                      sx={{ mr: 1 }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleReject(user.userId)}
                    >
                      Reject
                    </Button>
                  </Box>
                </Box>
              ))}
            </Stack>
          }
          onClose={() => setIsPendingDialogOpen(false)}
          actions={<Button onClick={() => setIsPendingDialogOpen(false)}>Close</Button>}
        />
      )}
    </Box>
  );
};

export default GroupInfoPage;