const fs = require('fs');
let c = fs.readFileSync('src/features/maintenance/pages/MaintenancePage.tsx', 'utf8');

c = c.replace(
    /const \[statusFilter, setStatusFilter\] = useState<string>\(''\);/,
    "const [statusFilter, setStatusFilter] = useState<string>('');\n  const [searchValue, setSearchValue] = useState<string>('');"
);

c = c.replace(
    /status: statusFilter \|\| undefined,/,
    "status: statusFilter || undefined,\n    searchValue: searchValue || undefined,"
);

const searchInputStr = `      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
        <div className="flex bg-slate-100/70 p-1.5 rounded-xl w-fit">
          {(['', 'Pending', 'Delivered', 'Returned'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={\`px-4 py-2 rounded-lg text-sm font-medium transition-all \${
                statusFilter === s
                  ? 'bg-white text-blue-700 shadow-sm border border-gray-200/60'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }\`}
            >
              {s === '' ? 'الكل' : s === 'Pending' ? 'قيد الانتظار' : s === 'Delivered' ? 'تم التسليم' : 'مرتجع'}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="بحث باسم العميل أو رقم الهاتف..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>`;

c = c.replace(
    /\{\/\* Filters \*\/\}([\s\S]*?)<\/div>/,
    searchInputStr
);

fs.writeFileSync('src/features/maintenance/pages/MaintenancePage.tsx', c);
