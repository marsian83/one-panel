import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
const router = express.Router();

router.post("/new", authorisedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(403);
  if (!req.body.name) return res.sendStatus(400);
  const newDB = await prisma.dB.create({
    data: {
      name: req.body.name,
      User: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  res
    .status(200)
    .send({ message: "Created database succesfully", database: newDB });
});

export default router;
