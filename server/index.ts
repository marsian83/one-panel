import "dotenv/config";

import express from "express";
import cors from "cors";
import indexRouter from "./src/routes/_index";

import { frontendUrl } from "./config";
import { prisma } from "./db";

const PORT = Number(process.env.PORT) || 9090;

const app = express();

app.use(cors()); //{ origin: frontendUrl }));
app.use(express.json());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  prisma.$connect();
});
