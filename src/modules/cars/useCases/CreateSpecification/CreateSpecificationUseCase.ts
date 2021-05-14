import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: SpecificationRepository) {}

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.specificationRepository.findByName(
            name
        );

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists");
        }

        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
