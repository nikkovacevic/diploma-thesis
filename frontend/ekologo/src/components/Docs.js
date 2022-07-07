import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

import Navbar from "../components/Navbar";
import AddDocModal from "../components/AddDocModal";

export default function Docs({ setAuth }) {
  const [countDocs, setCountDocs] = useState(null);
  const [docs, setDocs] = useState([]);

  const getAllDocs = async () => {
    try {
      const response = await fetch("http://localhost:5000/garbage/getAllDocs", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setDocs(parseRes);
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

  const handleAddNewDoc = async (data) => {
    try {
      await fetch("http://localhost:5000/garbage/addDoc", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setOpenAddNewModal(false);
      await getAllDocs();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllDocs();
    countAllDocs();
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
        <h2 style={{ marginRight: 40 }}>Vsi tehtalni listi</h2>
        <Button
          onClick={() => setOpenAddNewModal(true)}
          style={{
            height: "fit-content",
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
          {docs &&
            docs.map((item, index) => {
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
                  {parseInt(item.gd_type) === 1 ? (
                    <ListItemText
                      primary={`${item.gd_weight} kg`}
                      secondary={"Papir"}
                    />
                  ) : (
                    <></>
                  )}
                  {parseInt(item.gd_type) === 2 ? (
                    <ListItemText
                      primary={`${item.gd_weight} kg`}
                      secondary={"Plastika"}
                    />
                  ) : (
                    <></>
                  )}
                  {parseInt(item.gd_type) === 3 ? (
                    <ListItemText
                      primary={`${item.gd_weight} kg`}
                      secondary={"Steklo"}
                    />
                  ) : (
                    <></>
                  )}
                  {parseInt(item.gd_type) === 4 ? (
                    <ListItemText
                      primary={`${item.gd_weight} kg`}
                      secondary={"Bioloski"}
                    />
                  ) : (
                    <></>
                  )}
                  {parseInt(item.gd_type) === 5 ? (
                    <ListItemText
                      primary={`${item.gd_weight} kg`}
                      secondary={"Mesani"}
                    />
                  ) : (
                    <></>
                  )}

                  <ListItemText
                    primary={`${item.gd_responsible.toUpperCase()}`}
                  />

                  <ListItemText primary={`${item.gd_comment}`} />

                  <ListItemText
                    primary={new Date(item.gd_date).toLocaleDateString()}
                  />
                </ListItem>
              );
            })}
        </List>
      </div>
      <AddDocModal
        open={openAddNewModal}
        handleClose={() => setOpenAddNewModal(false)}
        handleSave={(saveData) => {
          handleAddNewDoc(saveData);
        }}
      />
    </div>
  );
}
