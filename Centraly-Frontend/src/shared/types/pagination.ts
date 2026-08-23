export type SortDirection = 0 | 1;

export interface RequestFilters {
  pageNumber?: number;
  pageSize?: number;
  searchValue?: string;
  sortColumn?: string;
  sortDirection?: SortDirection;
  
  // Custom filters matching the backend RequestFilters.cs
  categoryId?: string;
  departmentId?: string;
  supplierId?: string;
  customerId?: string;
  customerPhone?: string;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedList<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
