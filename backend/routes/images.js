const express = require("express");
const router = express.Router();

const imagesController = require("../controllers/imagesController.js");

router.get("/", imagesController.images_get);

router.get("/:id", imagesController.image_get);

router.get("/click/:imageId/:x/:y", imagesController.click_get);

module.exports = router;
