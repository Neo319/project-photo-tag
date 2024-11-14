const express = require("express");
const router = express.Router();

//temp testing
router.post("/test", async (req, res) => {
  console.log("hi");
  console.log("body: ", req.body);
  res.end("test complete");
});

const imagesController = require("../controllers/imagesController.js");

router.get("/", imagesController.images_get);

router.get("/:id", imagesController.image_get);

router.post("/click/", imagesController.click_post);

module.exports = router;
