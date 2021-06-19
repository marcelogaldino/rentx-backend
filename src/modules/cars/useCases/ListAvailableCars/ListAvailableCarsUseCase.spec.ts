import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("shlould be able to list all availables cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car 1",
      category_id: "category_id",
      daily_rate: 70.00,
      description: "Car description",
      fine_amount: 50,
      license_plate: "CAB-213",
      name: "Car"
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to list all availables car by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car 2",
      category_id: "category_id",
      daily_rate: 70.00,
      description: "Car description",
      fine_amount: 50,
      license_plate: "CAB-213",
      name: "Car"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car 2",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all availables car by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car 3 teste",
      category_id: "category_id",
      daily_rate: 70.00,
      description: "Car description",
      fine_amount: 50,
      license_plate: "CAB-345",
      name: "Car 3"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 3",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all availables car by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car 3 teste",
      category_id: "123456",
      daily_rate: 70.00,
      description: "Car description",
      fine_amount: 50,
      license_plate: "CAB-345",
      name: "Car 3"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456",
    })

    expect(cars).toEqual([car])
  })
})