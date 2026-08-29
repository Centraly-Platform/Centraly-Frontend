export const Permissions = {
  InventoryRead: 'inventory:read',
  InventoryWrite: 'inventory:write',
  SalesRead: 'sales:read',
  SalesWrite: 'sales:write',
  PurchasesRead: 'purchases:read',
  PurchasesWrite: 'purchases:write',
  ContactsRead: 'contacts:read',
  ContactsWrite: 'contacts:write',
  FinanceRead: 'finance:read',
  FinanceWrite: 'finance:write',
  Admin: 'admin',
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

/** Temporary full set until login response includes permissions. */
export const DEFAULT_AUTHENTICATED_PERMISSIONS: Permission[] = [
  Permissions.InventoryRead,
  Permissions.InventoryWrite,
  Permissions.SalesRead,
  Permissions.SalesWrite,
  Permissions.PurchasesRead,
  Permissions.PurchasesWrite,
  Permissions.ContactsRead,
  Permissions.ContactsWrite,
  Permissions.FinanceRead,
  Permissions.FinanceWrite,
];
