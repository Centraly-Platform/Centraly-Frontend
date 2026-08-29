export const storage = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),
  clearToken: () => localStorage.removeItem('token'),
  getPermissions: (): string[] => {
    const perms = localStorage.getItem('permissions');
    return perms ? JSON.parse(perms) : [];
  },
  setPermissions: (permissions: string[]) => localStorage.setItem('permissions', JSON.stringify(permissions)),
  clearPermissions: () => localStorage.removeItem('permissions'),
};
