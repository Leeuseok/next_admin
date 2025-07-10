'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Table from '@/components/Table';
import Modal, { ConfirmModal } from '@/components/Modal';
import { Input, Select, Button } from '@/components/Form';
import { formatDate, getStatusColor, cn } from '@/lib/utils';
import { User, TableColumn } from '@/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: '김철수',
      email: 'kim@example.com',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-01-15T10:30:00'),
      phone: '010-1234-5678'
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee@example.com',
      role: 'moderator',
      status: 'active',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      lastLogin: new Date('2024-01-14T15:45:00'),
      phone: '010-2345-6789'
    },
    {
      id: '3',
      name: '박민수',
      email: 'park@example.com',
      role: 'user',
      status: 'inactive',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-13'),
      lastLogin: new Date('2024-01-13T09:15:00'),
      phone: '010-3456-7890'
    },
    {
      id: '4',
      name: '정수진',
      email: 'jung@example.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12'),
      lastLogin: new Date('2024-01-12T14:20:00'),
      phone: '010-4567-8901'
    },
    {
      id: '5',
      name: '최민호',
      email: 'choi@example.com',
      role: 'user',
      status: 'suspended',
      createdAt: new Date('2024-01-11'),
      updatedAt: new Date('2024-01-11'),
      lastLogin: new Date('2024-01-11T11:30:00'),
      phone: '010-5678-9012'
    }
  ]);

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'user' | 'admin' | 'moderator',
    status: 'active' as 'active' | 'inactive' | 'suspended',
    phone: ''
  });

  useEffect(() => {
    let filtered = users;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 역할 필터
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // 상태 필터
    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setUsers([...users, user]);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
      phone: ''
    });
    setIsAddModalOpen(false);
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...selectedUser, updatedAt: new Date() }
          : user
      ));
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: '이름',
      sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            {row.profileImage ? (
              <img src={row.profileImage} alt={value} className="w-8 h-8 rounded-full" />
            ) : (
              <UserIcon className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: '역할',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          value === 'admin' ? 'bg-purple-100 text-purple-800' :
          value === 'moderator' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        )}>
          {value === 'admin' ? '관리자' :
           value === 'moderator' ? '모더레이터' : '사용자'}
        </span>
      )
    },
    {
      key: 'status',
      label: '상태',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          getStatusColor(value)
        )}>
          {value === 'active' ? '활성' :
           value === 'inactive' ? '비활성' : '정지'}
        </span>
      )
    },
    {
      key: 'phone',
      label: '전화번호',
      render: (value: string) => value || '-'
    },
    {
      key: 'lastLogin',
      label: '최근 로그인',
      sortable: true,
      render: (value: Date) => value ? formatDate(value) : '-'
    },
    {
      key: 'createdAt',
      label: '가입일',
      sortable: true,
      render: (value: Date) => formatDate(value)
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: User) => (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setSelectedUser(row);
                      setIsViewModalOpen(true);
                    }}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm w-full text-left',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )}
                  >
                    <EyeIcon className="mr-3 h-4 w-4" />
                    상세보기
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setSelectedUser(row);
                      setIsEditModalOpen(true);
                    }}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm w-full text-left',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )}
                  >
                    <PencilIcon className="mr-3 h-4 w-4" />
                    수정
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setSelectedUser(row);
                      setIsDeleteModalOpen(true);
                    }}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm w-full text-left',
                      active ? 'bg-gray-100 text-red-900' : 'text-red-700'
                    )}
                  >
                    <TrashIcon className="mr-3 h-4 w-4" />
                    삭제
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
          <p className="text-gray-600">사용자 계정을 관리하고 권한을 설정하세요.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          새 사용자 추가
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="search"
              placeholder="이름 또는 이메일 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            name="role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: '', label: '모든 역할' },
              { value: 'admin', label: '관리자' },
              { value: 'moderator', label: '모더레이터' },
              { value: 'user', label: '사용자' }
            ]}
          />
          <Select
            name="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: '모든 상태' },
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
              { value: 'suspended', label: '정지' }
            ]}
          />
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredUsers.length}개 결과
            </span>
          </div>
        </div>
      </div>

      {/* 사용자 테이블 */}
      <Table
        data={filteredUsers}
        columns={columns}
        onRowClick={(user) => {
          setSelectedUser(user);
          setIsViewModalOpen(true);
        }}
      />

      {/* 사용자 추가 모달 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="새 사용자 추가"
      >
        <div className="space-y-4">
          <Input
            name="name"
            label="이름"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            required
          />
          <Input
            name="email"
            label="이메일"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            required
          />
          <Input
            name="phone"
            label="전화번호"
            value={newUser.phone}
            onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
          />
          <Select
            name="role"
            label="역할"
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
            options={[
              { value: 'user', label: '사용자' },
              { value: 'moderator', label: '모더레이터' },
              { value: 'admin', label: '관리자' }
            ]}
          />
          <Select
            name="status"
            label="상태"
            value={newUser.status}
            onChange={(e) => setNewUser({...newUser, status: e.target.value as any})}
            options={[
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
              { value: 'suspended', label: '정지' }
            ]}
          />
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleAddUser}>
              추가
            </Button>
          </div>
        </div>
      </Modal>

      {/* 사용자 상세보기 모달 */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="사용자 상세정보"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {selectedUser.profileImage ? (
                  <img src={selectedUser.profileImage} alt={selectedUser.name} className="w-16 h-16 rounded-full" />
                ) : (
                  <UserIcon className="h-8 w-8 text-gray-500" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedUser.name}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">역할</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.role === 'admin' ? '관리자' :
                   selectedUser.role === 'moderator' ? '모더레이터' : '사용자'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">상태</label>
                <p className="mt-1">
                  <span className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusColor(selectedUser.status)
                  )}>
                    {selectedUser.status === 'active' ? '활성' :
                     selectedUser.status === 'inactive' ? '비활성' : '정지'}
                  </span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">전화번호</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.phone || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">가입일</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">최근 로그인</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : '-'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">최근 업데이트</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser.updatedAt)}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={() => setIsViewModalOpen(false)}
              >
                닫기
              </Button>
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setIsEditModalOpen(true);
                }}
              >
                수정
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 사용자 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="사용자 수정"
      >
        {selectedUser && (
          <div className="space-y-4">
            <Input
              name="name"
              label="이름"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
              required
            />
            <Input
              name="email"
              label="이메일"
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
              required
            />
            <Input
              name="phone"
              label="전화번호"
              value={selectedUser.phone || ''}
              onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
            />
            <Select
              name="role"
              label="역할"
              value={selectedUser.role}
              onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value as any})}
              options={[
                { value: 'user', label: '사용자' },
                { value: 'moderator', label: '모더레이터' },
                { value: 'admin', label: '관리자' }
              ]}
            />
            <Select
              name="status"
              label="상태"
              value={selectedUser.status}
              onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value as any})}
              options={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
                { value: 'suspended', label: '정지' }
              ]}
            />
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                취소
              </Button>
              <Button onClick={handleEditUser}>
                저장
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 사용자 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="사용자 삭제"
        message={`정말로 ${selectedUser?.name} 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}
