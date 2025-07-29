import express from "express";
import { sendOtp, verifyOtp } from "../controllers/authController";
import passport from "passport";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    // Redirect to frontend with token as query param
    const user = req.user as any;
    const token = user.token;
    res.redirect(`http://localhost:5173/welcome?token=${token}`);
  }
);

export default router;
