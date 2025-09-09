import express, { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/response";
import { Admin } from "./admin.model";
import { envVars } from "../../config/env";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../middleware/verifyToken";

export const adminRoutes = express.Router();

adminRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
      return errorResponse(res, "No User", null, 404);
    }
    if (user.password !== password) {
      return errorResponse(res, "Incorrect password", null, 401);
    }
    if (user.role !== "admin") {
      return errorResponse(res, "This user not admin", null, 401);
    }
    const secret = envVars.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30d" });
    return successResponse(res, "user logged in", { token, user }, 200);
  } catch (error: any) {
    console.log("Login Error", error.message);
    return errorResponse(res, "Failed to Login", error.message, 500);
  }
});

adminRoutes.get(
  "/profile",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const user = await Admin.findById({_id: userId }).select("-password").lean();
      if (!user) {
        return errorResponse(res, "User not found", null, 404);
      }
      return successResponse(res, "User found", user, 200);
    } catch (error: any) {
      console.log(error);
      return errorResponse(res, "Something went wrong", null, 500);
    }
  }
);
