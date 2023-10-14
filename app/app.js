import express from "express";
import dotenv from "dotenv";
import routes from "./routes.js";
import { globalErrorHandle, notFoundErrorHandle } from "./errors.js";
import middleware from "./middlewares.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middleware);
app.use(routes);
app.use(notFoundErrorHandle);
app.use(globalErrorHandle);

export default app;
