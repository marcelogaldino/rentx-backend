import "reflect-metadata"
import express, { NextFunction, Request, request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import "@shared/container";

import createConnection from "@shared/infra/typeorm"

import { AppError } from "../../errors/AppError";
import { routes } from "@shared/infra/http/routes";
import swaggerFile from "../../../swagger.json";

createConnection()
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

// app.get("/", (request, response) => {
//   return response.json({ message: "Hello" });
// });

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal Server Error: ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("server is running 🚀️"));
