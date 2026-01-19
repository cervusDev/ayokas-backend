import z from 'zod';

export const listTherapistControllerQuerySchema = z.object({
  active: z.string().optional()
});

export type ListTherapistControllerQuery = z.infer<typeof listTherapistControllerQuerySchema>;

export const listTherapistControllerResponseSchema = z.object({
  list: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      phone: z.string(),
      specialty: z.string(),
      bio: z.string().nullable(),
    }),
  ),
});

export type ListTherapistControllerResponse = z.infer<typeof listTherapistControllerResponseSchema>;
