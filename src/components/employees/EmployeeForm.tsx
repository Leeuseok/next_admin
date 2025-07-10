import { useState } from 'react';
import type { Employee } from '@/types/employees';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employeeData: Omit<Employee, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function EmployeeForm({ employee, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    role: employee?.role || 'user' as Employee['role'],
    status: employee?.status || 'active' as Employee['status'],
    verified: employee?.verified || false,
    lastLogin: employee?.lastLogin || new Date().toISOString(),
    position: employee?.position || '', // 직책
    department: employee?.department || '', // 부서
    employeeNo: employee?.employeeNo || '', // 사번
    ssn: employee?.ssn || '', // 주민번호(마스킹)
    joinDate: employee?.joinDate || '', // 입사일
    gender: employee?.gender || undefined, // 성별
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // SSN 처리
    let processedSsn = formData.ssn;
    if (processedSsn && !processedSsn.includes('*')) {
      const firstPart = processedSsn.slice(0, 7);
      const secondPart = processedSsn.slice(7).replace(/[0-9]/g, '*');
      processedSsn = `${firstPart}${secondPart}`;
    }
    
    // 성별 처리
    let gender: 'male' | 'female' | undefined = formData.gender;
    if (processedSsn && processedSsn.length > 7) {
      const genderDigit = processedSsn.charAt(7);
      gender = parseInt(genderDigit) % 2 === 1 ? 'male' : 'female';
    }

    onSubmit({
      ...formData,
      ssn: processedSsn,
      gender,
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div>
          <label className="block text-sm font-medium text-gray-700">부서</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: 인사팀"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">직책</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: 대리, 과장"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">사번</label>
          <input
            type="text"
            value={formData.employeeNo}
            onChange={(e) => handleInputChange('employeeNo', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: 20240001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">주민등록번호</label>
          <input
            type="text"
            value={formData.ssn}
            onChange={(e) => handleInputChange('ssn', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: 900101-1******"
            maxLength={14}
          />
          <p className="mt-1 text-xs text-gray-500">입력 시 뒷자리는 자동으로 마스킹 처리됩니다</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">입사일</label>
          <input
            type="date"
            value={formData.joinDate}
            onChange={(e) => handleInputChange('joinDate', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">성별</label>
          <select
            value={formData.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value || undefined)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">선택 안함 (주민번호로 자동 설정)</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
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
          {employee ? '수정' : '생성'}
        </button>
      </div>
    </form>
  );
}
