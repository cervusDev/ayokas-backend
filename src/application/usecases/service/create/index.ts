import { IUseCase } from "shared/interfaces/IUseCase";
import { ICreateServiceUseCaseInputData } from "./InputData";
import { ICreateServiceUseCaseAbstractFactory } from "./IAbstractFactory";
import { IServiceDatabaseRepository } from "@infra/database/repositories/service/IServiceDatabaseRepository";

export class CreateServiceeUseCase implements IUseCase<ICreateServiceUseCaseInputData, void> {
  private readonly sessionTypeRepository: IServiceDatabaseRepository;

  constructor(factory: ICreateServiceUseCaseAbstractFactory){
    this.sessionTypeRepository = factory.makeServiceRepository();
  }

  public async execute(inputData: ICreateServiceUseCaseInputData): Promise<void> {
    await this.sessionTypeRepository.create({
      name: inputData.name,
      price: inputData.price,
      active: inputData.active,
      duration: inputData.duration,
    })
  }
}