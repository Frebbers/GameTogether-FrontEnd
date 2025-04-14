import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { joinGroup } from '../services/ApiService';
import styles from './RequestJoinDialog.module.css';

const RequestJoinDialog = ({ groupId, onClose }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoinGroup = async () => {
    setError("");

    try {
      await joinGroup(groupId);
      console.log("Joined group", groupId);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles['dialog-container']}>
      <div className={styles['dialog-box']} onClick={(e) => e.stopPropagation()}>
        <h2>Join Group</h2>
        <p>Do you want to join session #{groupId}?</p>

        {error && <p className={styles['dialog-error']}>{error}</p>}

        <div className={styles['dialog-actions']}>
          <button onClick={() => {
            onClose();
            navigate("/");
          }}>Cancel</button>
          <button onClick={async () => {
            try {
              await handleJoinGroup();
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
