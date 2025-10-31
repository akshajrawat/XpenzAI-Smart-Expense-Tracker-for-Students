import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
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
    console.log("Something went rong while connecting to DB");
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
