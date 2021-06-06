import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: SpecificationsRepository
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name
    );

    console.log(specificationAlreadyExists);

    if (specificationAlreadyExists) {
      console.log("Caiu no throw");
      throw new AppError("Specification already exists");
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
