import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
  })

  it("should create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "123123",
      user_id: "123456",
      expected_return_date: dayAdd24hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another rental open with the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123123",
        user_id: "123456",
        expected_return_date: dayAdd24hours
      })

      await createRentalUseCase.execute({
        car_id: "123123",
        user_id: "123456",
        expected_return_date: dayAdd24hours
      })
    }).rejects.toBeInstanceOf(AppError)

  })

  it("should not be able to create a new rental if there is another rental open with the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "123",
        expected_return_date: dayAdd24hours
      })

      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "321",
        expected_return_date: dayAdd24hours
      })
    }).rejects.toBeInstanceOf(AppError)

  })

  it("should not be able to create a new rental with an invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "123",
        expected_return_date: dayAdd24hours
      })
    }).rejects.toBeInstanceOf(AppError)

  })
})