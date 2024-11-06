'use server';

import { cookies } from 'next/headers'
import { setUser, getUser, deleteUser } from '@/lib/user';

/**
 * @typedef {import('@/lib/user').User} User
 */

/**
 * @param {User} user
 */
export async function setUserAction(user) {
  const cookieStore = await cookies();
  
  setUser(cookieStore, user);
}

/**
 * @returns {User}
 */
export async function getUserAction() {
  const cookieStore = await cookies();

  return getUser(cookieStore);
}

export async function deleteUserAction() {
  const cookieStore = await cookies();

  deleteUser(cookieStore);
}
