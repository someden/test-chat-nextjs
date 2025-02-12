import { type UnsafeUnwrappedCookies } from "next/headers";

export type User = {
  token: string;
  username: string;
}

const usernameKey = 'username';
const tokenKey = 'token';
const maxAge = 30 * 24 * 60 * 60; // 30 days

export function setUser(cookieStore: UnsafeUnwrappedCookies, user: User) {
  cookieStore.set(usernameKey, user.username);
  cookieStore.set({ name: tokenKey, value: user.token, maxAge, httpOnly: true });
}

export function getUser(cookieStore: Omit<UnsafeUnwrappedCookies, 'set' | 'delete'>) {
  const username = cookieStore.get(usernameKey)?.value;
  const token = cookieStore.get(tokenKey)?.value;
  const user = username && token ? { username, token } : null;

  return user;
}

export function deleteUser(cookieStore: UnsafeUnwrappedCookies) {
  cookieStore.delete(usernameKey);
  cookieStore.delete(tokenKey);
}
