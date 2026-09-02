const fs = require('fs');

let c = fs.readFileSync('src/features/inventory/schemas/inventorySchemas.ts', 'utf8');
if (!c.includes('isMaintenanceProduct')) {
    c += `\nexport function isMaintenanceProduct(usage?: ProductUsageDto): boolean {
  return usage === ProductUsageDto.MaintenanceOnly || usage === ProductUsageDto.SaleAndMaintenance;
}\n`;
    fs.writeFileSync('src/features/inventory/schemas/inventorySchemas.ts', c);
}

function replaceUsage(file) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/p\.usage === ProductUsageDto\.MaintenanceOnly \|\| p\.usage === ProductUsageDto\.SaleAndMaintenance/g, 'isMaintenanceProduct(p.usage)');
        if (content.includes('isMaintenanceProduct') && !content.includes('import { isMaintenanceProduct')) {
            content = content.replace(/import \{ ProductUsageDto \} from '@\/features\/inventory\/schemas\/inventorySchemas';/, "import { ProductUsageDto, isMaintenanceProduct } from '@/features/inventory/schemas/inventorySchemas';");
        }
        fs.writeFileSync(file, content);
    }
}

replaceUsage('src/features/maintenance/components/MaintenanceDetailDrawer.tsx');
replaceUsage('src/features/maintenance/components/MaintenanceProductPicker.tsx');
