import express from "express";
import logger from "morgan";
import cors from "cors"

import authRouter from "./routes/auth.route.js";
import movieRouter from "./routes/movie.route.js";
import db from "./config/db.js";

var app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(cors())

app.use(express.static("public"));
db();


app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);

// error handler
app.use(function (req, res) {
  res.status(404).send("Error to route");
});

export default app;
