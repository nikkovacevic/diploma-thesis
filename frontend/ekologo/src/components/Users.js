import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

import Navbar from "../components/Navbar";

export default function Users({ setAuth }) {
  const [countUsers, setCountUsers] = useState(null);
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/getAllUsers", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setUsers(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

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

  useEffect(() => {
    getAllUsers();
    countAllUsers();
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

      {/* title pa dodaj pa to */}
      <div></div>

      {/* list vseh */}
      <div style={{ padding: "50px" }}>
        <List>
          {users &&
            users.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  style={{
                    padding: 16,
                    paddingLeft: 24,
                    border: `1px solid #5f6c7b`,
                    borderRadius: 8,
                    color: "#5f6c7b",
                    marginBottom: 8,
                  }}
                >
                  <ListItemText primary={`${item.user_name}`} />

                  <ListItemText primary={`${item.user_email}`} />
                </ListItem>
              );
            })}
        </List>
      </div>
    </div>
  );
}
