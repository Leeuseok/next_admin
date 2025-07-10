import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import { Input, Select, Button } from '@/components/Form';
import type { NewPermission, Permission } from '@/types/permissions';

interface PermissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  permission: Permission | null;
  onSave: (permissionData: NewPermission) => void;
}

export default function PermissionFormModal({
  isOpen,
  onClose,
  permission,
  onSave
}: PermissionFormModalProps) {
  const [formData, setFormData] = useState<NewPermission>({
    name: '',
    description: '',
    resource: '',
    action: 'read'
  });

  // Update form data when permission changes
  useEffect(() => {
    if (permission) {
      setFormData({
        name: permission.name,
        description: permission.description,
        resource: permission.resource,
        action: permission.action
      });
    } else {
      setFormData({
        name: '',
        description: '',
        resource: '',
        action: 'read'
      });
    }
  }, [permission]);

  const handleChange = (field: keyof NewPermission, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      description: '',
      resource: '',
      action: 'read'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="새 권한 추가"
    >
      <div className="space-y-4">
        <Input
          name="name"
          label="권한명"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="예: users.create"
          required
        />

        <Input
          name="description"
          label="설명"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="예: 사용자 생성"
          required
        />

        <Input
          name="resource"
          label="리소스"
          value={formData.resource}
          onChange={(e) => handleChange('resource', e.target.value)}
          placeholder="예: users"
          required
        />

        <Select
          name="action"
          label="액션"
          value={formData.action}
          onChange={(e) => handleChange('action', e.target.value as any)}
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
            onClick={onClose}
          >
            취소
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.description || !formData.resource}
          >
            추가
          </Button>
        </div>
      </div>
    </Modal>
  );
}
