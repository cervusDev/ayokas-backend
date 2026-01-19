import { IUseCase } from "shared/interfaces/IUseCase";
import { ICreateTherapistUseCaseInputData } from "./InputData";
import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";
import { ICreateTherapistUseCaseAbstractFactory } from "./IAbstractFactory";

export class CreateTherapistUseCase implements IUseCase<ICreateTherapistUseCaseInputData, void> {
  private readonly therapistRepository: ITherapistDatabaseRepository;

  constructor(factory: ICreateTherapistUseCaseAbstractFactory){
    this.therapistRepository = factory.makeTherapistRepository();
  }

  public async execute(inputData: ICreateTherapistUseCaseInputData): Promise<void> {
    await this.therapistRepository.create({
      active: true,
      bio: inputData.bio,
      name: inputData.name,
      phone: inputData.phone,
      specialty: inputData.specialty,
    })
  }
}