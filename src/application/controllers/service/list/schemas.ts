import z from 'zod';

export const listServiceControllerResponseSchema = z.object({
  list: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.string(),
      active: z.boolean(),
      duration: z.number(),
    }),
  ),
});

export type ListServiceControllerResponse = z.infer<typeof listServiceControllerResponseSchema>;
