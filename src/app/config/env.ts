import dotenv from "dotenv";

dotenv.config();

export const envVars = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
