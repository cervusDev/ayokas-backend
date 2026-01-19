import z from 'zod';

export const createTherapistControllerBodySchema = z.object({
  bio: z.string(),
  name: z.string(),
  specialty: z.string(),
  phone: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Número de telefone inválido'),
});

export type CreateTherapistControllerBody = z.infer<typeof createTherapistControllerBodySchema>;
