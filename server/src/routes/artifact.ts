import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
import axios from "axios";
import { Service } from "../types/microservices";
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

router.get("/:id/endpoints", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const artifact = await prisma.artifact.findFirst({
    where: { id: id, Database: { userId: req.user.id } },
    select: {
      name: true,
      collections: {
        select: { id: true, name: true },
      },
      Database: { select: { name: true } },
    },
  });

  if (!artifact || !artifact.Database) return res.sendStatus(403);

  const mongodb_dbname =
    `onelot${req.user.id}_${artifact.Database.name}`.replace(" ", "");

  const endpoints = await axios.get(
    `${Service.DB_ACCESS}/endpoints?db=${mongodb_dbname}&artifact=${
      artifact.name
    }&collections=${JSON.stringify(artifact.collections)}`
  );

  res.status(200).send({ endpoints: endpoints.data.endpoints });
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

  return res.status(201).send({
    message: "Created Collection Successfully",
    collection: collection,
  });
});

export default router;
