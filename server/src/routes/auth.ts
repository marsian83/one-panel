import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import { unauthorisedOnly } from "../middleware/auth";

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

router.delete("/logout", (req, res) => {});

router.post("/login", unauthorisedOnly, async (req, res) => {
  const { username, password } = req.body;

  const userData = await prisma.user.findFirst({
    where: { username: username, password: password },
  });

  if (!userData) {
    return res.sendStatus(401);
  }

  const accessToken = generateAccessToken(userData);
  // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  // refreshTokens.push(refreshToken);

  res.status(200).json({ accessToken: accessToken });
});

function generateAccessToken(user: { username: string }) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20h" });
}

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

export default router;
