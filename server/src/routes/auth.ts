import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import { authorisedOnly, unauthorisedOnly } from "../middleware/auth";

const router = express.Router();

// const refreshTokens: string[] = [];

// router.post("/token", (req, res) => {
//   const refreshToken = req.body.token;
//   if (refreshToken == null) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     {},
//     (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       const accessToken = generateAccessToken({
//         username: (user as any).name,
//       });
//       res.json({ accessToken: accessToken });
//     }
//   );
// });

router.delete("/logout", (req, res) => {
  req.user = undefined;
  res.sendStatus(205);
});

router.post("/login", unauthorisedOnly, async (req, res) => {
  const { username, password } = req.body;

  const userData = await prisma.user.findFirst({
    where: { username: username, password: password },
  });

  if (!userData) {
    return res.sendStatus(401);
  }

  const user = { id: userData.id, username: userData.username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20h",
  });

  // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  // refreshTokens.push(refreshToken);

  res.status(200).json({ accessToken: accessToken });
});

router.post("/register", unauthorisedOnly, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username: username, email: email, password: password },
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.get("/validate", (req, res) => {
  const { token } = req.query;

  if (typeof token != "string") return res.send({ valid: false });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, user) => {
    if (err) return res.send({ valid: false });
  });

  return res.status(200).send({ valid: true });
});

export default router;
