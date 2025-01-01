import express from "express";
import {handleCreateUser, handleLogin, handleUpdateUser} from "../controllers/user_controller";

const router = express.Router();

router.post("/users", handleCreateUser);
router.post("/login", handleLogin);
router.put("/users/:id", handleUpdateUser);

export default router;
