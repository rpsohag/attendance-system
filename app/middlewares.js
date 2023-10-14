import express from "express";
import morgan from "morgan";

const middleware = express();

middleware.use(morgan("dev"));

export default middleware;
