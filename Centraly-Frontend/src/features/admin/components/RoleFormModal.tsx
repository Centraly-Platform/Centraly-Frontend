import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseModal } from '@/shared/components/ui/BaseModal';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Label } from '@/shared/components/ui/Label';
import { roleFormSchema, RoleFormData } from '../schemas/roleSchemas';
import { usePermissions, useRole, useCreateRole, useUpdateRole } from '../hooks/useRoles';

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleId?: string | null;
}

export function RoleFormModal({ isOpen, onClose, roleId }: RoleFormModalProps) {
  const { data: permissionsData = [] } = usePermissions();
  const { data: roleData, isLoading: isRoleLoading } = useRole(roleId || '');
  
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const [groupedPermissions, setGroupedPermissions] = useState<Record<string, string[]>>({});

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: { name: '', permissions: [] }
  });

  useEffect(() => {
    // Group permissions by prefix (e.g., 'sales:read' -> group 'sales')
    const grouped = permissionsData.reduce((acc, perm) => {
      const [group] = perm.split(':');
      if (!acc[group]) acc[group] = [];
      acc[group].push(perm);
      return acc;
    }, {} as Record<string, string[]>);
    setGroupedPermissions(grouped);
  }, [permissionsData]);

  useEffect(() => {
    if (roleData && roleId) {
      reset({
        name: roleData.name,
        permissions: roleData.permissions
      });
    } else {
      reset({ name: '', permissions: [] });
    }
  }, [roleData, roleId, reset]);

  const onSubmit = (data: RoleFormData) => {
    if (roleId) {
      updateMutation.mutate({ id: roleId, request: data }, {
        onSuccess: () => onClose()
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => onClose()
      });
    }
  };

  const footer = (
    <div className="flex justify-end gap-2" dir="rtl">
      <Button type="button" variant="outline" onClick={onClose}>Ø¥Ù„ØºØ§Ø¡</Button>
      <Button type="button" onClick={handleSubmit(onSubmit)} disabled={createMutation.isPending || updateMutation.isPending}>
        Ø­ÙØ¸
      </Button>
    </div>
  );

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose}
      title={roleId ? 'ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±' : 'Ø¥Ø¶Ø§ÙØ© Ø¯ÙˆØ± Ø¬Ø¯ÙŠØ¯'}
      size="2xl"
      footer={footer}
    >
        {isRoleLoading ? (
          <div className="py-8 text-center">Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</div>
        ) : (
          <form id="role-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4" dir="rtl">
            <div className="space-y-2">
              <Label>Ø§Ø³Ù… Ø§Ù„Ø¯ÙˆØ±</Label>
              <Input {...register('name')} placeholder="Ù…Ø«Ø§Ù„: Ù…Ø¯ÙŠØ± Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold border-b pb-2 block">Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ§Øª</Label>
              {errors.permissions && <p className="text-red-500 text-sm">{errors.permissions.message}</p>}
              
              <Controller
                name="permissions"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(groupedPermissions).map(([group, perms]) => (
                      <div key={group} className="bg-slate-50 p-4 rounded-lg border">
                        <h4 className="font-bold text-slate-700 capitalize mb-3">{group}</h4>
                        <div className="space-y-2">
                          {perms.map(perm => {
                            const isChecked = field.value.includes(perm);
                            return (
                              <div key={perm} className="flex items-center gap-2">
                                <input 
                                  type="checkbox"
                                  id={perm} 
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      field.onChange([...field.value, perm]);
                                    } else {
                                      field.onChange(field.value.filter(p => p !== perm));
                                    }
                                  }}
                                  className="rounded border-gray-300 w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor={perm} className="cursor-pointer font-normal text-sm">
                                  {perm}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </form>
        )}
    </BaseModal>
  );
}

