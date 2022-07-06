import React from "react";
import { Paper, Button, TextField } from "@mui/material";

export default function Counter({ count, title, icon }) {
  return (
    <Paper
      elevation={8}
      style={{
        height: 120,
        width: "20%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 40,
        paddingRight: 40,
        marginRight: 40,
        backgroundColor: "#ef4565",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            marginBottom: 6,
            fontWeight: 600,
            color: "#fffffe",
          }}
        >
          {count}
        </div>
        <div
          style={{
            fontSize: "16px",
            marginTop: 6,
            fontWeight: 500,
            color: "#fffffe",
          }}
        >
          {title}
        </div>
      </div>
      <div>{icon}</div>
    </Paper>
  );
}
