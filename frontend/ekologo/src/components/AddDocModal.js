import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function AddUserModal({ open, handleClose, handleSave }) {
  const [weight, setWeight] = useState(null);
  const [employee, setEmployee] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  const resetForm = () => {
    setWeight("");
    setEmployee("");
    setComment("");
    setDate("");
  };

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
        <DialogTitle>Nov dokument</DialogTitle>
        <DialogContent>
          <TextField
            style={{
              marginTop: 24,
              width: "45%",
            }}
            variant="outlined"
            label="Teza v kg"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <FormControl
            style={{
              marginTop: 24,
              width: "45%",
              marginLeft: "5%",
            }}
          >
            <Select
              value={type}
              onChange={handleSelectChange}
              labelId="select-type"
            >
              <MenuItem value={1}>Papir</MenuItem>
              <MenuItem value={2}>Plastika</MenuItem>
              <MenuItem value={3}>Steklo</MenuItem>
              <MenuItem value={4}>Bioloski</MenuItem>
              <MenuItem value={5}>Mesani</MenuItem>
            </Select>
          </FormControl>

          <TextField
            style={{
              marginTop: 24,
            }}
            variant="outlined"
            label="Zaposleni"
            type="text"
            fullWidth
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
          <TextField
            style={{
              marginTop: 24,
            }}
            variant="outlined"
            label="Komentar"
            type="text"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} style={{ color: "#5f6c7b" }}>
            Preklici
          </Button>

          <Button
            onClick={() => {
              handleSave({
                type: type,
                weight: weight,
                comment: comment,
                responsible: employee,
              });
            }}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
