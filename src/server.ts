import { Server } from "http";
import { envVars } from "./app/config/env";
import mongoose from "mongoose";
import app from "./app";

const port = envVars.PORT;

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`${envVars.DB_URL}`);
    console.log("Server Connected to KE Server!");
    server = app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
