interface IFilter {
  date?: string;
  booked?: boolean;
  therapistId: number;
}

export interface IListSlotsDatabaseRepositoryInputData {
  filter: IFilter
}