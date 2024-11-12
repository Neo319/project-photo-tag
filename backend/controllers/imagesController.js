const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const images_get = async (req, res) => {
  try {
    const images = await prisma.image.findMany();

    res.send(JSON.stringify(images));
    return images;
  } catch (err) {
    console.error("error getting images", err.message);
    return err;
  }
};

module.exports = {
  images_get,
  //
};
