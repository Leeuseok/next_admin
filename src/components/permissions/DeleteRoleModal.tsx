import React from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/Form';
import type { Role } from '@/types/permissions';

interface DeleteRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  onConfirm: () => void;
}

export default function DeleteRoleModal({
  isOpen,
  onClose,
  role,
  onConfirm
}: DeleteRoleModalProps) {
  if (!role) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="역할 삭제"
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          정말로 "{role.name}" 역할을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}
