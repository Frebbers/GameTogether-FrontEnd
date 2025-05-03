import React from "react";

const Modal = ({ title, message, actions, onClose, showInput = false, inputPlaceholder = "", inputValue = "", setInputValue }) => {
  return (
    <div className="modal show d-block" tabIndex="-1" onClick={onClose} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content" style={{ backgroundColor: "#1b1f3b", color: "white", borderRadius: "1rem" }}>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <p>{message}</p>

            {showInput && (
              <input
                type="text"
                className="form-control mt-3"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                style={{
                  backgroundColor: "#4A4E54",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
          <div className="modal-footer">
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
