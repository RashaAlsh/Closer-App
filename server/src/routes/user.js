import express from "express";
import { createUser } from "../controllers/createUser.js";
import { getUser } from "../controllers/getUser.js";
import { updateUser } from "../controllers/updateUser.js";
import { getUsers } from "../controllers/getUsers.js";
import { authUser } from "../controllers/authUser.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/sign-up", createUser);
userRouter.post("/sign-in", authUser);
userRouter.get("/:id", getUser);
userRouter.put("/update/:id", updateUser);

export default userRouter;
