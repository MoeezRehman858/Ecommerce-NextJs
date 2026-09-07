const mongoose = require("mongoose");

const uri =
  "mongodb://moeez_dbUser:MDBatlas858@ac-ka52wv9-shard-00-00.ivaovfc.mongodb.net:27017/Ecommerce?tls=true&authSource=admin";

mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 10000,
    directConnection: true,
  })
  .then(() => {
    console.log("✅ DIRECT MONGODB CONNECTED");
    console.log("Database:", mongoose.connection.name);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ DIRECT CONNECTION FAILED");
    console.error(error);
    process.exit(1);
  });