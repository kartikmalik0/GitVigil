// types/commitSchedule.ts
import { z } from 'zod';

export const CommitScheduleSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'weekend', 'custom']),
  dayOfWeek: z.number().min(0).max(6).optional(),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  customDate: z.date().optional(),
});

export type CommitSchedule = z.infer<typeof CommitScheduleSchema>;