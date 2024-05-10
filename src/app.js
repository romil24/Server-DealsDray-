import express from "express";
import { Model } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import AdminRouter from "./routes/Admin.routes.js";

app.use("/api/v1/admin", AdminRouter);
export { app };
