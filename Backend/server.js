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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin:"https://pass-op-frontend-ten.vercel.app/", 
  credentials: true               
}));


app.use(cookieParser());
app.use("/", passwordRoutes);
app.use("/user" , userRoutes);


connectDB()
.then(() => console.log(`DB Connection Successfull`))
.catch((err) => console.log(`${err}`));


app.listen(Port, () => {
  console.log(`Server is listing at ${Port}`);
});
