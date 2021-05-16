import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";
import { listSpecificationController } from "../modules/cars/useCases/ListSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
    createSpecificationController.handle(request, response);
});

specificationRoutes.get("/", (request, response) => {
    listSpecificationController.handle(request, response);
});

export { specificationRoutes };
