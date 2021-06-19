import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/ListSpecification/ListSpecificationController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createSpecificationController.handle);

specificationRoutes.get("/", ensureAuthenticated, ensureIsAdmin, listSpecificationController.handle);

export { specificationRoutes };
