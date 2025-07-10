import { useState } from 'react';
import type { Employee } from '@/types/employees';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Employee['status']) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete, onStatusChange }: EmployeeTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const getStatusBadge = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">활성</span> ;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">비활성</span>;
      case 'suspended':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">정지</span>;
    }
  };

  const getRoleBadge = (role: Employee['role']) => {
    switch (role) {
      case 'admin':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">관리자</span>;
      case 'moderator':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">중재자</span>;
      case 'user':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">사용자</span>;
    }
  };

  // 부서 목록 추출
  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (employee.employeeNo && employee.employeeNo.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h3 className="text-lg font-medium text-gray-900">직원 목록</h3>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="직원 검색"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">모든 부서</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">모든 역할</option>
              <option value="admin">관리자</option>
              <option value="moderator">중재자</option>
              <option value="user">사용자</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="suspended">정지</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">사번</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">이름/이메일</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">성별</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">부서</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">직책</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">역할</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">상태</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">입사일</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">마지막 로그인</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-mono">{employee.employeeNo || '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-9 w-9">
                      <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-base font-semibold text-gray-700">
                          {employee.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{employee.gender === 'male' ? '남' : employee.gender === 'female' ? '여' : '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{employee.department || '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{employee.position || '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap">{getRoleBadge(employee.role)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    value={employee.status}
                    onChange={(e) => onStatusChange(employee.id, e.target.value as Employee['status'])}
                    className="text-sm border-0 bg-transparent focus:ring-0 text-gray-600"
                  >
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                    <option value="suspended">정지</option>
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{employee.joinDate ? new Date(employee.joinDate).toLocaleDateString('ko-KR') : '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{new Date(employee.lastLogin).toLocaleDateString('ko-KR')}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      편집
                    </button>
                    <button
                      onClick={() => onDelete(employee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
