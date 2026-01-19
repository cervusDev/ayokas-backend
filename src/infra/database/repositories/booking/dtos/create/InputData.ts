import { EBookingStatus } from "@infra/database/schema";

export interface ICreateBookingDatabaseRepositoryInputData {
  date: string;
  endTime: string;
  clientId: number;
  serviceId: number;
  startTime: string;
  therapistId: number;
  status: EBookingStatus;
}