import bcrypt from 'bcryptjs';
import { IUseCase } from 'shared/interfaces/IUseCase';
import { ICreateClientUseCaseInputData } from './InputData';
import { ICreateClientUseCaseAbstractFactory } from './IAbstractFactory';
import { IClienteDatabaseRepository } from '@infra/database/repositories/client/IClientDatabaseRepository';

export class CreateClientUseCase implements IUseCase<ICreateClientUseCaseInputData, void> {
  private readonly clientRepository: IClienteDatabaseRepository;

  constructor(factory: ICreateClientUseCaseAbstractFactory) {
    this.clientRepository = factory.makeClientRepository();
  }

  public async execute(inputData: ICreateClientUseCaseInputData): Promise<void> {
    const client = await this.clientRepository.findByPhone({ phone: inputData.phone });

    if (client.id) {
      throw new Error('Cliente já existe');
    }

    const hashPassword = await bcrypt.hash(inputData.password, 12);

    await this.clientRepository.create({
      name: inputData.name,
      password: hashPassword,
      phone: inputData.phone,
      email: inputData.email,
    });
  }
}
