import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseModal } from '@/shared/components/ui/BaseModal';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Label } from '@/shared/components/ui/Label';
import { userFormSchema, UserFormData } from '../schemas/userSchemas';
import { useUser, useCreateUser, useUpdateUser } from '../hooks/useUsers';
import { useRoles } from '../hooks/useRoles';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string | null;
}

export function UserFormModal({ isOpen, onClose, userId }: UserFormModalProps) {
  const { data: userData, isLoading: isUserLoading } = useUser(userId || '');
  const { data: rolesData = [] } = useRoles(false); // Only active roles
  
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { username: '', password: '', roles: [] }
  });

  useEffect(() => {
    if (userData && userId) {
      reset({
        username: userData.username,
        roles: userData.roles
      });
    } else {
      reset({ username: '', password: '', roles: [] });
    }
  }, [userData, userId, reset]);

  const onSubmit = (data: UserFormData) => {
    if (userId) {
      updateMutation.mutate({ 
        id: userId, 
        request: { username: data.username, roles: data.roles } 
      }, {
        onSuccess: () => onClose()
      });
    } else {
      createMutation.mutate({
        username: data.username,
        password: data.password,
        roles: data.roles
      }, {
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
      title={userId ? 'ØªØ¹Ø¯ÙŠÙ„ Ù…Ø³ØªØ®Ø¯Ù…' : 'Ø¥Ø¶Ø§ÙØ© Ù…Ø³ØªØ®Ø¯Ù… Ø¬Ø¯ÙŠØ¯'}
      footer={footer}
    >
        {isUserLoading ? (
          <div className="py-8 text-center">Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</div>
        ) : (
          <form id="user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4" dir="rtl">
            <div className="space-y-2">
              <Label>Ø§Ø³Ù… Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…</Label>
              <Input {...register('username')} placeholder="Ù…Ø«Ø§Ù„: ahmed" />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {!userId && (
              <div className="space-y-2">
                <Label>ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±</Label>
                <Input type="password" {...register('password')} placeholder="******" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            )}

            <div className="space-y-3 border-t pt-4">
              <Label className="text-base font-semibold block">Ø§Ù„Ø£Ø¯ÙˆØ§Ø± Ø§Ù„Ù…Ù…Ù†ÙˆØ­Ø©</Label>
              {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
              
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2 bg-slate-50 p-4 rounded-lg border max-h-48 overflow-y-auto">
                    {rolesData.map(role => {
                      const isChecked = field.value.includes(role.name);
                      return (
                        <div key={role.id} className="flex items-center gap-2">
                          <input 
                            type="checkbox"
                            id={`role-${role.id}`} 
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, role.name]);
                              } else {
                                field.onChange(field.value.filter(r => r !== role.name));
                              }
                            }}
                            className="rounded border-gray-300 w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`role-${role.id}`} className="cursor-pointer font-normal text-sm">
                            {role.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </div>
          </form>
        )}
    </BaseModal>
  );
}

