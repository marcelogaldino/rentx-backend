import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController"
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController"
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

carsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

export { carsRoutes }