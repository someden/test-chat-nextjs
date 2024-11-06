'use server';

import { cookies } from 'next/headers'

/**
 * @typedef {object} User
 * @property {string} token
 * @property {string} username
 */

const usernameKey = 'username';
const tokenKey = 'token';
const maxAge = 30 * 24 * 60 * 60; // 30 days

/**
 * @param {User} user
 */
export async function setUser(user) {
  const cookieStore = await cookies();
  cookieStore.set(usernameKey, user.username);
  cookieStore.set({ name: tokenKey, value: user.token, maxAge, httpOnly: true });
}

export async function getUser() {
  const cookieStore = await cookies();
  const username = cookieStore.get(usernameKey)?.value;
  const token = cookieStore.get(tokenKey)?.value;
  const user = username && token ? { username, token } : null;

  return user;
}

export async function deleteUser() {
  const cookieStore = await cookies();
  cookieStore.delete(usernameKey);
  cookieStore.delete(tokenKey);
}
