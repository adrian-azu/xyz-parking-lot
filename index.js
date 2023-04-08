const express = require("express");
const parser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(parser.json());

app.use(require("./src/routes"));
app.route("/").get((req, res) => {
  return res.json({ message: "XYZ PARKING LOT SYSTEM" });
});

app.listen(3000, () => {
  console.log("SERVER STARTED AT http://localhost:3000");
});
