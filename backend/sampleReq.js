//

try {
  const JSONdata = {
    click: {
      x: 101,
      y: 101,
    },
    resolution: {
      x: 1000,
      y: 1000,
    },
    imageId: 1,
  };

  // run the req, log result
  const run = (async () => {
    const URLstring = "http://localhost:2000/images/click";
    console.log("running test... ");
    const result = await fetch(URLstring, {
      method: "POST",
      body: JSON.stringify(JSONdata),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("complete. ");
    console.log(result.status, result.statusText);
    console.log("reached end", result);
  })();
} catch (err) {
  console.error(err, err.message);
}
