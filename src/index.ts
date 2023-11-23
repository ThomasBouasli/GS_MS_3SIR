import Express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = Express();

app.get("/objetivos", async (req, res) => {
  const data = await prisma.data.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return res.status(200).json(data);
});

app.get("/indicador/:id", async (req, res) => {
  const { id } = req.params;

  const data = await prisma.data.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    res.status(404).json({ message: "Data not found" });
  }

  return res.status(200).json(data);
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
