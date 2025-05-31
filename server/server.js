import express from "express";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
  connectDb();
});
