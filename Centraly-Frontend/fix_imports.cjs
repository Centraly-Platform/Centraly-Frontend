const fs = require('fs');
let c1 = fs.readFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', 'utf8');
c1 = c1.replace(/Trash2,\s*/, '');
c1 = c1.replace(/ProductUsageDto\s*\}?/, 'isMaintenanceProduct }');
c1 = c1.replace(/import \{ \w*\} from '@\/features\/inventory\/schemas\/inventorySchemas';/, "import { isMaintenanceProduct } from '@/features/inventory/schemas/inventorySchemas';");
fs.writeFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', c1);

let c2 = fs.readFileSync('src/features/maintenance/components/MaintenanceProductPicker.tsx', 'utf8');
c2 = c2.replace(/ProductUsageDto\s*\}?/, 'isMaintenanceProduct }');
fs.writeFileSync('src/features/maintenance/components/MaintenanceProductPicker.tsx', c2);
