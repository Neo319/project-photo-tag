require("dotenv").config();

const express = require("express");
const imagesRouter = require("./routes/images");

const app = express();

// MIDDLEWARE:
// parse JSON
app.use(express.json());

// ROUTES:
app.use("/images", imagesRouter);

app.get("/", (req, res) => {
  res.send("welcome to my backend...");
});

app.listen(2000, () => console.log("Server started on port 2000"));
