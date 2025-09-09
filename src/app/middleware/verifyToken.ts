import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { envVars } from "../config/env";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return errorResponse(res, "No Token Provided", null, 401);
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, envVars.JWT_SECRET as string, (err, decoded: any) => {
    if (err) {
      return errorResponse(res, "Invalid Token", null, 403);
    }
    (req as any).userId = decoded.id;
    next();
  });
};
