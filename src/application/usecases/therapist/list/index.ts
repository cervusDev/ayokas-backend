import { IUseCase } from 'shared/interfaces/IUseCase';
import { parseToBoolean } from 'shared/helper/boolean';
import { IListTherapistUseCaseInputData } from './InputData';
import { IListTherapistUseCaseOutputData } from './OutputData';
import { IListTherapistUseCaseAbstractFactory } from './IAbstractFactory';
import { ITherapistDatabaseRepository } from '@infra/database/repositories/therapist/ITherapistDatabaseRepository';

export class ListTherapistUseCase
  implements IUseCase<IListTherapistUseCaseInputData, IListTherapistUseCaseOutputData>
{
  private readonly therapistRepository: ITherapistDatabaseRepository;

  constructor(factory: IListTherapistUseCaseAbstractFactory) {
    this.therapistRepository = factory.makeTherapistRepository();
  }

  public async execute(
    inputData: IListTherapistUseCaseInputData,
  ): Promise<IListTherapistUseCaseOutputData> {
    const therapists = await this.therapistRepository.list({
      active: parseToBoolean(inputData.active),
    });

    const output: IListTherapistUseCaseOutputData = {
      list: therapists.list.map((therapist) => ({
        id: therapist.id,
        bio: therapist.bio,
        name: therapist.name,
        phone: therapist.phone,
        specialty: therapist.specialty,
      })),
    };

    return output;
  }
}
