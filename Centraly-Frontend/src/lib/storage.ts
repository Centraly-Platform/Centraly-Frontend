// Token is now stored in memory to prevent XSS attacks.
// Note: This means a full page refresh will require the user to log in again
// until HttpOnly cookies are implemented on the backend.
let memoryToken: string | null = null;

export const storage = {
  getToken: () => memoryToken,
  setToken: (token: string) => { memoryToken = token; },
  clearToken: () => { memoryToken = null; },
};
