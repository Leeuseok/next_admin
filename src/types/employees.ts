// 직원(Employee) 관련 타입 정의
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  lastLogin: string;
  createdAt: string;
  verified: boolean;
  position: string;         // 직책
  department: string;       // 부서
  employeeNo: string;       // 사번
  ssn: string;              // 주민등록번호(마스킹)
  joinDate: string;         // 입사일 (YYYY-MM-DD)
  gender?: 'male' | 'female'; // 성별
}

export interface EmployeeStats {
  totalEmployees: number;         // 전체 인원
  activeEmployees: number;        // 재직 인원
  newEmployees: number;           // 신규 입사자(이번 달)
  leavers: number;                // 퇴사자(이번 달)
  suspendedEmployees: number;     // 정지/휴직자
  male: number;                   // 남성 인원
  female: number;                 // 여성 인원
  departmentStats: {
    [department: string]: number;
  };
}

export interface UseEmployeesReturn {
  employees: Employee[];
  stats: EmployeeStats;
  loading: boolean;
  error: string | null;
  refreshEmployees: () => void;
  deleteEmployee: (id: string) => Promise<void>;
  updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>;
  createEmployee: (employeeData: Omit<Employee, 'id' | 'createdAt'>) => Promise<void>;
}
