import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import "./ChangePass.css"; 

export default function ChangePasswordModal({ open, setOpen }) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Handle input change
  const handleChange = (event) => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">Change Password</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          margin="dense"
          name="currentPassword"
          label="Current Password"
          type="password"
          fullWidth
          value={passwords.currentPassword}
          onChange={handleChange}
          className="password-input"
        />
        <TextField
          margin="dense"
          name="newPassword"
          label="New Password"
          type="password"
          fullWidth
          value={passwords.newPassword}
          onChange={handleChange}
          className="password-input"
        />
        <TextField
          margin="dense"
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          fullWidth
          value={passwords.confirmNewPassword}
          onChange={handleChange}
          className="password-input"
        />
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={() => setOpen(false)} color="secondary" className="cancel-button">
          Cancel
        </Button>
        <Button color="primary" className="change-password-button">
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}
