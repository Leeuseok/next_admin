import { useState, useEffect } from 'react';
import type { User, UserStats, UseUsersReturn } from '@/types/users';

const mockUsers: User[] = [
  {
    id: '1',
    name: '강민준',
    email: 'minjun@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-12-01T00:00:00Z',
    verified: true,
    memberSince: '2023-12-01',
    lastPurchase: '2024-01-10',
    totalPurchases: 120000,
  },
  {
    id: '2',
    name: '윤서현',
    email: 'seohyun@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    createdAt: '2023-12-05T00:00:00Z',
    verified: true,
    memberSince: '2023-12-05',
    lastPurchase: '2024-01-05',
    totalPurchases: 85000,
  },
  {
    id: '3',
    name: '정지훈',
    email: 'jihoon@example.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-10T14:20:00Z',
    createdAt: '2023-11-15T00:00:00Z',
    verified: false,
    memberSince: '2023-11-15',
    lastPurchase: '2023-12-20',
    totalPurchases: 35000,
  },
  {
    id: '4',
    name: '최소연',
    email: 'soyeon@example.com',
    role: 'user',
    status: 'suspended',
    lastLogin: '2024-01-08T11:45:00Z',
    createdAt: '2023-11-20T00:00:00Z',
    verified: true,
    memberSince: '2023-11-20',
    lastPurchase: '2023-12-15',
    totalPurchases: 67000,
  },
  {
    id: '5',
    name: '장동민',
    email: 'dongmin@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-17T16:30:00Z',
    createdAt: '2023-10-05T00:00:00Z',
    verified: true,
    memberSince: '2023-10-05',
    lastPurchase: '2024-01-15',
    totalPurchases: 210000,
  },
  {
    id: '6',
    name: '박하은',
    email: 'haeun@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-16T13:45:00Z',
    createdAt: '2023-09-10T00:00:00Z',
    verified: true,
    memberSince: '2023-09-10',
    lastPurchase: '2024-01-12',
    totalPurchases: 135000,
  }
];

const mockStats: UserStats = {
  totalUsers: 6,
  activeUsers: 4,
  newUsers: 2,
  inactiveUsers: 1,
  premiumUsers: 3,
  standardUsers: 3,
  verifiedUsers: 5,
  unverifiedUsers: 1
};

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [stats, setStats] = useState<UserStats>(mockStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/users');
      // const data = await response.json();
      // setUsers(data.users);
      // setStats(data.stats);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(mockUsers);
      setStats(mockStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      // 실제 API 호출 시:
      // await fetch(`/api/users/${id}`, { method: 'DELETE' });
      
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 삭제 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      // 실제 API 호출 시:
      // const response = await fetch(`/api/users/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...updates } : user
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 정보 수정 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/users', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      setUsers(prev => [newUser, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 생성 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    stats,
    loading,
    error,
    refreshUsers,
    deleteUser,
    updateUser,
    createUser
  };
}
