import multer from "multer"
import { Router } from "express"

import uploadConfig from '@config/upload'

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController"
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController"
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureIsAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id", ensureAuthenticated, ensureIsAdmin, upload.array("images"), uploadCarImagesController.handle)

export { carsRoutes }