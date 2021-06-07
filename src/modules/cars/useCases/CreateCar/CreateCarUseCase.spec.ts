import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category"
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with a existent license_plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Car Brand",
        category_id: "category"
      })

      await createCarUseCase.execute({
        name: "Name Car2",
        description: "Description Car2",
        daily_rate: 1000,
        license_plate: "ABC-1234",
        fine_amount: 600,
        brand: "Car2 Brand",
        category_id: "category2"
      })
    })
  })

  it("should not be able to create a car with available true as default", () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Car Brand",
        category_id: "category"
      })

      expect(car.available).toBe(true)
    })
  })
})