import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Spinner } from "./Spinner";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  pageIndex,
  totalPages,
  totalCount,
  pageSize,
  onNextPage,
  onPrevPage,
  onRowClick,
}: DataTableProps<T>) {
  const from = totalCount === 0 ? 0 : (pageIndex - 1) * pageSize + 1;
  const to = Math.min(pageIndex * pageSize, totalCount);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          {/* thead — bg-gray-50, text-gray-600 */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 font-semibold text-gray-600 text-sm whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* tbody — divide-y divide-gray-100, hover:bg-gray-50 */}
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Spinner size={16} />
                    جاري تحميل البيانات...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 text-sm">
                  لا توجد بيانات لعرضها
                </td>
              </tr>
            ) : (
              data.map((row, ri) => (
                <tr 
                  key={ri} 
                  className={`transition-colors ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : 'hover:bg-gray-50'}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col, ci) => (
                    <td key={ci} className="px-6 py-4">
                      {col.cell
                        ? col.cell(row)
                        : (row[col.accessorKey as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination — p-4, border-t border-gray-200 */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <span>
          إظهار {from} إلى {to} من أصل {totalCount} سجل
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPage}
            disabled={pageIndex <= 1 || isLoading}
            className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1 transition-colors"
          >
            <ChevronRight size={15} />
            السابق
          </button>
          <span className="px-3 py-1 border border-blue-600 bg-blue-50 text-blue-600 rounded-md font-semibold min-w-[60px] text-center">
            {pageIndex} / {totalPages || 1}
          </span>
          <button
            onClick={onNextPage}
            disabled={pageIndex >= totalPages || isLoading}
            className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1 transition-colors"
          >
            التالي
            <ChevronLeft size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
