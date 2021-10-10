import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInmemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInmemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInmemory)
  })

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInmemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123456",
      expected_return_date: dayAdd24hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another rental open with the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "111111",
      expected_return_date: dayAdd24hours,
      user_id: "123456"
    })

    await expect(createRentalUseCase.execute({
      car_id: "123123",
      user_id: "123456",
      expected_return_date: dayAdd24hours
    })
    ).rejects.toEqual(new AppError("There is a rental in progress for this user!"))
  })

  it("should not be able to create a new rental if there is another rental open with the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24hours,
      user_id: "123456"
    })

    await expect(createRentalUseCase.execute({
      car_id: "test",
      user_id: "321",
      expected_return_date: dayAdd24hours
    })
    ).rejects.toEqual(new AppError("Car is unavailable!"))
  })

  it("should not be able to create a new rental with an invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      car_id: "test",
      user_id: "123",
      expected_return_date: dayjs().toDate()
    })
    ).rejects.toEqual(new AppError("Invalid return time!"))
  })
})