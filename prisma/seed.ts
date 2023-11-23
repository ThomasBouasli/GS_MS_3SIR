import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import fs from "fs";

const prisma = new PrismaClient();

const schema = z.object({
  name: z.string(),
  index: z.string(),
  data: z.any(),
});

async function main() {
  const fileNames = fs.readdirSync("./data");

  for (const fileName of fileNames) {
    const file = fs.readFileSync(`./data/${fileName}`, "utf-8");

    const data = JSON.parse(file);

    const validated = schema.parse(data);

    await prisma.data.create({
      data: {
        id: validated.index,
        name: validated.name,
        data: validated.data,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
