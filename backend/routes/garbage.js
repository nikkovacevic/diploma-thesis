const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");

router.get("/getAllTypes", authorize, async (req, res) => {
  try {
    const types = await pool.query("SELECT gt_type FROM garbage_types");
    res.json(types.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/getAllDocs", authorize, async (req, res) => {
  try {
    const docs = await pool.query(
      "SELECT gd_date, gd_type, gd_weight, gd_comment, gd_responsible FROM garbage_documents"
    );
    res.json(docs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/countAllDocs", authorize, async (req, res) => {
  try {
    const count = await pool.query("SELECT COUNT(*) FROM garbage_documents");
    res.json(count.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/addDoc", authorize, async (req, res) => {
  try {
    const { type, weight, comment, responsible } = req.body;

    const newDoc = await pool.query(
      `INSERT INTO garbage_documents (gd_date, gd_type, gd_weight, gd_comment, gd_responsible) VALUES (NOW(), $1, $2, $3, $4)`,
      [type, weight, comment, responsible]
    );

    res.json("Operation successful");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
