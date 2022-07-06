const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");

router.get("/getAllUsers", authorize, async (req, res) => {
  try {
    const users = await pool.query("SELECT user_name, user_email FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/countAllUsers", authorize, async (req, res) => {
  try {
    const count = await pool.query("SELECT COUNT(*) FROM users");
    res.json(count.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
