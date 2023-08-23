import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
import { sha256 } from "../helpers/sha256";
import axios from "axios";
import { Service } from "../types/microservices";

const router = express.Router();

router.get("/:id", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const db = await prisma.database.findFirst({
    where: { id },
    include: {
      artifacts: {
        include: { collections: { select: { id: true, name: true } } },
      },
    },
  });

  res.status(200).send({ database: db });
});

router.post("/new", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const { name, plan, icon } = req.body;

  if (!(name && plan && (icon.codepoint || icon.imageUrl)))
    return res.sendStatus(400);

  const mongodb_username = `one${req.user.id}_${req.user.username}`.replace(
    " ",
    ""
  );
  const mongodb_passwd = sha256(
    (req.user.id + req.user.username.length + Math.random() * 2e26).toString()
  );
  const mongodb_dbname = `onelot${req.user.id}_${name}`.replace(" ", "");

  const dbResponse = await axios.post(
    `${Service.DB_ACCESS}/allocate`,
    JSON.stringify({
      db_name: mongodb_dbname,
      username: mongodb_username,
      password: mongodb_passwd,
    })
  );

  if (dbResponse.data.code != 0) {
    return res
      .status(500)
      .send({ message: "Failed to allocate database on mongoDB instance" });
  }

  const newDB = await prisma.database.create({
    data: {
      name,
      User: {
        connect: {
          id: req.user.id,
        },
      },
      plan,
      icon,
      uri: dbResponse.data.uri,
    },
  });

  res
    .status(201)
    .send({ message: "Created database succesfully", database: newDB });
});

router.post("/:id/artifact", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const { name, color, icon } = req.body;
  if (!(name && color && icon.codepoint)) return res.sendStatus(400);

  const artifact = await prisma.artifact.create({
    data: { color, icon, name, Database: { connect: { id } } },
  });

  res
    .status(201)
    .send({ message: "Created artifact succesfully", artifact: artifact });
});

export default router;
