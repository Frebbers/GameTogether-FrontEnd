import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { joinSession } from '../services/apiService';
import styles from './RequestJoinDialog.module.css';

const RequestJoinDialog = ({ sessionId, onClose }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoinSession = async () => {
    setError("");

    try {
      await joinSession(sessionId);
      console.log("Joined session", sessionId);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles['dialog-container']}>
      <div className={styles['dialog-box']} onClick={(e) => e.stopPropagation()}>
        <h2>Join Session</h2>
        <p>Do you want to join session #{sessionId}?</p>

        {error && <p className={styles['dialog-error']}>{error}</p>}

        <div className={styles['dialog-actions']}>
          <button onClick={() => {
            onClose();
            navigate("/");
          }}>Cancel</button>
          <button onClick={async () => {
            try {
              await handleJoinSession();
              onClose();
              navigate("/");
              window.location.reload(); //No idea how else i should rerender the UI
            } catch (err) {
              
            }
          }}>Confirm</button>
        </div>
      </div>
  </div>
  );
};

export default RequestJoinDialog;
