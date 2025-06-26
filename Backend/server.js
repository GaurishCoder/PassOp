import express from "express";
import dot from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import passwordRoutes from "./routes/password.route.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const Port = 3000;
const app = express();
dot.config();


app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});
const corsOption={
  origin:process.env.FRONTEND_URL,
  credentials:true,
  allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOption));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", passwordRoutes);
app.use("/user", userRoutes);

connectDB()
  .then(() => console.log(`DB Connection Successful`))
  .catch((err) => console.log(`${err}`));

app.listen(Port, () => {
  console.log(`Server is listening at ${Port}`);
});
