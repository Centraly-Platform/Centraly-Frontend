import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserFormModal } from '../components/UserFormModal';
import { Button } from '@/shared/components/ui/Button';
import { Plus, Edit, User, Shield } from 'lucide-react';

export function UsersPage() {
  const { data: users, isLoading } = useUsers();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingUserId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingUserId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <User size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">إدارة المستخدمين</h1>
            <p className="text-slate-500 mt-1.5 text-sm font-medium">أضف مستخدمين جدد وقم بتعيين الصلاحيات والأدوار المناسبة لكل مستخدم لضمان أمان النظام.</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="gap-2 shadow-blue-500/20 shadow-lg px-6 shrink-0 h-12">
          <Plus size={18} /> إضافة مستخدم جديد
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">جاري التحميل...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 px-8 font-bold text-slate-600 text-sm tracking-wide">تفاصيل المستخدم</th>
                  <th className="p-5 font-bold text-slate-600 text-sm tracking-wide">الأدوار الممنوحة</th>
                  <th className="p-5 px-8 font-bold text-slate-600 text-sm tracking-wide w-32 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users?.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-100">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-base">{user.username}</p>
                          <p className="text-[13px] text-slate-400 mt-0.5 font-medium font-mono">ID: {user.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {user.roles.length === 0 && <span className="text-sm text-slate-400">لا يوجد أدوار</span>}
                        {user.roles.map(role => (
                          <span key={role} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-[13px] font-bold rounded-lg border border-blue-100/60 shadow-sm">
                            <Shield size={14} className="text-blue-500" />
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-5 px-8 text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id)} className="opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600">
                        <Edit size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
                {users?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-16 text-center text-slate-500 font-medium text-lg">
                      لا يوجد مستخدمين مسجلين بعد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userId={editingUserId} 
      />
    </div>
  );
}

