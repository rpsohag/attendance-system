import express from "express";
import {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  patchUserById,
  deleteUserById,
} from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

router.use(authenticate);

router.get("/:userId", getUserById);
router.put("/:userId", updateUserById);
router.patch("/:userId", patchUserById);
router.delete("/:userId", deleteUserById);
router.get("/", getAllUser);
router.post("/create", createUser);

export default router;
