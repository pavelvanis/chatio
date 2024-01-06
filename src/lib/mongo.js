const mongoose = require("mongoose");

module.exports = (app) => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => {
      console.log("mongodb is connected...");
    })
    .catch((err) => {
      console.log(err);
    });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose db was connected...");
  });

  mongoose.connection.on("error", () => {
    console.log("Error in mongoose...");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose db was disconnected...");
  });

  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("Disconnected from mongo database");
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await mongoose.disconnect();
    console.log("Disconnected from mongo database");
    process.exit(0);
  });

  process.on("SIGQUIT", async () => {
    await mongoose.disconnect();
    console.log("Disconnected from mongo database");
    process.exit(0);
  });
};
