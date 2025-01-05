const path = require("node:path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/index"));

app.listen(process.env.PORT, () => {
  console.log(
    `Server started successfully http://127.0.0.1:${process.env.PORT}`
  );
  console.log(`Environment: ${process.env.ENV}`);
});
