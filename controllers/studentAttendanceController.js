import { addMinutes, isAfter } from "date-fns";
import StudentAttendance from "../models/StudentAttendance.js";
import errorResponse from "../utils/errorResponse.js";
import AdminAttendance from "../models/AdminAttendance.js";

export const getStatus = async (req, res, next) => {
  try {
    const running = await StudentAttendance.findOne({ status: "RUNNING" });
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

export const sendAttend = async (req, res, next) => {
  const { id } = req.params;

  try {
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw errorResponse("invalid attendance id", 400);
    }
    if (adminAttendance.status == "COMPLETED") {
      throw errorResponse("Attendance already completed");
    }
    let attendance = new StudentAttendance({
      adminAttendance: id,
      user: req.user._id,
    });
    if (attendance) {
      throw errorResponse("Already register", 400);
    }
    await attendance.save();
    return res.status(203).json(attendance);
  } catch (error) {
    next(error);
  }
};
