const fs = require('fs');
let c1 = fs.readFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', 'utf8');
c1 = c1.replace(/import \{ isMaintenanceProduct \}, isMaintenanceProduct \} from '@\/features\/inventory\/schemas\/inventorySchemas';/, "import { isMaintenanceProduct } from '@/features/inventory/schemas/inventorySchemas';");
c1 = c1.replace(/import \{ isMaintenanceProduct \}\} from '@\/features\/inventory\/schemas\/inventorySchemas';/, "import { isMaintenanceProduct } from '@/features/inventory/schemas/inventorySchemas';");
c1 = c1.replace(/import \{ ProductUsageDto, isMaintenanceProduct \} \}, isMaintenanceProduct \} from '@\/features\/inventory\/schemas\/inventorySchemas';/, "import { isMaintenanceProduct } from '@/features/inventory/schemas/inventorySchemas';");
// Let's just do a clean replace:
c1 = c1.replace(/import \{.*\} from '@\/features\/inventory\/schemas\/inventorySchemas';/, "import { isMaintenanceProduct } from '@/features/inventory/schemas/inventorySchemas';");
fs.writeFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', c1);
