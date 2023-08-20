import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
const router = express.Router();

router.get("/:id", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const db = await prisma.database.findFirst({
    where: {
      userId: req.user.id,
    },
  });

  if (!db) return res.sendStatus(401);

  const collection = await prisma.collection.findFirst({
    where: { id: id, Artifact: { Database: { User: { id: req.user.id } } } },
  });

  if (!collection) return res.sendStatus(403);

  res.status(200).send({ collection });
});

export default router;
