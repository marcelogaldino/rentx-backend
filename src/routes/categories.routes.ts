import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listCategoryController } from "../modules/cars/useCases/ListCategory";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoryController.handle(request, response);
});

export { categoriesRoutes };
