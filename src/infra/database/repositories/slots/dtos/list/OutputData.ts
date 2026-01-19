interface ITherapist {
  id: number | undefined;
  name: string | undefined;
  phone: string | undefined;
}

interface IList {
  date: string;
  booked: boolean;
  endTime: string;
  startTime: string;
}

export interface IListSlotsDatabaseRepositoryOutputData {
  list: IList[],
  therapist: ITherapist
}