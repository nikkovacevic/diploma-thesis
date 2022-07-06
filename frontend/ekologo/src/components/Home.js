import React, { useEffect, useState } from "react";
import { Paper, Button, TextField } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";

import Navbar from "../components/Navbar";
import Counter from "../components/Counter";

export default function Home({ setAuth }) {
  const [countUsers, setCountUsers] = useState(null);
  const [countDocs, setCountDocs] = useState(null);

  const countAllUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/users/countAllUsers",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      setCountUsers(parseRes.count);
    } catch (err) {
      console.error(err.message);
    }
  };

  const countAllDocs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/garbage/countAllDocs",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      setCountDocs(parseRes.count);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    countAllUsers();
    countAllDocs();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fffffe",
        height: "100vh",
      }}
    >
      <Navbar setAuth={setAuth} />

      {/* counteri */}
      <div style={{ padding: 50, display: "flex" }}>
        <Counter
          count={countUsers}
          title={"Uporabniki"}
          icon={<PersonIcon fontSize="large" style={{ color: "#fffffe" }} />}
        />

        <Counter
          count={countDocs}
          title={"Dokumenti"}
          icon={
            <AssignmentIcon fontSize="large" style={{ color: "#fffffe" }} />
          }
        />
      </div>
    </div>
  );
}
