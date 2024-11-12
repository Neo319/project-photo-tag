const express = require("express");
const router = express.Router();

const imagesController = require("../controllers/imagesController.js");

router.get("/", imagesController.images_get);

module.exports = router;
