import z from 'zod';

export const createServiceControllerBodySchema = z.object({
  name: z.string(),
  price: z.string(),
  active: z.boolean(),
  duration: z.number(),
});

export type CreateServiceControllerBody = z.infer<typeof createServiceControllerBodySchema>;
