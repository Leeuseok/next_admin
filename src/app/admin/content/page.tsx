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
import ContentReviewModal from '@/components/content/ContentReviewModal';
import CategoryManagement from '@/components/content/CategoryManagement';
import TagManagement from '@/components/content/TagManagement';
import { useContent } from '@/hooks/useContent';
import type { Content, Category, Tag } from '@/types/content';

export default function ContentPage() {
  const {
    contents,
    stats,
    loading,
    error,
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
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'categories' | 'tags'>('content');

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

  const handleReviewContent = (content: Content) => {
    setSelectedContent(content);
    setIsReviewModalOpen(true);
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

  const handleReviewApprove = async (id: string, notes?: string) => {
    if (!selectedContent) return;
    
    try {
      await updateContent(selectedContent.id, {
        ...selectedContent,
        status: 'approved',
        reviewer: '현재 관리자', // 실제로는 로그인한 사용자 정보 사용
        reviewNotes: notes,
        reviewedAt: new Date().toISOString()
      });
      setIsReviewModalOpen(false);
      setSelectedContent(null);
    } catch (error) {
      console.error('콘텐츠 승인 실패:', error);
    }
  };

  const handleReviewReject = async (id: string, notes: string) => {
    if (!selectedContent) return;
    
    try {
      await updateContent(selectedContent.id, {
        ...selectedContent,
        status: 'rejected',
        reviewer: '현재 관리자', // 실제로는 로그인한 사용자 정보 사용
        reviewNotes: notes,
        reviewedAt: new Date().toISOString()
      });
      setIsReviewModalOpen(false);
      setSelectedContent(null);
    } catch (error) {
      console.error('콘텐츠 반려 실패:', error);
    }
  };

  // 임시 카테고리/태그 데이터 (실제로는 별도 hook에서 관리)
  const mockCategories: Category[] = [
    {
      id: '1',
      name: '일반',
      slug: 'general',
      description: '일반적인 콘텐츠',
      color: '#3B82F6',
      sortOrder: 0,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: '공지사항',
      slug: 'notice',
      description: '중요한 공지사항',
      color: '#EF4444',
      sortOrder: 1,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: '제품',
      slug: 'product',
      description: '제품 관련 콘텐츠',
      color: '#10B981',
      sortOrder: 2,
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  const mockTags: Tag[] = [
    {
      id: '1',
      name: '신제품',
      slug: 'new-product',
      color: '#3B82F6',
      description: '새로 출시된 제품',
      usageCount: 15,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: '할인',
      slug: 'discount',
      color: '#EF4444',
      description: '할인 관련 콘텐츠',
      usageCount: 8,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: '이벤트',
      slug: 'event',
      color: '#F59E0B',
      description: '이벤트 관련 콘텐츠',
      usageCount: 12,
      createdAt: new Date().toISOString()
    }
  ];

  // 카테고리 관리 함수들
  const handleAddCategory = async (categoryData: Omit<Category, 'id' | 'createdAt'>) => {
    console.log('카테고리 추가:', categoryData);
    // 실제로는 API 호출
  };

  const handleEditCategory = async (id: string, categoryData: Partial<Category>) => {
    console.log('카테고리 수정:', id, categoryData);
    // 실제로는 API 호출
  };

  const handleDeleteCategory = async (id: string) => {
    console.log('카테고리 삭제:', id);
    // 실제로는 API 호출
  };

  // 태그 관리 함수들
  const handleAddTag = async (tagData: Omit<Tag, 'id' | 'createdAt' | 'usageCount'>) => {
    console.log('태그 추가:', tagData);
    // 실제로는 API 호출
  };

  const handleEditTag = async (id: string, tagData: Partial<Tag>) => {
    console.log('태그 수정:', id, tagData);
    // 실제로는 API 호출
  };

  const handleDeleteTag = async (id: string) => {
    console.log('태그 삭제:', id);
    // 실제로는 API 호출
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
        {activeTab === 'content' && (
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            새 콘텐츠 작성
          </Button>
        )}
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            콘텐츠 목록
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            카테고리 관리
          </button>
          <button
            onClick={() => setActiveTab('tags')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tags'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            태그 관리
          </button>
        </nav>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === 'content' && (
        <>
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
            onReview={handleReviewContent}
          />
        </>
      )}

      {activeTab === 'categories' && (
        <CategoryManagement
          categories={mockCategories}
          onAdd={handleAddCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      )}

      {activeTab === 'tags' && (
        <TagManagement
          tags={mockTags}
          onAdd={handleAddTag}
          onEdit={handleEditTag}
          onDelete={handleDeleteTag}
        />
      )}

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

      {/* 콘텐츠 검수 모달 */}
      <ContentReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        content={selectedContent}
        onApprove={handleReviewApprove}
        onReject={handleReviewReject}
      />
    </div>
  );
}
