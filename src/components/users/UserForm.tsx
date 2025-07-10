import { useState } from 'react';
import type { User } from '@/types/users';

interface UserFormProps {
  user?: User;
  onSubmit: (userData: Omit<User, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user' as User['role'],
    status: user?.status || 'active' as User['status'],
    verified: user?.verified || false,
    lastLogin: user?.lastLogin || new Date().toISOString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">이름</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">이메일</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">역할</label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">사용자</option>
            <option value="moderator">중재자</option>
            <option value="admin">관리자</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">상태</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="suspended">정지</option>
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.verified}
            onChange={(e) => handleInputChange('verified', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">이메일 인증됨</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {user ? '수정' : '생성'}
        </button>
      </div>
    </form>
  );
}
