import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50/50">
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <Loader2 className="animate-spin" size={32} />
        <span className="text-sm text-gray-700">جاري التحميل...</span>
      </div>
    </div>
  );
}
