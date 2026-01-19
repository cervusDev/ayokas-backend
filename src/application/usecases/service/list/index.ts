import { IUseCase } from 'shared/interfaces/IUseCase';
import { IListServiceUseCaseOutputData } from './OutputData';
import { IListServiceUseCaseAbstractFactory } from './IAbstractFactory';
import { IServiceDatabaseRepository } from '@infra/database/repositories/service/IServiceDatabaseRepository';

export class ListServiceeUseCase implements IUseCase<unknown, IListServiceUseCaseOutputData> {
  private readonly sessionTypeRepository: IServiceDatabaseRepository;

  constructor(factory: IListServiceUseCaseAbstractFactory) {
    this.sessionTypeRepository = factory.makeServiceRepository();
  }

  public async execute(): Promise<IListServiceUseCaseOutputData> {
    const { list } = await this.sessionTypeRepository.list();
    const output: IListServiceUseCaseOutputData = {
      list: list.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        active: item.active,
        duration: item.duration,
      })),
    };

    return output;
  }
}
