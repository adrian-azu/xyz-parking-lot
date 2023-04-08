const express = require("express");
const parser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(parser.json());

app.use(require("./src/routes"));
app.route("/").get((req, res) => {
  const test = app._router.stack.map(print.bind(null, []));
  return res.json(test);
});

app.listen(3000, () => {
  console.log("SERVER STARTED AT http://localhost:3000");
});
function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
  } else if (layer.method) {
    console.log("%s /%s", layer.method.toUpperCase(), path.concat(split(layer.regexp)).filter(Boolean).join("/"));
    console.log(layer.method.toUpperCase());
    return { METHODS: layer.method.toUpperCase(), PATH: path.concat(split(layer.regexp)).filter(Boolean).join("/") };
  }
}

function split(thing) {
  if (typeof thing === "string") {
    return thing.split("/");
  } else if (thing.fast_slash) {
    return "";
  } else {
    var match = thing
      .toString()
      .replace("\\/?", "")
      .replace("(?=\\/|$)", "$")
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match ? match[1].replace(/\\(.)/g, "$1").split("/") : "<complex:" + thing.toString() + ">";
  }
}
