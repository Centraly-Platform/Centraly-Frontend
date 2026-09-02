import { useState } from 'react';
import { useRoles, useToggleRoleStatus } from '../hooks/useRoles';
import { RoleFormModal } from '../components/RoleFormModal';
import { Button } from '@/shared/components/ui/Button';
import { Plus, Edit, ToggleLeft, ToggleRight, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export function RolesPage() {
  const [includeDisabled, setIncludeDisabled] = useState(false);
  const { data: roles, isLoading } = useRoles(includeDisabled);
  const toggleMutation = useToggleRoleStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingRoleId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingRoleId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø£Ø¯ÙˆØ§Ø± ÙˆØ§Ù„ØµÙ„Ø§Ø­ÙŠØ§Øª</h1>
            <p className="text-slate-500 mt-1.5 text-sm font-medium">Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ§Øª Ø§Ù„Ù…ØªØ§Ø­Ø© ÙÙŠ Ø§Ù„Ù†Ø¸Ø§Ù… ÙˆØªØ®ØµÙŠØµ ÙˆØµÙˆÙ„ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ†.</p>
          </div>
        </div>
        
        <div className="flex gap-4 items-center shrink-0">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 transition-colors">
            <input 
              type="checkbox" 
              checked={includeDisabled}
              onChange={(e) => setIncludeDisabled(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-bold text-slate-600">Ø¥Ø¸Ù‡Ø§Ø± Ø§Ù„Ù…Ø¹Ø·Ù„Ø©</span>
          </label>
          <Button onClick={handleAdd} className="gap-2 shadow-indigo-500/20 shadow-lg px-6 h-12 bg-indigo-600 hover:bg-indigo-700">
            <Plus size={18} /> Ø¥Ø¶Ø§ÙØ© Ø¯ÙˆØ± Ø¬Ø¯ÙŠØ¯
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 px-8 font-bold text-slate-600 text-sm tracking-wide">Ø§Ø³Ù… Ø§Ù„Ø¯ÙˆØ±</th>
                  <th className="p-5 font-bold text-slate-600 text-sm tracking-wide">Ø§Ù„Ø­Ø§Ù„Ø©</th>
                  <th className="p-5 px-8 font-bold text-slate-600 text-sm tracking-wide w-40 text-center">Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roles?.map(role => (
                  <tr key={role.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 px-8">
                      <p className="font-bold text-slate-800 text-base">{role.name}</p>
                      <p className="text-[13px] text-slate-400 mt-0.5 font-medium font-mono">ID: {role.id.slice(0, 8)}...</p>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-bold border ${role.isDeleted ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                        {role.isDeleted ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                        {role.isDeleted ? 'Ù…Ø¹Ø·Ù„' : 'Ù†Ø´Ø·'}
                      </span>
                    </td>
                    <td className="p-5 px-8 flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(role.id)} title="ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±" className="bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toggleMutation.mutate(role.id)} title={role.isDeleted ? 'ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±' : 'ØªØ¹Ø·ÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±'} className="bg-white border border-slate-200 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        {role.isDeleted ? (
                          <ToggleLeft size={22} className="text-slate-400" />
                        ) : (
                          <ToggleRight size={22} className="text-emerald-500" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
                {roles?.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-16 text-center text-slate-500 font-medium text-lg">
                      Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£Ø¯ÙˆØ§Ø± Ù…Ø³Ø¬Ù„Ø© Ø¨Ø¹Ø¯.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RoleFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        roleId={editingRoleId} 
      />
    </div>
  );
}

