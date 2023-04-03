import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {  getAllMovieController,getOneMovieController } from "../controllers/movie.controller.js";

const router = express.Router();

// get all movies
router.get("/all",authMiddleware, getAllMovieController);

// get one movie
router.get("/:id",authMiddleware, getOneMovieController);

export default router;
