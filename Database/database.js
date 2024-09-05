import mongoose from "mongoose";

function connectDatabase() {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "backend" })
    .then((h) => {
      console.log("Database Connected Successfully...", h.connection.host);
    })
    .catch((e) => {
      console.log(e);
    });
}

export default connectDatabase;


