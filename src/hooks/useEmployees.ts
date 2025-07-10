import { useState, useEffect } from 'react';
import type { Employee, EmployeeStats, UseEmployeesReturn } from '@/types/employees';

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-12-01T00:00:00Z',
    verified: true,
    position: '팀장',
    department: '개발팀',
    employeeNo: '20230001',
    ssn: '900101-1******',
    joinDate: '2023-12-01',
    gender: 'male'
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    createdAt: '2023-12-05T00:00:00Z',
    verified: true,
    position: '사원',
    department: '인사팀',
    employeeNo: '20240002',
    ssn: '950202-2******',
    joinDate: '2024-03-15',
    gender: 'female'
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@example.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-10T14:20:00Z',
    createdAt: '2023-11-15T00:00:00Z',
    verified: false,
    position: '대리',
    department: '영업팀',
    employeeNo: '20230003',
    ssn: '920303-1******',
    joinDate: '2023-11-15',
    gender: 'male'
  },
  {
    id: '4',
    name: '최지현',
    email: 'choi@example.com',
    role: 'user',
    status: 'suspended',
    lastLogin: '2024-01-08T11:45:00Z',
    createdAt: '2023-11-20T00:00:00Z',
    verified: true,
    position: '과장',
    department: '재무팀',
    employeeNo: '20230004',
    ssn: '880404-2******',
    joinDate: '2023-11-20',
    gender: 'female'
  }
];

const mockStats: EmployeeStats = {
  totalEmployees: 4,
  activeEmployees: 3,
  newEmployees: 1,
  leavers: 0,
  suspendedEmployees: 1,
  male: 2,
  female: 2,
  departmentStats: {
    '개발팀': 1,
    '인사팀': 1,
    '영업팀': 1,
    '재무팀': 1,
  },
};

export function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [stats, setStats] = useState<EmployeeStats>(mockStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/employees');
      // const data = await response.json();
      // setEmployees(data.employees);
      // setStats(data.stats);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setEmployees(mockEmployees);
      setStats(mockStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : '직원 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      // 실제 API 호출 시:
      // await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      
      setEmployees(prev => prev.filter(employee => employee.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '직원 삭제 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    try {
      // 실제 API 호출 시:
      // const response = await fetch(`/api/employees/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      
      setEmployees(prev => prev.map(employee => 
        employee.id === id ? { ...employee, ...updates } : employee
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : '직원 정보 수정 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'createdAt'>) => {
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/employees', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(employeeData)
      // });
      
      const newEmployee: Employee = {
        ...employeeData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      setEmployees(prev => [newEmployee, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '직원 생성 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const refreshEmployees = () => {
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    stats,
    loading,
    error,
    refreshEmployees,
    deleteEmployee,
    updateEmployee,
    createEmployee
  };
}
