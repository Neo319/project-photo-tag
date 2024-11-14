const express = require("express");
const router = express.Router();

//temp testing
router.post("/test", async (req, res) => {
  console.log("hi");
  console.log("body: ", req.body);
  res.send("noting");
});

const imagesController = require("../controllers/imagesController.js");

router.get("/", imagesController.images_get);

router.get("/:id", imagesController.image_get);

router.get("/click/clickData=:data", imagesController.click_get);

module.exports = router;
