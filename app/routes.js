import express from "express";
const router = express.Router();
import authRoutes from "./../routes/auth.js";

router.get("/", (_req, res) => {
  return res.status(200).json({
    message: "Application is working...",
  });
});

router.use("/api/v1/auth", authRoutes);

export default router;
