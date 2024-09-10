import express from "express";
import { populatePhoto } from "../controllers/photo.js";

const photoRouter = express.Router();

photoRouter.post("/", populatePhoto);

export default photoRouter;
