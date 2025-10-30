import { UTCDate } from '@date-fns/utc';
import { format, parseISO } from 'date-fns';

export class DateHelper {
  private readonly date: Date;

  constructor(date?: Date) {
    this.date = date ?? new UTCDate();
  }

  public static now(): DateHelper {
    return new DateHelper();
  }

  public static from(date: Date): DateHelper {
    return new DateHelper(date);
  }

  public static parse(date: string): DateHelper {
    return new DateHelper(parseISO(date));
  }

  public format(pattern = 'yyyy-MM-dd HH:mm:ss'): string {
    return format(this.date, pattern);
  }

  public toDate(): Date {
    return this.date;
  }

  public toISO(): string {
    return this.date.toISOString();
  }
}
