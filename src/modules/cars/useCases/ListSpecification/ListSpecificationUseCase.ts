import { Specification } from "../../entities/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";

class ListSpecificationUseCase {
  constructor(private specificationRepository: SpecificationRepository) {}
  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationUseCase };
