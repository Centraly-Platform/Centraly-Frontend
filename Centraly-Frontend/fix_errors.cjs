const fs = require('fs');

let apiError = import axios from 'axios';

interface ApiErrorBody {
  code?: string;
  message?: string;
  description?: string;
}

const ERROR_TRANSLATIONS: Record<string, string> = {
  "Drawer.InsufficientFunds": "عفواً، لا يوجد رصيد كافٍ في الدرج لإتمام هذه المعاملة.",
  "Drawer.NoActiveSession": "لا توجد وردية مفتوحة للدرج. يرجى فتح وردية أولاً.",
  "Safe.InsufficientFunds": "عفواً، لا يوجد رصيد كافٍ في الخزينة.",
  "Transaction.SourceRequired": "يجب تحديد جهة الدفع (الخزينة أو الدرج).",
  "Drawer.AlreadyOpen": "يوجد وردية مفتوحة بالفعل للدرج.",
  "Drawer.InvalidAmount": "المبلغ غير صالح، يجب أن يكون أكبر من الصفر."
};

export function getApiErrorMessage(error: unknown, fallback = 'حدث خطأ غير متوقع'): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;
    
    if (data?.code && ERROR_TRANSLATIONS[data.code]) {
      return ERROR_TRANSLATIONS[data.code];
    }
    
    return data?.description || data?.message || fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
;
fs.writeFileSync('src/shared/utils/apiError.ts', apiError, 'utf8');

let financeHooks = fs.readFileSync('src/features/finance/hooks/useFinance.ts', 'utf8');
if (!financeHooks.includes('getApiErrorMessage')) {
    financeHooks = "import { getApiErrorMessage } from '@/shared/utils/apiError';\n" + financeHooks;
}
financeHooks = financeHooks.replace(/onError:\s*\(\)\s*=>\s*toast\.error\([^)]+\)/g, 'onError: (err) => toast.error(getApiErrorMessage(err))');
financeHooks = financeHooks.replace(/onError:\s*\(\)\s*=>\s*\{\s*toast\.error\([^)]+\);\s*\}/g, 'onError: (err) => { toast.error(getApiErrorMessage(err)); }');
fs.writeFileSync('src/features/finance/hooks/useFinance.ts', financeHooks, 'utf8');
