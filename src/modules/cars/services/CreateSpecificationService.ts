import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "../repositories/ISpecificationsRepository";

class CreateSpecificationService {
    constructor(private specificationRepositories: ISpecificationsRepository) {}
    execute({ name, description }: ICreateSpecificationDTO): void {
        const specificationAlreadyExists = this.specificationRepositories.findByName(
            name
        );

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists");
        }

        this.specificationRepositories.create({ name, description });
    }
}

export { CreateSpecificationService };
