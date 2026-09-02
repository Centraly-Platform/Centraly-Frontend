const fs = require('fs');

function replaceInFile(path, oldStr, newStr) {
    if (fs.existsSync(path)) {
        let c = fs.readFileSync(path, 'utf8');
        c = c.replace(new RegExp(oldStr, 'g'), newStr);
        fs.writeFileSync(path, c);
    }
}

replaceInFile('src/features/maintenance/schemas/maintenanceSchemas.ts', 'MaintenanceProductItemDto', 'MaintenanceProductItemRequest');
replaceInFile('src/features/maintenance/components/MaintenanceProductPicker.tsx', 'MaintenanceProductItemDto', 'MaintenanceProductItemRequest');
replaceInFile('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', 'MaintenanceProductItemDto', 'MaintenanceProductItemRequest');
