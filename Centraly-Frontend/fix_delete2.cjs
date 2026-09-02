const fs = require('fs');

let q = fs.readFileSync('src/features/maintenance/api/queries.ts', 'utf8');
q = q.replace(/export function useDeleteMaintenance\(\) \{[\s\S]*?\}\n/g, '');
q = q.replace(/,\s*deleteMaintenance\s*/, ''); // from import
fs.writeFileSync('src/features/maintenance/api/queries.ts', q);

let api = fs.readFileSync('src/features/maintenance/api/MaintenanceApi.ts', 'utf8');
api = api.replace(/\s*async deleteMaintenance\(id: string\): Promise<void> \{[\s\S]*?\}\n/, '\n');
fs.writeFileSync('src/features/maintenance/api/MaintenanceApi.ts', api);
