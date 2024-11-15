require("dotenv").config();

const express = require("express");
const cors = require("cors");

const imagesRouter = require("./routes/images");

const app = express();

// MIDDLEWARE:
// parse JSON
app.use(express.json());

// allow CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://neo319.github.io"],
    methods: "POST, GET, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ROUTES:
app.use("/images", imagesRouter);

app.get("/", (req, res) => {
  res.send("welcome to my backend...");
});

app.listen(2000, () => console.log("Server started on port 2000"));
