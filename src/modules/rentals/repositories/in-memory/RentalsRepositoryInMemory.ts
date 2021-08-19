import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => car_id === rental.car_id && rental.end_date === null)
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => user_id === rental.user_id)
  }

}

export { RentalsRepositoryInMemory }