'use client';

import { useState } from 'react';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useUsers } from '@/hooks/useUsers';
import UserStatsCards from '@/components/users/UserStatsCards';
import UserTable from '@/components/users/UserTable';
import UserForm from '@/components/users/UserForm';
import Modal from '@/components/Modal';
import type { User } from '@/types/users';

export default function UsersPage() {
  const {
    users,
    stats,
    loading,
    error,
    refreshUsers,
    deleteUser,
    updateUser,
    createUser
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = () => {
    setModalType('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setModalType('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      try {
        await deleteUser(id);
        alert('사용자가 삭제되었습니다.');
      } catch (error) {
        alert('사용자 삭제에 실패했습니다.');
      }
    }
  };

  const handleStatusChange = async (id: string, status: User['status']) => {
    try {
      await updateUser(id, { status });
    } catch (error) {
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleFormSubmit = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      if (modalType === 'create') {
        await createUser(userData);
        alert('사용자가 생성되었습니다.');
      } else if (selectedUser) {
        await updateUser(selectedUser.id, userData);
        alert('사용자 정보가 수정되었습니다.');
      }
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      alert('작업에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">사용자 데이터를 불러오는 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-red-800">{error}</span>
          <button
            onClick={refreshUsers}
            className="ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
          <p className="text-gray-600">시스템 사용자 정보를 관리합니다</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={refreshUsers}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>새로고침</span>
          </button>
          <button
            onClick={handleCreateUser}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span>사용자 추가</span>
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <UserStatsCards stats={stats} />

      {/* 사용자 테이블 */}
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onStatusChange={handleStatusChange}
      />

      {/* 사용자 생성/편집 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'create' ? '새 사용자 생성' : '사용자 정보 수정'}
      >
        <UserForm
          user={selectedUser || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
