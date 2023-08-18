import express from "express";
import { authorisedOnly } from "../middleware/auth";
import { prisma } from "../../db";
import { getAuthTokenFromHeader } from "../../utils";

const router = express.Router();

// router.post("/new", authorisedOnly, async (req, res) => {
// if (!req.user) return res.sendStatus(403);
// if (!req.body.name) return res.sendStatus(400);

// const newID = (await prisma.database.count()) + 1;

// const newDB = await prisma.database.create({
//   data: {
//     name: req.body.name,
//     User: {
//       connect: {
//         id: req.user.id,
//       },
//     },
//     plan
//   },
// });

// res
//   .status(200)
//   .send({ message: "Created database succesfully", database: newDB });
// });

export default router;
