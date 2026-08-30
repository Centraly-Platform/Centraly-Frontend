import { apiClient } from "@/lib/axios";
import {
  WalletResponse,
  CreateWalletRequest,
  ProcessOperationRequest,
  WalletOperationResponse,
} from "../schemas/walletSchemas";

export class WalletApi {
  async getWallets(): Promise<WalletResponse[]> {
    const { data } = await apiClient.get<WalletResponse[]>("/wallets");
    return data;
  }

  async createWallet(reqData: CreateWalletRequest): Promise<WalletResponse> {
    const { data } = await apiClient.post<WalletResponse>("/wallets", reqData);
    return data;
  }

  async processOperation(reqData: ProcessOperationRequest): Promise<WalletOperationResponse> {
    const { data } = await apiClient.post<WalletOperationResponse>(`/wallets/${reqData.walletId}/operations`, reqData);
    return data;
  }
}

export const walletApi = new WalletApi();
