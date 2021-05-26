import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specification: Specification[];

  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.specification = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specification.push(specification);
  }

  async findByName(name: string): Promise<boolean> {
    const findSpecification = this.specification.some(
      (specification) => specification.name === name
    );
    return findSpecification;
  }

  async list(): Promise<Specification[]> {
    return this.specification;
  }
}

export { SpecificationsRepository };
