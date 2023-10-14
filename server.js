import express from "express";
import dotenv from "dotenv";
import http from "http";
import mongoDBConnection from "./database/config.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5050;

mongoDBConnection(process.env.MONGODB_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Application server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
