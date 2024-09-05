import express from "express";
import { getMyProfile, login, logout, register } from "../Controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getMyProfile);

// router.put("/update/:id", updateUser);
// router.delete("/delete/:id", deleteUser);

export default router;
