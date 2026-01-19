import z from 'zod';

export const createBookingControllerBodySchema = z.object({
  date: z.string(),
  clientId: z.number(),
  serviceId: z.number(),
  start_time: z.string(),
  therapistId: z.number(),
});

export type CreateBookingControllerBodySchema = z.infer<typeof createBookingControllerBodySchema>;
