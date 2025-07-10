// Users 관련 타입 정의 (일반 사용자)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  lastLogin: string;
  createdAt: string;
  verified: boolean;
  memberSince?: string;    // 가입일
  lastPurchase?: string;   // 최근 구매일
  totalPurchases?: number; // 총 구매 금액
}

export interface UserStats {
  totalUsers: number;          // 총 사용자 수
  activeUsers: number;         // 활성 사용자
  newUsers: number;            // 신규 가입자(이번 달)
  inactiveUsers: number;       // 비활성 사용자
  premiumUsers: number;        // 프리미엄 사용자
  standardUsers: number;       // 일반 사용자
  verifiedUsers: number;       // 인증된 사용자
  unverifiedUsers: number;     // 미인증 사용자
}

// 예시 더미 데이터
// const stats: UserStats = {
//   totalUsers: 50,
//   activeUsers: 40,
//   newUsers: 3,
//   leavers: 1,
//   suspendedUsers: 2,
//   male: 28,
//   female: 22,
//   departmentStats: {
//     '인사팀': 10,
//     '개발팀': 20,
//     '영업팀': 8,
//     '재무팀': 12,
//   },
// };

export interface UseUsersReturn {
  users: User[];
  stats: UserStats;
  loading: boolean;
  error: string | null;
  refreshUsers: () => void;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
}
