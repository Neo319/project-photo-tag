require("dotenv").config();

const express = require("express");
const app = express();

//todo: import prisma client...
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("welcome to my backend...");
});

app.get("/images", async (req, res) => {
  try {
    const images = await prisma.image.findMany();

    res.send(JSON.stringify(images));
    return images;
  } catch (err) {
    console.error("error getting images", err.message);
    return err;
  }
});

app.listen(2000, () => console.log("Server started on port 2000"));
