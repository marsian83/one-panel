import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const refreshTokens: string[] = [];

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    {},
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = generateAccessToken({
        username: (user as any).name,
      });
      res.json({ accessToken: accessToken });
    }
  );
});

router.delete("/logout", (req, res) => {});

router.post("/login", (req, res) => {
  const username = req.body.username;

  const user = { username: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});

export default router;

function generateAccessToken(user: { username: string }) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}
