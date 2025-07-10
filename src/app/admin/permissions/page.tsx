'use client';

import { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Table from '@/components/Table';
import Modal, { ConfirmModal } from '@/components/Modal';
import { Input, Select, Button, Checkbox } from '@/components/Form';
import { formatDate, cn } from '@/lib/utils';
import { Role, Permission, TableColumn } from '@/types';

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: '1', name: 'users.create', description: '사용자 생성', resource: 'users', action: 'create' },
    { id: '2', name: 'users.read', description: '사용자 조회', resource: 'users', action: 'read' },
    { id: '3', name: 'users.update', description: '사용자 수정', resource: 'users', action: 'update' },
    { id: '4', name: 'users.delete', description: '사용자 삭제', resource: 'users', action: 'delete' },
    { id: '5', name: 'content.create', description: '콘텐츠 생성', resource: 'content', action: 'create' },
    { id: '6', name: 'content.read', description: '콘텐츠 조회', resource: 'content', action: 'read' },
    { id: '7', name: 'content.update', description: '콘텐츠 수정', resource: 'content', action: 'update' },
    { id: '8', name: 'content.delete', description: '콘텐츠 삭제', resource: 'content', action: 'delete' },
    { id: '9', name: 'analytics.read', description: '통계 조회', resource: 'analytics', action: 'read' },
    { id: '10', name: 'system.manage', description: '시스템 관리', resource: 'system', action: 'manage' }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'admin',
      description: '시스템 관리자',
      permissions: permissions.filter(p => true), // 모든 권한
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '2',
      name: 'moderator',
      description: '모더레이터',
      permissions: permissions.filter(p => 
        p.resource === 'users' && p.action === 'read' ||
        p.resource === 'content' ||
        p.resource === 'analytics' && p.action === 'read'
      ),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'user',
      description: '일반 사용자',
      permissions: permissions.filter(p => 
        p.resource === 'content' && p.action === 'read'
      ),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    }
  ]);

  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const [newPermission, setNewPermission] = useState({
    name: '',
    description: '',
    resource: '',
    action: 'read' as 'create' | 'read' | 'update' | 'delete' | 'manage'
  });

  const handleAddRole = () => {
    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: permissions.filter(p => newRole.permissions.includes(p.id)),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setIsRoleModalOpen(false);
  };

  const handleEditRole = () => {
    if (editingRole) {
      const updatedRole = {
        ...editingRole,
        permissions: permissions.filter(p => newRole.permissions.includes(p.id)),
        updatedAt: new Date()
      };
      setRoles(roles.map(role => role.id === editingRole.id ? updatedRole : role));
      setEditingRole(null);
      setNewRole({ name: '', description: '', permissions: [] });
      setIsRoleModalOpen(false);
    }
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      setRoles(roles.filter(role => role.id !== selectedRole.id));
      setSelectedRole(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddPermission = () => {
    const permission: Permission = {
      id: Date.now().toString(),
      name: newPermission.name,
      description: newPermission.description,
      resource: newPermission.resource,
      action: newPermission.action
    };
    setPermissions([...permissions, permission]);
    setNewPermission({ name: '', description: '', resource: '', action: 'read' });
    setIsPermissionModalOpen(false);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permissionId]
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(id => id !== permissionId)
      });
    }
  };

  const roleColumns: TableColumn[] = [
    {
      key: 'name',
      label: '역할명',
      sortable: true,
      render: (value: string, row: Role) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <UserGroupIcon className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'permissions',
      label: '권한 수',
      render: (value: Permission[]) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {value.length}개
        </span>
      )
    },
    {
      key: 'createdAt',
      label: '생성일',
      sortable: true,
      render: (value: Date) => formatDate(value)
    },
    {
      key: 'updatedAt',
      label: '수정일',
      sortable: true,
      render: (value: Date) => formatDate(value)
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: Role) => (
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
                      setEditingRole(row);
                      setNewRole({
                        name: row.name,
                        description: row.description,
                        permissions: row.permissions.map(p => p.id)
                      });
                      setIsRoleModalOpen(true);
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
                      setSelectedRole(row);
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

  const permissionColumns: TableColumn[] = [
    {
      key: 'name',
      label: '권한명',
      sortable: true,
      render: (value: string, row: Permission) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <ShieldCheckIcon className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'resource',
      label: '리소스',
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'action',
      label: '액션',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          value === 'create' ? 'bg-green-100 text-green-800' :
          value === 'read' ? 'bg-blue-100 text-blue-800' :
          value === 'update' ? 'bg-yellow-100 text-yellow-800' :
          value === 'delete' ? 'bg-red-100 text-red-800' :
          'bg-purple-100 text-purple-800'
        )}>
          {value === 'create' ? '생성' :
           value === 'read' ? '조회' :
           value === 'update' ? '수정' :
           value === 'delete' ? '삭제' : '관리'}
        </span>
      )
    }
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">권한 관리</h1>
          <p className="text-gray-600">사용자 역할과 권한을 관리하세요.</p>
        </div>
        <Button
          onClick={() => {
            if (activeTab === 'roles') {
              setIsRoleModalOpen(true);
            } else {
              setIsPermissionModalOpen(true);
            }
          }}
          className="inline-flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          {activeTab === 'roles' ? '새 역할 추가' : '새 권한 추가'}
        </Button>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('roles')}
            className={cn(
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'roles'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            역할 ({roles.length})
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={cn(
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'permissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            권한 ({permissions.length})
          </button>
        </nav>
      </div>

      {/* 검색 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="search"
            placeholder={`${activeTab === 'roles' ? '역할' : '권한'} 검색...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 테이블 */}
      {activeTab === 'roles' ? (
        <Table
          data={filteredRoles}
          columns={roleColumns}
        />
      ) : (
        <Table
          data={filteredPermissions}
          columns={permissionColumns}
        />
      )}

      {/* 역할 추가/수정 모달 */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setEditingRole(null);
          setNewRole({ name: '', description: '', permissions: [] });
        }}
        title={editingRole ? '역할 수정' : '새 역할 추가'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            name="name"
            label="역할명"
            value={newRole.name}
            onChange={(e) => setNewRole({...newRole, name: e.target.value})}
            required
          />
          <Input
            name="description"
            label="설명"
            value={newRole.description}
            onChange={(e) => setNewRole({...newRole, description: e.target.value})}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              권한 선택
            </label>
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-4">
              {Object.entries(
                permissions.reduce((acc, permission) => {
                  if (!acc[permission.resource]) {
                    acc[permission.resource] = [];
                  }
                  acc[permission.resource].push(permission);
                  return acc;
                }, {} as Record<string, Permission[]>)
              ).map(([resource, resourcePermissions]) => (
                <div key={resource} className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2 capitalize">
                    {resource}
                  </h4>
                  <div className="space-y-2">
                    {resourcePermissions.map((permission) => (
                      <Checkbox
                        key={permission.id}
                        name={`permission_${permission.id}`}
                        label={permission.description}
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              variant="secondary"
              onClick={() => {
                setIsRoleModalOpen(false);
                setEditingRole(null);
                setNewRole({ name: '', description: '', permissions: [] });
              }}
            >
              취소
            </Button>
            <Button onClick={editingRole ? handleEditRole : handleAddRole}>
              {editingRole ? '수정' : '추가'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* 권한 추가 모달 */}
      <Modal
        isOpen={isPermissionModalOpen}
        onClose={() => {
          setIsPermissionModalOpen(false);
          setNewPermission({ name: '', description: '', resource: '', action: 'read' });
        }}
        title="새 권한 추가"
      >
        <div className="space-y-4">
          <Input
            name="name"
            label="권한명"
            value={newPermission.name}
            onChange={(e) => setNewPermission({...newPermission, name: e.target.value})}
            placeholder="예: users.create"
            required
          />
          <Input
            name="description"
            label="설명"
            value={newPermission.description}
            onChange={(e) => setNewPermission({...newPermission, description: e.target.value})}
            placeholder="예: 사용자 생성"
            required
          />
          <Input
            name="resource"
            label="리소스"
            value={newPermission.resource}
            onChange={(e) => setNewPermission({...newPermission, resource: e.target.value})}
            placeholder="예: users"
            required
          />
          <Select
            name="action"
            label="액션"
            value={newPermission.action}
            onChange={(e) => setNewPermission({...newPermission, action: e.target.value as any})}
            options={[
              { value: 'create', label: '생성' },
              { value: 'read', label: '조회' },
              { value: 'update', label: '수정' },
              { value: 'delete', label: '삭제' },
              { value: 'manage', label: '관리' }
            ]}
          />
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              variant="secondary"
              onClick={() => {
                setIsPermissionModalOpen(false);
                setNewPermission({ name: '', description: '', resource: '', action: 'read' });
              }}
            >
              취소
            </Button>
            <Button onClick={handleAddPermission}>
              추가
            </Button>
          </div>
        </div>
      </Modal>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteRole}
        title="역할 삭제"
        message={`정말로 "${selectedRole?.name}" 역할을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}
