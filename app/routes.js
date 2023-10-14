import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  return res.status(200).json({
    message: "Application is working...",
  });
});

export default router;
