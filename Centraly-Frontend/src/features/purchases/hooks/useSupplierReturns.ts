import { useQuery, useMutation } from '@tanstack/react-query';
import { supplierReturnRepository } from '../api/SupplierReturnApi';
import { SupplierReturnFilters, CreateSupplierReturnRequest } from '../schemas/supplierReturnSchemas';

export function useSupplierReturns(filters: SupplierReturnFilters) {
  return useQuery({
    queryKey: ['supplier-returns', filters],
    queryFn: () => supplierReturnRepository.getReturns(filters),
  });
}

export function useSupplierReturn(id: string) {
  return useQuery({
    queryKey: ['supplier-returns', id],
    queryFn: () => supplierReturnRepository.getReturn(id),
    enabled: !!id,
  });
}

export function useCreateSupplierReturn() {
  return useMutation({
    mutationFn: (data: CreateSupplierReturnRequest) => supplierReturnRepository.createReturn(data),
  });
}
