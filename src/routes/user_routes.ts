import express from "express";
import {handleCreateUser, handleLogin, handleUpdateUser} from "../controllers/user_controller";

const router = express.Router();

router.post("/", handleCreateUser);
router.post("/login", handleLogin);
router.put("/:id", handleUpdateUser);

export default router;
