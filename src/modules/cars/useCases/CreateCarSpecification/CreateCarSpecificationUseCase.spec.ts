import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
  })

  it("should not be able to add a new specification to a non-existent car", async () => {
    expect(async () => {
      const car_id = "123"
      const specifications_id = ["54321"]

      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toEqual(new AppError("Car does not exists!"))
  })

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category"
    })

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    })

    const specifications_id = [specification.id]

    const specificationCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })

    expect(specificationCars).toHaveProperty("specifications")
    expect(specificationCars.specifications.length).toBe(1)
  })
})