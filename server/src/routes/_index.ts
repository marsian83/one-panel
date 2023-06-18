import express from "express";
import exampleRouter from "./example";
import authRouter from "./auth";
import userRouter from "./user";
import databasesRouter from "./database";

const router = express.Router();

router.use("/example", exampleRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/database", databasesRouter);

router.get("/", (req, res) => {
  res.send(
    `Backend running successfully on ${
      req.protocol + "://" + req.get("host") + req.originalUrl
    }`
  );
});

export default router;
