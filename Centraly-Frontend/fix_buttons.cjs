const fs = require('fs');
let c = fs.readFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', 'utf8');

c = c.replace(
    /const \{ register, control, handleSubmit, reset, watch \} = useForm<UpdateMaintenanceRequest>\(\{/,
    'const { register, control, handleSubmit, reset, watch, formState: { isDirty } } = useForm<UpdateMaintenanceRequest>({'
);

c = c.replace(
    /disabled=\{isUpdating\}/,
    'disabled={isUpdating || !isDirty || isDelivering || isReturning}'
);

c = c.replace(
    /disabled=\{isReturning\}/,
    'disabled={isReturning || isDirty || isUpdating || isDelivering} title={isDirty ? "يجب حفظ التعديلات أولا" : ""}'
);

c = c.replace(
    /disabled=\{isDelivering\}/,
    'disabled={isDelivering || isDirty || isUpdating || isReturning} title={isDirty ? "يجب حفظ التعديلات أولا" : ""}'
);

fs.writeFileSync('src/features/maintenance/components/MaintenanceDetailDrawer.tsx', c);
