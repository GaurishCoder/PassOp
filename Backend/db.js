import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.set("bufferCommands", false);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
