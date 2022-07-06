import React from "react";
import { Link } from "react-router-dom";
import { Paper, Button, TextField } from "@mui/material";

export default function Navbar({ setAuth }) {
  return (
    <div className="navbarWrapper">
      <div className="navbarLogo">EKOLOGO</div>
      <div className="navbarList">
        <ul>
          <li>
            <Link to="/home" className="navbarLink">
              Domov
            </Link>
          </li>
          <li>
            <Link to="/docs" className="navbarLink">
              Tehtalni listi
            </Link>
          </li>
          <li>
            <Link to="/users" className="navbarLink">
              Uporabniki
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbarLink">
              O aplikaciji
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbarButton">
        <Button
          style={{
            backgroundColor: "#3da9fc",
            color: "#fffffe",
            paddingLeft: 16,
            paddingRight: 16,
          }}
          onClick={() => {
            setAuth(false);
          }}
        >
          Odjava
        </Button>
      </div>
    </div>
  );
}
