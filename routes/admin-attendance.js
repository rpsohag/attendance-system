import express from "express";
import {
  getDisable,
  getEnable,
  getStatus,
} from "../controllers/adminAttendanceController.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

router.use(authenticate);
router.get("/enable", getEnable);
router.get("/disable", getDisable);
router.get("/status", getStatus);

export default router;
