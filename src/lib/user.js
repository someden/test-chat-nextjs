/**
 * @typedef {import('next/headers').UnsafeUnwrappedCookies} Cookies
 */

/**
 * @typedef {object} User
 * @property {string} token
 * @property {string} username
 */

const usernameKey = 'username';
const tokenKey = 'token';
const maxAge = 30 * 24 * 60 * 60; // 30 days

/**
 * @param {Cookies} cookieStore
 * @param {User} user
 */
export function setUser(cookieStore, user) {
  cookieStore.set(usernameKey, user.username);
  cookieStore.set({ name: tokenKey, value: user.token, maxAge, httpOnly: true });
}

/**
 * @param {Cookies} cookieStore
 * @returns {User}
 */
export function getUser(cookieStore) {
  const username = cookieStore.get(usernameKey)?.value;
  const token = cookieStore.get(tokenKey)?.value;
  const user = username && token ? { username, token } : null;

  return user;
}

/**
 * @param {Cookies} cookieStore
 */
export function deleteUser(cookieStore) {
  cookieStore.delete(usernameKey);
  cookieStore.delete(tokenKey);
}
