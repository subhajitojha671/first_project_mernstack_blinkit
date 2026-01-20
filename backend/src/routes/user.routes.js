import {Router} from "express";
import { registerUser, verifyOtp ,getCurrentUser, logoutUser ,refreshAccessToken } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-otp").post(verifyOtp);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-access-token").post(refreshAccessToken);
export default router;