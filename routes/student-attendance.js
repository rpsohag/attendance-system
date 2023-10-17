import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  sendAttend,
  getStatus,
} from "../controllers/studentAttendanceController.js";
const router = express.Router();

router.use(authenticate);
router.get("/status", getStatus);
router.get("/:id", sendAttend);

export default router;
