'use server';

import { parseWithZod } from '@conform-to/zod';

import { loginSchema } from './schema';
import { redirect } from 'next/navigation';
import { setUserAction } from '@/actions/user';

/**
 * @typedef {import('@/lib/user').User} User
 */

export async function login(prevState, formData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
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

  /**
   * @type {User}
   */
  const result = await response.json();

  if (result.statusCode === 401) {
    return submission.reply({ formErrors: ['Wrong username or password'] });
  }

  await setUserAction(result);

  redirect('/');
}
