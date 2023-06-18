import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";

const router = express.Router();

router.get("/name", authorisedOnly, (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.json({ username: req.user.username });
});

router.get("/databases", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const user = await prisma.user.findFirst({
    where: { id: req.user.id },
    include: { Databases: true },
  });
  if (!user) return res.sendStatus(403);
  res.status(200).send({ databases: user.Databases });
});

export default router;
