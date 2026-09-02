const fs = require('fs');
let c = fs.readFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', 'utf8');

// Remove import
c = c.replace(/,\s*useDeleteMaintenance\s*/, '');
// Remove hook
c = c.replace(/\s*const\s*\{\s*mutate:\s*deleteTicket\s*\}\s*=\s*useDeleteMaintenance\(\);\s*/, '\n');
// Remove handleDelete function entirely
c = c.replace(/\s*const handleDelete = \(\) => \{[\s\S]*?\};\s*/, '\n');
// Remove delete button UI
c = c.replace(/<button[^>]*onClick=\{handleDelete\}[^>]*>[\s\S]*?<\/button>/, '');
// Fix trash icon import if it's unused (optional, leave it)

fs.writeFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', c);
