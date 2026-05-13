import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import dns from 'dns'
import path from "path";

import errorMiddleware from "./middlewares/errorMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";

const app = express();
const PORT = process.env.PORT || 4000;
dns.setServers(["1.1.1.1", "8.8.8.8"])
const __dirname = path.resolve();

console.log(__dirname);

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:5174",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Test API is working!");
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// middleware xử lý lỗi
app.use(notFoundMiddleware);

app.use(errorMiddleware);
  