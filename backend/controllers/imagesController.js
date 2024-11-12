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

const image_get = async (req, res) => {
  try {
    const image = await prisma.image.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send(JSON.stringify(image));
    return image;
  } catch (err) {
    console.error("error getting image", err.message);
    return err;
  }
};

module.exports = {
  images_get,
  image_get,
  //
};
