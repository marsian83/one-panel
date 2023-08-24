import express from "express";
import { authorisedOnly, unauthorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
import axios from "axios";
import { Service } from "../types/microservices";
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

router.get("/:id/endpoint", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const collection = await prisma.collection.findFirst({
    where: { id: id, Artifact: { Database: { userId: req.user.id } } },
    select: {
      id: true,
      name: true,
      Artifact: {
        select: { name: true, Database: { select: { name: true } } },
      },
    },
  });

  if (!collection || !collection.Artifact || !collection.Artifact.Database)
    return res.sendStatus(403);

  const mongodb_dbname =
    `onelot${req.user.id}_${collection.Artifact.Database.name}`.replace(
      " ",
      ""
    );

  const endpoint = await axios.get(
    `${Service.DB_ACCESS}/endpoints?db=${mongodb_dbname}&artifact=${
      collection.Artifact.name
    }&collections=${JSON.stringify([
      { id: collection.id, name: collection.name },
    ])}`
  );

  res.status(200).send({ endpoint: endpoint.data.endpoints[0] });
});

router.post("/:id/entry", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  if (!req.body.data) return res.sendStatus(400);

  try {
    JSON.parse(req.body.data);
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }

  const collection = await prisma.collection.findFirst({
    where: { id: id, Artifact: { Database: { User: { id: req.user.id } } } },
    include: {
      Artifact: {
        include: { Database: { select: { name: true } } },
      },
    },
  });
  if (!collection || !collection.Artifact || !collection.Artifact.Database)
    return res.sendStatus(403);
  const mongodb_dbname =
    `onelot${req.user.id}_${collection.Artifact.Database.name}`.replace(
      " ",
      ""
    );

  const response = await axios.post(
    `${Service.DB_ACCESS}/entry`,
    JSON.stringify({
      db_name: mongodb_dbname,
      artifact: collection.Artifact.name,
      collection: collection.name,
      data: req.body.data,
    })
  );

  if (response.data.code == 0) {
    return res.status(201).send({ message: "created Entry successfully" });
  }

  return res
    .status(500)
    .send({ message: "Failed to create entry", error: response.data.error });
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
