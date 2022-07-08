import React, { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import Navbar from "../components/Navbar";
import Counter from "../components/Counter";
import Chart from "../components/Chart";

export default function Home({ setAuth }) {
  const [countUsers, setCountUsers] = useState(null);
  const [countDocs, setCountDocs] = useState(null);
  const [name, setName] = useState("");
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

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

  const getUserName = async () => {
    try {
      const email = localStorage.email;

      const response = await fetch(
        ` http://localhost:5000/users/getUserByEmail/${email}`,
        {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        }
      );
      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (err) {
      console.error(err);
    }
  };

  const getChartData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/garbage/getChartData",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      setLabels(parseRes && parseRes.map((a) => a.tip));
      setData(parseRes && parseRes.map((a) => a.sum));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    countAllUsers();
    countAllDocs();
    getUserName();
    getChartData();
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
      <div
        style={{
          padding: 50,
          paddingLeft: 75,
          display: "flex",
          alignItems: "center",
        }}
      >
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

        <h1 style={{ color: "#094067", marginLeft: 50 }}>
          <DoubleArrowIcon style={{ marginRight: 10 }} />
          Pozdravljeni {name}
        </h1>
      </div>

      <Chart labels={labels && labels} values={data && data} />
    </div>
  );
}
