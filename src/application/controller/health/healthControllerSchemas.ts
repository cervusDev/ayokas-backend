import { z } from 'zod';

export const healthControllerSchemaResponse = z.object({
  status: z.string(),
  timestamp: z.string(),
});

export type HealthControllerSchemaResponse = z.infer<
  typeof healthControllerSchemaResponse
>;
