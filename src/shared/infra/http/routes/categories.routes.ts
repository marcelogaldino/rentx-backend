import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/ImportCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/ListCategory/ListCategoryController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post(
  "/upload",
  ensureAuthenticated,
  ensureIsAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
