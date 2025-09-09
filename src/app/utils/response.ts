import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: any = {},
  status: number = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  error: any = null,
  status: number = 500
) => {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
};
