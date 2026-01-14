import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = db.connections[0].readyState === 1;
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb has been connected");
    });

    connection.on("error", (err) => {
      console.log(
        "There has been some error while connecting the database. Please make sure the database is up and running" +
          err
      );
    });
  } catch (error) {
    console.error("Something went rong while connecting to DB" + error);
    throw new Error("Failed to connect to database");
  }
};

export default connectDb;
