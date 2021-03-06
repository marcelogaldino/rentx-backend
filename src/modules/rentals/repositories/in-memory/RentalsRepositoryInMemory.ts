import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => car_id === rental.car_id && !rental.end_date)
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => user_id === rental.user_id && !rental.end_date)
  }

  async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date()
    })

    this.rentals.push(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => id === rental.id)
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => user_id === rental.user_id)
  }
}

export { RentalsRepositoryInMemory }