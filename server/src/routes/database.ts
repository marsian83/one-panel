import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";

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
    },
  });

  res
    .status(200)
    .send({ message: "Created database succesfully", database: newDB });
});

router.post("/:id/artifact", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);

  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);

  const { name, color, icon } = req.body;
  if (!(name && color && icon.codepoint)) return res.sendStatus(400);

  const db = await prisma.artifact.create({
    data: { color, icon, name, Database: { connect: { id } } },
  });

  res.status(200).send({ database: db });
});

export default router;
