import express from "express";
import { configDotenv } from "dotenv";
import { errorMiddlewares } from "./middlewares/error.js";
import userRoute from "./Routes/userRoute.js";
import taskRoute from "./Routes/taskRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

configDotenv({ path: ".env" });

export const app = express();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());

// Using Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", taskRoute);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Nice Working...");
});

// Using error middlewares
app.use(errorMiddlewares);
