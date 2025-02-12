import { z } from 'zod';

const usernameSceema = z.string().min(3).max(20);

export const loginRequestSchema = z.object({
  username: usernameSceema,
  password: z.string().min(4),
});

export const loginResponseSchema = z.object({
  token: z.string(),
  username: usernameSceema,
});
