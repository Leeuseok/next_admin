'use client';

import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/Form';
import RoleTable from '@/components/permissions/RoleTable';
import PermissionTable from '@/components/permissions/PermissionTable';
import RoleFormModal from '@/components/permissions/RoleFormModal';
import PermissionFormModal from '@/components/permissions/PermissionFormModal';
import DeleteRoleModal from '@/components/permissions/DeleteRoleModal';
import { usePermissions } from '@/hooks/usePermissions';
import type { Role, Permission, NewRole, NewPermission } from '@/types/permissions';

export default function PermissionsPage() {
  const {
    roles,
    permissions,
    loading,
    error,
    searchTerm,
    setSearch,
    addRole,
    updateRole,
    deleteRole,
    addPermission,
    updatePermission,
    refreshRoles,
    refreshPermissions
  } = usePermissions();
  
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  const handleRoleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsRoleModalOpen(true);
  };

  const handleRoleDelete = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handlePermissionEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsPermissionModalOpen(true);
  };

  const handleRoleSave = (roleData: NewRole) => {
    if (selectedRole) {
      updateRole(selectedRole.id, roleData);
    } else {
      addRole(roleData);
    }
    setIsRoleModalOpen(false);
    setSelectedRole(null);
  };

  const handlePermissionSave = (permissionData: NewPermission) => {
    if (selectedPermission) {
      updatePermission(selectedPermission.id, permissionData);
    } else {
      addPermission(permissionData);
    }
    setIsPermissionModalOpen(false);
    setSelectedPermission(null);
  };

  const handleConfirmDelete = () => {
    if (selectedRole) {
      deleteRole(selectedRole.id);
      setIsDeleteModalOpen(false);
      setSelectedRole(null);
    }
  };

  const handleAddNewRole = () => {
    setSelectedRole(null);
    setIsRoleModalOpen(true);
  };

  const handleAddNewPermission = () => {
    setSelectedPermission(null);
    setIsPermissionModalOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">로드 중...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
          <button
            onClick={activeTab === 'roles' ? refreshRoles : refreshPermissions}
            className="ml-4 underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">권한 관리</h1>
          <p className="text-gray-600">역할과 권한을 설정하여 시스템 접근을 제어합니다.</p>
        </div>
        <div className="flex space-x-3">
          {activeTab === 'roles' && (
            <button
              onClick={handleAddNewRole}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>역할 추가</span>
            </button>
          )}
          {activeTab === 'permissions' && (
            <button
              onClick={handleAddNewPermission}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>권한 추가</span>
            </button>
          )}
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              역할
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              권한
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* 검색 필드 */}
          <div className="mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                name="search"
                placeholder={activeTab === 'roles' ? "역할명, 설명 검색..." : "권한명, 리소스, 설명 검색..."}
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 역할 또는 권한 테이블 */}
          {activeTab === 'roles' ? (
            <RoleTable 
              roles={roles} 
              onEdit={handleRoleEdit}
              onDelete={handleRoleDelete}
            />
          ) : (
            <PermissionTable 
              permissions={permissions} 
              onEdit={handlePermissionEdit}
            />
          )}
        </div>
      </div>

      {/* 역할 폼 모달 */}
      <RoleFormModal 
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        permissions={permissions}
        onSave={handleRoleSave}
      />

      {/* 권한 폼 모달 */}
      <PermissionFormModal
        isOpen={isPermissionModalOpen}
        onClose={() => {
          setIsPermissionModalOpen(false);
          setSelectedPermission(null);
        }}
        permission={selectedPermission}
        onSave={handlePermissionSave}
      />

      {/* 역할 삭제 확인 모달 */}
      <DeleteRoleModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
