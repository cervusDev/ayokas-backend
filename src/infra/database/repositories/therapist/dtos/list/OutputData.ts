interface IList {
  id: number;
  name: string;
  phone: string;
  specialty: string;
  bio: string | null;
}

export interface IListTherapistDatabaseRepositoryOutputData {
  list: IList[];
}
