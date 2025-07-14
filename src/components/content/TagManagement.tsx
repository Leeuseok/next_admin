import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/Form';
import Modal, { ConfirmModal } from '@/components/Modal';
import Table from '@/components/Table';
import type { Tag } from '@/types/content';
import type { TableColumn } from '@/types';

interface TagManagementProps {
  tags: Tag[];
  onAdd: (tag: Omit<Tag, 'id' | 'createdAt' | 'usageCount'>) => Promise<void>;
  onEdit: (id: string, tag: Partial<Tag>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TagManagement({
  tags,
  onAdd,
  onEdit,
  onDelete
}: TagManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#10B981'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#10B981'
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setFormData({
      name: tag.name,
      slug: tag.slug,
      description: tag.description || '',
      color: tag.color
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (tag: Tag) => {
    setSelectedTag(tag);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (isEdit: boolean) => {
    try {
      if (isEdit && selectedTag) {
        await onEdit(selectedTag.id, formData);
        setIsEditModalOpen(false);
      } else {
        await onAdd(formData);
        setIsAddModalOpen(false);
      }
      resetForm();
      setSelectedTag(null);
    } catch (error) {
      console.error('태그 저장 실패:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTag) return;
    try {
      await onDelete(selectedTag.id);
      setIsDeleteModalOpen(false);
      setSelectedTag(null);
    } catch (error) {
      console.error('태그 삭제 실패:', error);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: '태그명',
      sortable: true,
      render: (value: string, row: Tag) => (
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded mr-3"
            style={{ backgroundColor: row.color }}
          />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.slug}</div>
          </div>
        </div>
      )
    },
    {
      key: 'description',
      label: '설명',
      render: (value: string) => value || '-'
    },
    {
      key: 'usageCount',
      label: '사용 횟수',
      sortable: true,
      render: (value: number) => (
        <span className="text-sm text-gray-600">
          {value.toLocaleString()}회
        </span>
      )
    },
    {
      key: 'createdAt',
      label: '생성일',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: Tag) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:text-blue-900"
            title="편집"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:text-red-900"
            title="삭제"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  const TagForm = ({ isEdit }: { isEdit: boolean }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          태그명 *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="태그명을 입력하세요"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          슬러그 *
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="URL에 사용될 슬러그"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          설명
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="태그 설명을 입력하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          색상
        </label>
        <input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
          className="w-full h-10 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (isEdit) {
              setIsEditModalOpen(false);
            } else {
              setIsAddModalOpen(false);
            }
            resetForm();
          }}
        >
          취소
        </Button>
        <Button
          type="button"
          onClick={() => handleSubmit(isEdit)}
        >
          {isEdit ? '수정' : '추가'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">태그 관리</h3>
        <Button onClick={handleAdd} className="inline-flex items-center">
          <PlusIcon className="h-4 w-4 mr-2" />
          태그 추가
        </Button>
      </div>

      <Table
        data={tags}
        columns={columns}
      />

      {/* 태그 추가 모달 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="새 태그 추가"
        size="lg"
      >
        <TagForm isEdit={false} />
      </Modal>

      {/* 태그 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="태그 수정"
        size="lg"
      >
        <TagForm isEdit={true} />
      </Modal>

      {/* 태그 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="태그 삭제"
        message={`정말로 "${selectedTag?.name}" 태그를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}
