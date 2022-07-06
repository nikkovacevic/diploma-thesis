import React, { useState } from "react";
import { Paper, Button, TextField } from "@mui/material";

export default function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        password,
      };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setError("");
        setAuth(true);
      } else {
        setAuth(false);
        setError("Napacno geslo ali uporabnisko ime");
        resetForm();
      }
    } catch (err) {
      console.log(err.statusCode, e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#90b4ce",
        height: "100vh",
      }}
    >
      <Paper
        elevation={16}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 80,
        }}
      >
        <div
          style={{
            color: "#094067",
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          EKOLOGO
        </div>
        <TextField
          style={{ margin: 8 }}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          style={{ margin: 8 }}
          label="Geslo"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
            fontSize: "small",
            color: "#ef4565",
          }}
        >
          {error}
        </div>
        <Button
          style={{
            backgroundColor: "#3da9fc",
            color: "#fffffe",
            marginTop: 20,
          }}
          onClick={(e) => {
            submitLogin(e);
          }}
        >
          Prijava
        </Button>
      </Paper>
    </div>
  );
}
