const mongoose = require("mongoose");
const config = require("./config/config.js");
const app = require("./app");

mongoose
  .connect(config.mongo_url)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(config.port, () =>
      console.log(`Server is listening on http://localhost:${config.port}`)
    );
  })
  .catch((err) => console.log(err));
