import z from 'zod';

export const createClientControllerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  phone: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Número de telefone inválido'),
});

export type CreateClientControllerBodySchema = z.infer<typeof createClientControllerBodySchema>;
