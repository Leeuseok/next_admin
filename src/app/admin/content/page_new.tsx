'use client';

import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/Form';
import Modal, { ConfirmModal } from '@/components/Modal';
import ContentStatsCards from '@/components/content/ContentStatsCards';
import ContentFilters from '@/components/content/ContentFilters';
import ContentTable from '@/components/content/ContentTable';
import ContentForm from '@/components/content/ContentForm';
import ContentViewModal from '@/components/content/ContentViewModal';
import { useContent } from '@/hooks/useContent';
import type { Content } from '@/types/content';

export default function ContentPage() {
  const {
    contents,
    stats,
    loading,
    error,
    refreshContent,
    deleteContent,
    updateContent,
    createContent
  } = useContent();

  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  // 필터링 로직
  useEffect(() => {
    let filtered = contents;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(content => 
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (content.content && content.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        content.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (content.excerpt && content.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 타입 필터
    if (typeFilter) {
      filtered = filtered.filter(content => content.type === typeFilter);
    }

    // 상태 필터
    if (statusFilter) {
      filtered = filtered.filter(content => content.status === statusFilter);
    }

    // 카테고리 필터
    if (categoryFilter) {
      filtered = filtered.filter(content => content.category === categoryFilter);
    }

    setFilteredContents(filtered);
  }, [contents, searchTerm, typeFilter, statusFilter, categoryFilter]);

  const handleViewContent = (content: Content) => {
    setSelectedContent(content);
    setIsViewModalOpen(true);
  };

  const handleEditContent = (content: Content) => {
    setSelectedContent(content);
    setIsEditModalOpen(true);
  };

  const handleDeleteContent = (content: Content) => {
    setSelectedContent(content);
    setIsDeleteModalOpen(true);
  };

  const handleAddContent = async (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createContent(contentData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('콘텐츠 추가 실패:', error);
    }
  };

  const handleUpdateContent = async (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedContent) return;
    
    try {
      await updateContent(selectedContent.id, contentData);
      setIsEditModalOpen(false);
      setSelectedContent(null);
    } catch (error) {
      console.error('콘텐츠 수정 실패:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedContent) return;
    
    try {
      await deleteContent(selectedContent.id);
      setIsDeleteModalOpen(false);
      setSelectedContent(null);
    } catch (error) {
      console.error('콘텐츠 삭제 실패:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">콘텐츠 관리</h1>
          <p className="text-gray-600">게시글, 페이지, 뉴스, 제품 등 모든 콘텐츠를 관리하세요.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          새 콘텐츠 작성
        </Button>
      </div>

      {/* 통계 카드 */}
      <ContentStatsCards stats={stats} />

      {/* 검색 및 필터 */}
      <ContentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        resultCount={filteredContents.length}
      />

      {/* 콘텐츠 테이블 */}
      <ContentTable
        contents={filteredContents}
        onView={handleViewContent}
        onEdit={handleEditContent}
        onDelete={handleDeleteContent}
      />

      {/* 콘텐츠 추가 모달 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="새 콘텐츠 작성"
        size="lg"
      >
        <ContentForm
          onSubmit={handleAddContent}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* 콘텐츠 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="콘텐츠 수정"
        size="lg"
      >
        <ContentForm
          content={selectedContent || undefined}
          onSubmit={handleUpdateContent}
          onCancel={() => setIsEditModalOpen(false)}
          isEdit={true}
        />
      </Modal>

      {/* 콘텐츠 상세보기 모달 */}
      <ContentViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        content={selectedContent}
        onEdit={handleEditContent}
      />

      {/* 콘텐츠 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="콘텐츠 삭제"
        message={`정말로 "${selectedContent?.title}" 콘텐츠를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}
