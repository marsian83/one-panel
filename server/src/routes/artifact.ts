import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
const router = express.Router();

router.get("/:id", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const artifact = await prisma.artifact.findFirst({
    where: {
      id: id,
      Database: {
        User: {
          id: req.user.id,
        },
      },
    },
    include: { collections: { select: { id: true, name: true } } },
  });

  return res.status(200).send({ artifact: artifact });
});

router.post("/:id/collection", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id || !req.body.name) return res.sendStatus(400);

  const artifact = await prisma.artifact.findFirst({
    where: {
      id: id,
      Database: {
        User: {
          id: req.user.id,
        },
      },
    },
  });

  if (!artifact) return res.sendStatus(401);

  const collection = await prisma.collection.create({
    data: {
      name: req.body.name,
      artifactId: id,
    },
  });

  return res.status(200).send({
    message: "Created Collection Successfully",
    collection: collection,
  });
});

export default router;
