require("dotenv").config();

const express = require("express");
const app = express();

const imagesRouter = require("./routes/images");

app.get("/", (req, res) => {
  res.send("welcome to my backend...");
});

app.use("/images", imagesRouter);

app.listen(2000, () => console.log("Server started on port 2000"));
