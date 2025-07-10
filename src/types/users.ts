// Users 관련 타입 정의
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
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  suspendedUsers: number;
}

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
