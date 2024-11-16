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
    const imageId = parseInt(req.body.imgId); // which image to compare to

    // TODO: end if any do not meet specified paramaters...
    // ensure good request

    function isValidObject(obj) {
      if (
        obj?.click &&
        typeof obj.click.x === "number" &&
        typeof obj.click.y === "number" &&
        obj?.resolution &&
        typeof obj.resolution.y === "number" &&
        typeof obj.resolution.x === "number" &&
        typeof obj.imgId === "number" &&
        typeof obj.locationName === "string"
      ) {
        return true;
      } else return false;
    }
    if (!isValidObject(req.body)) {
      //missing information

      console.log("missing info");
      return res.status(400).send("Bad request: missing required params");
    }

    // NORMALIZE location:
    function normalize(coord, resolution) {
      return Math.floor((coord / resolution) * 100); // convert to percentage
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

    // --GETTING NORMALIZED USER CLICK:
    const userClick = (() => {
      // the client's resolution
      const clientRes = req.body.resolution;

      // where the user clicked, normalized
      const normalClickLoc = {
        x: normalize(clickX, clientRes.x),
        y: normalize(clickY, clientRes.y),
      };
      return normalClickLoc;
    })();
    console.log("user click: ", userClick);

    const locationName = req.body.locationName;

    // TODO: reduce mapped code
    // TODO: only take from locationName

    // where comparison occurs
    image.locations.map((location) => {
      // -- find the correct location to compare against --
      if (location.name !== locationName) {
        return false;
      }

      // ---- LOCATION normalized here ----
      const normalLoc = {
        x: normalize(location.x, image.resolution.x),
        y: normalize(location.y, image.resolution.y),
      };
      console.log("location value: ", normalLoc);

      // compare normalized locations data with normalized user click data
      if (compare(normalLoc, userClick)) {
        // location successfully matched
        console.log("success 2!");
        return res.send({ success: true });
      } else {
        // no location found
        res.send({ success: false });
      }
    });
  } catch (err) {
    console.error("error in click", err.message);
    return err;
  }
};

// function for comparison
function compare(location, click) {
  // TODO: instead of requiring exact, give 3% leeway
  if (compareRange(location.x, click.x) && compareRange(location.y, click.y)) {
    console.log("success!");
    return true;
  } else return false;
  //
}

function compareRange(x, y) {
  return Math.abs(x - y) <= 3;
}

// TODO:
// NORMALIZE FUNCTION NEEDS WORK.

module.exports = {
  images_get,
  image_get,
  click_post,
  //
};
