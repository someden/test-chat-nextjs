'use server';

import { cookies } from 'next/headers'
import { type User, setUser, getUser, deleteUser } from '@/lib/user';

export async function setUserAction(user: User) {
  const cookieStore = await cookies();
  
  setUser(cookieStore, user);
}

export async function getUserAction() {
  const cookieStore = await cookies();

  return getUser(cookieStore);
}

export async function deleteUserAction() {
  const cookieStore = await cookies();

  deleteUser(cookieStore);
}
