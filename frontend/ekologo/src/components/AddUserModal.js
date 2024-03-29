import React, { useEffect, useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddUserModal({ open, handleClose, handleSave }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const resetForm = useCallback(() => {
    setUsername("");
    setPassword("");
    setEmail("");
  }, []);

  const onClose = () => {
    handleClose();
    setTimeout(resetForm, 300);
  };

  useEffect(() => {
    if (!open) {
      setTimeout(resetForm, 300);
    }
  }, [open, resetForm]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Nov uporabnik</DialogTitle>
        <DialogContent>
          <TextField
            style={{
              marginTop: 24,
            }}
            variant="outlined"
            label="Uporabniško ime"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{
              marginTop: 24,
            }}
            variant="outlined"
            label="E-pošta"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{
              marginTop: 24,
            }}
            variant="outlined"
            label="Geslo"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} style={{ color: "#5f6c7b" }}>
            Prekliči
          </Button>

          <Button
            onClick={() => {
              handleSave({ name: username, email: email, password: password });
            }}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
