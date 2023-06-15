import express from "express";
import authenticateToken from "../middleware/authenticateToken";
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.send({ message: "success" });
  res.send(req.user || "non");
});

export default router;
