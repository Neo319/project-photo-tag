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

// TODO:
// route for user click (compare with db)

// send as param img data as JSON, with: click{x, y}; res{x, y}, imgId
const click_post = async (req, res) => {
  try {
    const clickX = req.body.click.x;
    const clickY = req.body.click.y;
    const imageId = parseInt(req.body.imageId); // which image to compare to

    const resolution = req.body.resolution; //

    // ensure good request
    if (!(clickX && clickY && imageId && resolution.x && resolution.y)) {
      //missing information
      console.log(req.body);
      console.log("missing info");
      res.status(400).message("Bad request: missing required params");
    }

    // NORMALIZE location:
    function normalize(coord, resolution) {
      return Math.floor((coord / resolution) * 100);
    }

    // FETCH image resolution
    const image = await prisma.image.findUnique({
      where: {
        id: imageId,
      },
      select: {
        resolution: true,
        locations: true,
      },
    });

    console.log(image);

    // the image's resolution
    const x = image.resolution.x;
    const y = image.resolution.y;

    //the locations to compare against
    const locations = image.locations;

    // where the user clicked, normalized
    const normalClickX = normalize(clickX, x);
    const normalClickY = normalize(clickY, y);

    // where comparison occurs
    locations.map((location) => {
      // ---- LOCATIONS normalized here ----
      const normalLoc = {
        x: normalize(location.x, x),
        y: normalize(location.y, y),
      };

      console.log(normalLoc);
      console.log(compare(normalLoc, { x: normalClickX, y: normalClickY }));

      // compare normalized locations data with normalized user click data
      if (compare(normalLoc, { x: normalClickX, y: normalClickY })) {
        // location successfully matched
        console.log("success 2!");
        res.send(location.name);
        return true;
      }
    });

    // function for comparison
    function compare(location, click) {
      console.log(
        "comparing: " + JSON.stringify(location),
        "to: " + JSON.stringify(click)
      );
      if (location.x == click.x && location.y == click.y) {
        console.log("success!");
        return true;
      } else return false;
      //
    }

    // no location found
    res.send("no location found.");
  } catch (err) {
    console.error("error in click", err.message);
    return err;
  }
};

// TODO:
// click_get is buggy and seems to only return success 2, even with wrong coords.
// NORMALIZE FUNCTION NEEDS WORK.

module.exports = {
  images_get,
  image_get,
  click_post,
  //
};
