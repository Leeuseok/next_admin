import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import { Input, Select, Checkbox, Button } from '@/components/Form';
import type { Permission, NewRole, Role } from '@/types/permissions';

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  permissions: Permission[];
  role: Role | null;
  onSave: (roleData: NewRole) => void;
}

export default function RoleFormModal({
  isOpen,
  onClose,
  permissions,
  role,
  onSave
}: RoleFormModalProps) {
  const [formData, setFormData] = useState<NewRole>({
    name: '',
    description: '',
    permissions: []
  });

  // Update form data when role changes
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions.map(p => p.id)
      });
    } else {
      setFormData({
        name: '',
        description: '',
        permissions: []
      });
    }
  }, [role]);

  const handleChange = (field: keyof NewRole, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      handleChange('permissions', [...formData.permissions, permissionId]);
    } else {
      handleChange('permissions', formData.permissions.filter(id => id !== permissionId));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  // 권한을 리소스별로 그룹화
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.resource]) {
      acc[permission.resource] = [];
    }
    acc[permission.resource].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={role ? '역할 수정' : '새 역할 추가'}
      size="lg"
    >
      <div className="space-y-4">
        <Input
          name="name"
          label="역할명"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />

        <Input
          name="description"
          label="설명"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            권한 선택
          </label>
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-4">
            {Object.entries(groupedPermissions).map(([resource, resourcePermissions]) => (
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
                      checked={formData.permissions.includes(permission.id)}
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
            onClick={onClose}
          >
            취소
          </Button>
          <Button onClick={handleSubmit}>
            {role ? '수정' : '추가'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
