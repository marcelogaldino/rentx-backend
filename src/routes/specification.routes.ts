import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";

const specificationRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationRoutes.post("/", (request, response) => {
    createSpecificationController.handle(request, response);
});

specificationRoutes.get("/", (request, response) => {
    const specifications = specificationRepository.list();

    return response.json(specifications);
});

export { specificationRoutes };
