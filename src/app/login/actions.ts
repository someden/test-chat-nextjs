'use server';

import { parseWithZod } from '@conform-to/zod';

import { loginRequestSchema, loginResponseSchema } from './schema';
import { redirect } from 'next/navigation';
import { setUserAction } from '@/actions/user';
import { type User } from '@/lib/user';

export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginRequestSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const response = await fetch('http://localhost:5001/api/v1/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submission.value),
  });

  console.log(response);

  if (response.status === 401) {
    return submission.reply({ formErrors: ['Wrong username or password'] });
  }

  const result = await response.json() as unknown;

  const user = loginResponseSchema.parse(result);

  await setUserAction(user);

  redirect('/');
}
