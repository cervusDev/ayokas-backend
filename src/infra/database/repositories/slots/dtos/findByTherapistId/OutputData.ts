interface IList {
  id: number;
  date: string;
  booked: boolean;
  endTime: string;
  startTime: string;
}

export interface IFindByDatabaseRepositoryOutputData {
  list: IList[];
}
