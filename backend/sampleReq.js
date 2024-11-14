//

try {
  const JSONdata = {
    x: 1,
    y: 2,
  };

  // run the req, log result
  const run = (async () => {
    const URLstring = "http://localhost:2000/images/test";

    console.log(URLstring);
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
