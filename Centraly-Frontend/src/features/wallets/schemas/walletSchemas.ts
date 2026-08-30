export enum WalletOperationType {
  CashIn = 1,
  CashOut = 2,
}

export interface WalletResponse {
  id: string;
  name: string;
  provider: string | null;
  balance: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateWalletRequest {
  name: string;
  provider: string | null;
  initialBalance: number;
}

export interface ProcessOperationRequest {
  walletId: string;
  operationType: WalletOperationType;
  transferredAmount: number;
  physicalCashAmount: number;
  notes: string | null;
}

export interface WalletOperationResponse {
  id: string;
  walletId: string;
  operationType: WalletOperationType;
  transferredAmount: number;
  physicalCashAmount: number;
  profit: number;
  drawerTransactionId: string | null;
  createdAt: string;
}
