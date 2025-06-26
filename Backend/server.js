import express from "express";
import dot from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import passwordRoutes from "./routes/password.route.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dot.config(); // always load env first
const Port = 3000;
const app = express();

const corsOption = {
  origin: [
    process.env.FRONTEND_URL,
    "https://pass-op-frontend-sable.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // ✅ fix key name
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.options("*", cors(corsOption)); // ✅ handle preflight requests

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => console.log(`DB Connection Successful`))
  .catch((err) => console.log(`${err}`));

app.use("/", passwordRoutes);
app.use("/user", userRoutes);

console.log("MONGO_URI:", process.env.MONGO_URI);

app.listen(Port, () => {
  console.log(`Server is listening at ${Port}`);
});
