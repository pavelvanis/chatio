const mongoose = require("mongoose");

module.exports = () => {
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
    await mongoose.connection.close();
    console.log("Mongoose DB was disconnected due to app termination...");
    process.exit(0);
  });
};
