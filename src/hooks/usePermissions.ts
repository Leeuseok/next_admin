import { useState, useEffect } from 'react';
import type { Permission, Role, NewRole, NewPermission } from '@/types/permissions';

// 샘플 권한 데이터
const samplePermissions: Permission[] = [
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
];

// 샘플 역할 데이터
const sampleRoles: Role[] = [
  {
    id: '1',
    name: 'admin',
    description: '시스템 관리자',
    permissions: samplePermissions.filter(p => true), // 모든 권한
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    name: 'moderator',
    description: '모더레이터',
    permissions: samplePermissions.filter(p => 
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
    permissions: samplePermissions.filter(p => 
      p.resource === 'content' && p.action === 'read'
    ),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
];

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>(samplePermissions);
  const [roles, setRoles] = useState<Role[]>(sampleRoles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 필터링된 역할 및 권한
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchPermissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/permissions');
      // const data = await response.json();
      // setPermissions(data);
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      setPermissions(samplePermissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : '권한을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/roles');
      // const data = await response.json();
      // setRoles(data);
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      setRoles(sampleRoles);
    } catch (err) {
      setError(err instanceof Error ? err.message : '역할을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 역할 추가
  const addRole = (newRole: NewRole): Role => {
    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: permissions.filter(p => newRole.permissions.includes(p.id)),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRoles([...roles, role]);
    return role;
  };

  // 역할 수정
  const updateRole = (id: string, updatedRole: NewRole): Role | null => {
    const existingRole = roles.find(r => r.id === id);
    if (!existingRole) return null;

    const updated: Role = {
      ...existingRole,
      name: updatedRole.name,
      description: updatedRole.description,
      permissions: permissions.filter(p => updatedRole.permissions.includes(p.id)),
      updatedAt: new Date()
    };
    
    setRoles(roles.map(role => role.id === id ? updated : role));
    return updated;
  };

  // 역할 삭제
  const deleteRole = (id: string): boolean => {
    const initialLength = roles.length;
    setRoles(roles.filter(role => role.id !== id));
    return roles.length < initialLength;
  };

  // 권한 추가
  const addPermission = (newPermission: NewPermission): Permission => {
    const permission: Permission = {
      id: Date.now().toString(),
      ...newPermission
    };
    setPermissions([...permissions, permission]);
    return permission;
  };

  // 권한 수정
  const updatePermission = (id: string, updatedPermission: NewPermission): Permission | null => {
    const existingPermission = permissions.find(p => p.id === id);
    if (!existingPermission) return null;

    const updated: Permission = {
      ...existingPermission,
      ...updatedPermission
    };
    
    setPermissions(permissions.map(permission => permission.id === id ? updated : permission));
    return updated;
  };

  // 권한 삭제
  const deletePermission = (id: string): boolean => {
    const initialLength = permissions.length;
    setPermissions(permissions.filter(permission => permission.id !== id));
    
    // 역할에서도 해당 권한 제거
    setRoles(roles.map(role => ({
      ...role,
      permissions: role.permissions.filter(p => p.id !== id)
    })));
    
    return permissions.length < initialLength;
  };

  // 검색어 설정
  const setSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  return {
    permissions: filteredPermissions,
    roles: filteredRoles,
    loading,
    error,
    searchTerm,
    setSearch,
    addRole,
    updateRole,
    deleteRole,
    addPermission,
    updatePermission,
    deletePermission,
    refreshPermissions: fetchPermissions,
    refreshRoles: fetchRoles
  };
}
