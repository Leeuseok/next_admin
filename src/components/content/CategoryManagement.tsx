import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/Form';
import Modal, { ConfirmModal } from '@/components/Modal';
import Table from '@/components/Table';
import type { Category } from '@/types/content';
import type { TableColumn } from '@/types';

interface CategoryManagementProps {
  categories: Category[];
  onAdd: (category: Omit<Category, 'id' | 'createdAt'>) => Promise<void>;
  onEdit: (id: string, category: Partial<Category>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function CategoryManagement({
  categories,
  onAdd,
  onEdit,
  onDelete
}: CategoryManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6',
    parentId: '',
    sortOrder: 0,
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3B82F6',
      parentId: '',
      sortOrder: 0,
      isActive: true
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color,
      parentId: category.parentId || '',
      sortOrder: category.sortOrder,
      isActive: category.isActive
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (isEdit: boolean) => {
    try {
      if (isEdit && selectedCategory) {
        await onEdit(selectedCategory.id, formData);
        setIsEditModalOpen(false);
      } else {
        await onAdd(formData);
        setIsAddModalOpen(false);
      }
      resetForm();
      setSelectedCategory(null);
    } catch (error) {
      console.error('카테고리 저장 실패:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await onDelete(selectedCategory.id);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
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
      label: '카테고리명',
      sortable: true,
      render: (value: string, row: Category) => (
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
      key: 'sortOrder',
      label: '순서',
      sortable: true
    },
    {
      key: 'isActive',
      label: '상태',
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? '활성' : '비활성'}
        </span>
      )
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: Category) => (
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

  const CategoryForm = ({ isEdit }: { isEdit: boolean }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          카테고리명 *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="카테고리명을 입력하세요"
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
          placeholder="카테고리 설명을 입력하세요"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            정렬 순서
          </label>
          <input
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          활성 상태
        </label>
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
        <h3 className="text-lg font-medium text-gray-900">카테고리 관리</h3>
        <Button onClick={handleAdd} className="inline-flex items-center">
          <PlusIcon className="h-4 w-4 mr-2" />
          카테고리 추가
        </Button>
      </div>

      <Table
        data={categories}
        columns={columns}
      />

      {/* 카테고리 추가 모달 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="새 카테고리 추가"
        size="lg"
      >
        <CategoryForm isEdit={false} />
      </Modal>

      {/* 카테고리 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="카테고리 수정"
        size="lg"
      >
        <CategoryForm isEdit={true} />
      </Modal>

      {/* 카테고리 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="카테고리 삭제"
        message={`정말로 "${selectedCategory?.name}" 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}
