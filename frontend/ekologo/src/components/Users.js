import React, { useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText, Paper } from "@mui/material";

import Navbar from "../components/Navbar";
import AddUserModal from "./AddUserModal";

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

  const handleAddNewUser = async (data) => {
    try {
      await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setOpenAddNewModal(false);
      await getAllUsers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
    countAllUsers();
  }, []);

  const [openAddNewModal, setOpenAddNewModal] = useState(false);

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
      <div
        style={{
          paddingLeft: "50px",
          paddingTop: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <Paper
          elevation={8}
          style={{
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#ef4565",
            color: "#fffffe",
            marginRight: 40,
            borderRadius: 24,
          }}
        >
          {countUsers}
        </Paper> */}
        <h2 style={{ marginRight: 40 }}>Vsi uporabniki</h2>
        <Button
          onClick={() => setOpenAddNewModal(true)}
          style={{
            height: "fit-content",
            // backgroundColor: "#3da9fc",
            backgroundColor: "#ef4565",
            color: "#fffffe",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          Dodaj
        </Button>
      </div>

      {/* list vseh */}
      <div
        style={{ paddingLeft: "50px", paddingRight: "50px", marginTop: "20px" }}
      >
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

      <AddUserModal
        open={openAddNewModal}
        handleClose={() => setOpenAddNewModal(false)}
        handleSave={(saveData) => {
          handleAddNewUser(saveData);
        }}
      />
    </div>
  );
}
