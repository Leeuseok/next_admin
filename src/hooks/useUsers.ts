import { useState, useEffect } from 'react';
import type { User, UserStats, UseUsersReturn } from '@/types/users';

const mockUsers: User[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-12-01T00:00:00Z',
    verified: true
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    createdAt: '2023-12-05T00:00:00Z',
    verified: true
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@example.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-10T14:20:00Z',
    createdAt: '2023-11-15T00:00:00Z',
    verified: false
  },
  {
    id: '4',
    name: '최지현',
    email: 'choi@example.com',
    role: 'user',
    status: 'suspended',
    lastLogin: '2024-01-08T11:45:00Z',
    createdAt: '2023-11-20T00:00:00Z',
    verified: true
  }
];

const mockStats: UserStats = {
  totalUsers: 1247,
  activeUsers: 1089,
  newUsers: 23,
  suspendedUsers: 12
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
