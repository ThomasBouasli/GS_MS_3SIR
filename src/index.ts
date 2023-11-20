import Express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = Express();

app.get("/", async (req, res) => {
  const data = await prisma.data.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return res.json(data);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const data = await prisma.data.findUnique({
    where: {
      id,
    },
  });

  return res.json(data);
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
