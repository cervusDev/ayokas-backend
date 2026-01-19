import { ListServiceeUseCase } from "application/usecases/service/list";

export interface IListServiceControllerAbastractFactory {
  makeListServiceUseCase(): ListServiceeUseCase;
}