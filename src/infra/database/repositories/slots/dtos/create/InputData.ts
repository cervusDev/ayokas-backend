interface ISlot {
  start: string;
  end: string;
};

export interface ICreatSlotsDatabaseRepositoryInputData {
  date: string;
  slots: ISlot[];
  booked: boolean;
  therapistId: number;
}