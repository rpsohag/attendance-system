import { addMinutes, isAfter } from "date-fns";
import AdminAttendance from "../models/AdminAttendance.js";
import errorResponse from "../utils/errorResponse.js";

export const getEnable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw errorResponse("Already Running", 400);
    }
    const attendance = new AdminAttendance({ timeLimit: 1 });
    await attendance.save();
    return res.status(200).json({
      message: "Attendance Successfully Started",
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

export const getStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw errorResponse("Not Running", 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }
    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};

export const getDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw errorResponse("Not Running", 400);
    }
    running.status = "COMPLETED";
    await running.save();
    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};
