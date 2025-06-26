import mongoose from "mongoose";

async function connectDB() {
  try {
    let uri = process.env.MONGO_URI;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
