import { apiClient } from "@/lib/axios";
import { CreateOwnerTransactionRequest, OwnerTransactionResponse } from "../schemas/financeSchemas";

export class OwnerTransactionApi {
  async getOwnerTransactions(): Promise<OwnerTransactionResponse[]> {
    const { data } = await apiClient.get<OwnerTransactionResponse[]>('/OwnerTransaction');
    return data;
  }

  async createOwnerTransaction(reqData: CreateOwnerTransactionRequest): Promise<OwnerTransactionResponse> {
    const { data } = await apiClient.post<OwnerTransactionResponse>('/OwnerTransaction', reqData);
    return data;
  }
}

export const ownerTransactionApi = new OwnerTransactionApi();
