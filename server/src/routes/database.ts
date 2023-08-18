import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";

const router = express.Router();

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

export default router;
