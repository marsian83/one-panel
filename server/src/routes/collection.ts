import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
const router = express.Router();

router.get("/:id", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const collection = await prisma.collection.findFirst({
    where: { id: id, Artifact: { Database: { User: { id: req.user.id } } } },
  });

  if (!collection) return res.sendStatus(403);

  res.status(200).send({ collection });
});

router.put("/:id", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  if (!req.body.name && !req.body.schema) return res.sendStatus(400);

  let schema: object = {};

  try {
    schema = JSON.parse(req.body.schema);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }

  const collection = await prisma.collection.findFirst({
    where: { id: id, Artifact: { Database: { User: { id: req.user.id } } } },
  });

  if (!collection) return res.sendStatus(403);

  await prisma.collection.update({
    data: { name: req.body.name, schema },
    where: {
      id,
    },
  });

  res.status(200).send({ message: "updated successfully", collection });
});

export default router;
