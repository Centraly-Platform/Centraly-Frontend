const fs = require('fs');
let c = fs.readFileSync('src/features/maintenance/api/MaintenanceApi.ts', 'utf8');
c = c.replace(/cancelMaintenance/g, 'returnMaintenance');
fs.writeFileSync('src/features/maintenance/api/MaintenanceApi.ts', c);

let q = fs.readFileSync('src/features/maintenance/api/queries.ts', 'utf8');
q = q.replace(/cancelMaintenance/g, 'returnMaintenance');
fs.writeFileSync('src/features/maintenance/api/queries.ts', q);
