import express from "express";
import {pool} from "../db/db.js";

const router = express.Router();

router.get("/contact", async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contact WHERE "isDeleted" = false');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;  