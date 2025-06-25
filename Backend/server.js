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

const allowedOrigins = [
  "http://localhost:5173",
  "https://pass-op-frontend-ten.vercel.app"
];

app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

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
