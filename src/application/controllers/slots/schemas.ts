import z from 'zod';

export const createSlotsControllerBodySchema = z.object({
  date: z.string(),
  endTime: z.string(),
  startTime: z.string(),
  therapistId: z.number(),
});

export type CreateSlotsControllerBodySchema = z.infer<typeof createSlotsControllerBodySchema>;
