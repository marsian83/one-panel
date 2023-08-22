import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import { authorisedOnly, unauthorisedOnly } from "../middleware/auth";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/validate", (req, res) => {
  const { token } = req.query;

  if (typeof token != "string") return res.send({ valid: false });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, _) => {
    if (err) return res.send({ valid: false });
  });

  return res.status(200).send({ valid: true });
});

router.post("/login", unauthorisedOnly, async (req, res) => {
  const { email, password } = req.body;

  const userData = await prisma.user.findFirst({
    where: { email },
  });

  if (!userData) {
    return res.sendStatus(401);
  }

  if (!(await bcrypt.compare(password, userData.password))) {
    return res.sendStatus(401);
  }

  const user = { id: userData.id, username: userData.name };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20h",
  });

  res.status(201).json({ accessToken: accessToken });
});

router.post("/register", unauthorisedOnly, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.delete("/logout", (req, res) => {
  req.user = undefined;
  res.sendStatus(205);
});

export default router;
