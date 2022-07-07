import React from "react";

import Navbar from "./Navbar";

export default function About({ setAuth }) {
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
    </div>
  );
}
