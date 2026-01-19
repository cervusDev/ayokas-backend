interface IList {
  id: number;
  name: string;
  price: string;
  active: boolean;
  duration: number;
}

export interface IListServiceUseCaseOutputData {
  list: IList[]
}

