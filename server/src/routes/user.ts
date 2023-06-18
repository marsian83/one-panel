import express from "express";
import { authorisedOnly } from "../middleware/auth";

const router = express.Router();

router.get("/name", authorisedOnly, (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.json({ username: req.user.username });
});

router.get("/databases", authorisedOnly, (req, res) => {
  res.send("raa");
});

export default router;
