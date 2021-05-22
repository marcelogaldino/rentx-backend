import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private specification: Specification[];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specification = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specification.push(specification);
  }

  findByName(name: string): boolean {
    const findSpecification = this.specification.some(
      (specification) => specification.name === name
    );
    return findSpecification;
  }

  list(): Specification[] {
    return this.specification;
  }
}

export { SpecificationRepository };
