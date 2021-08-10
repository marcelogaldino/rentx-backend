import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController"
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController"
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureIsAdmin, createCarSpecificationController.handle)

export { carsRoutes }