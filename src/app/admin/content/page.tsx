'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  PhotoIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Table from '@/components/Table';
import Modal, { ConfirmModal } from '@/components/Modal';
import { Input, Select, Button, Textarea } from '@/components/Form';
import { formatDate, getStatusColor, cn, truncateText } from '@/lib/utils';
import { Content, TableColumn } from '@/types';

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([
    {
      id: '1',
      title: '관리자 페이지 소개',
      content: '이 페이지는 관리자를 위한 종합 관리 시스템입니다. 사용자 관리, 콘텐츠 관리, 통계 분석 등 다양한 기능을 제공합니다.',
      type: 'post',
      status: 'published',
      authorId: '1',
      category: '공지사항',
      tags: ['공지', '소개', '관리'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      publishedAt: new Date('2024-01-15'),
      views: 1250
    },
    {
      id: '2',
      title: '시스템 업데이트 안내',
      content: '시스템 업데이트가 2024년 1월 20일에 예정되어 있습니다. 업데이트 중에는 일시적으로 서비스 이용이 제한될 수 있습니다.',
      type: 'post',
      status: 'published',
      authorId: '2',
      category: '업데이트',
      tags: ['업데이트', '공지', '시스템'],
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      publishedAt: new Date('2024-01-14'),
      views: 856
    },
    {
      id: '3',
      title: '신규 상품 등록',
      content: '새로운 상품이 등록되었습니다. 다양한 기능과 우수한 품질을 자랑하는 제품입니다.',
      type: 'product',
      status: 'draft',
      authorId: '1',
      category: '상품',
      tags: ['상품', '신규', '등록'],
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-13'),
      views: 425
    },
    {
      id: '4',
      title: '자주 묻는 질문',
      content: '사용자들이 자주 묻는 질문들을 모아 정리한 페이지입니다. 서비스 이용에 도움이 되는 정보를 제공합니다.',
      type: 'page',
      status: 'published',
      authorId: '2',
      category: '고객지원',
      tags: ['FAQ', '질문', '답변'],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12'),
      publishedAt: new Date('2024-01-12'),
      views: 2341
    },
    {
      id: '5',
      title: '이벤트 공지',
      content: '새해 맞이 특별 이벤트를 진행합니다. 많은 참여 부탁드립니다.',
      type: 'post',
      status: 'scheduled',
      authorId: '3',
      category: '이벤트',
      tags: ['이벤트', '새해', '특별'],
      createdAt: new Date('2024-01-11'),
      updatedAt: new Date('2024-01-11'),
      publishedAt: new Date('2024-01-20'),
      views: 0
    }
  ]);

  const [filteredContents, setFilteredContents] = useState<Content[]>(contents);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [newContent, setNewContent] = useState({
    title: '',
    content: '',
    type: 'post' as 'post' | 'product' | 'page',
    status: 'draft' as 'published' | 'draft' | 'scheduled',
    category: '',
    tags: [] as string[],
    tagInput: ''
  });

  const categories = ['공지사항', '업데이트', '상품', '고객지원', '이벤트', '기타'];

  useEffect(() => {
    let filtered = contents;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(content => 
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddContent = () => {
    const content: Content = {
      id: Date.now().toString(),
      title: newContent.title,
      content: newContent.content,
      type: newContent.type,
      status: newContent.status,
      authorId: '1', // 현재 로그인한 사용자 ID
      category: newContent.category,
      tags: newContent.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: newContent.status === 'published' ? new Date() : undefined,
      views: 0
    };
    setContents([...contents, content]);
    setNewContent({
      title: '',
      content: '',
      type: 'post',
      status: 'draft',
      category: '',
      tags: [],
      tagInput: ''
    });
    setIsAddModalOpen(false);
  };

  const handleEditContent = () => {
    if (selectedContent) {
      setContents(contents.map(content => 
        content.id === selectedContent.id 
          ? { ...selectedContent, updatedAt: new Date() }
          : content
      ));
      setIsEditModalOpen(false);
      setSelectedContent(null);
    }
  };

  const handleDeleteContent = () => {
    if (selectedContent) {
      setContents(contents.filter(content => content.id !== selectedContent.id));
      setIsDeleteModalOpen(false);
      setSelectedContent(null);
    }
  };

  const handleAddTag = (tagInput: string) => {
    if (tagInput.trim() && !newContent.tags.includes(tagInput.trim())) {
      setNewContent({
        ...newContent,
        tags: [...newContent.tags, tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewContent({
      ...newContent,
      tags: newContent.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const columns: TableColumn[] = [
    {
      key: 'title',
      label: '제목',
      sortable: true,
      render: (value: string, row: Content) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            {row.type === 'post' ? (
              <DocumentTextIcon className="h-4 w-4 text-blue-600" />
            ) : row.type === 'product' ? (
              <PhotoIcon className="h-4 w-4 text-green-600" />
            ) : (
              <DocumentTextIcon className="h-4 w-4 text-purple-600" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">
              {truncateText(row.content, 50)}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: '타입',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          value === 'post' ? 'bg-blue-100 text-blue-800' :
          value === 'product' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        )}>
          {value === 'post' ? '게시글' :
           value === 'product' ? '상품' : '페이지'}
        </span>
      )
    },
    {
      key: 'status',
      label: '상태',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          getStatusColor(value)
        )}>
          {value === 'published' ? '게시됨' :
           value === 'draft' ? '초안' : '예약'}
        </span>
      )
    },
    {
      key: 'category',
      label: '카테고리',
      sortable: true
    },
    {
      key: 'views',
      label: '조회수',
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    {
      key: 'publishedAt',
      label: '게시일',
      sortable: true,
      render: (value: Date) => value ? formatDate(value) : '-'
    },
    {
      key: 'createdAt',
      label: '작성일',
      sortable: true,
      render: (value: Date) => formatDate(value)
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: Content) => (
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
                      setSelectedContent(row);
                      setIsViewModalOpen(true);
                    }}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm w-full text-left',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )}
                  >
                    <EyeIcon className="mr-3 h-4 w-4" />
                    상세보기
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setSelectedContent(row);
                      setIsEditModalOpen(true);
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
                      setSelectedContent(row);
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

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">콘텐츠 관리</h1>
          <p className="text-gray-600">게시글, 상품, 페이지 등 모든 콘텐츠를 관리하세요.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          새 콘텐츠 작성
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="search"
              placeholder="제목, 내용, 카테고리 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            name="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[
              { value: '', label: '모든 타입' },
              { value: 'post', label: '게시글' },
              { value: 'product', label: '상품' },
              { value: 'page', label: '페이지' }
            ]}
          />
          <Select
            name="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: '모든 상태' },
              { value: 'published', label: '게시됨' },
              { value: 'draft', label: '초안' },
              { value: 'scheduled', label: '예약' }
            ]}
          />
          <Select
            name="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: '', label: '모든 카테고리' },
              ...categories.map(cat => ({ value: cat, label: cat }))
            ]}
          />
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredContents.length}개 결과
            </span>
          </div>
        </div>
      </div>

      {/* 콘텐츠 테이블 */}
      <Table
        data={filteredContents}
        columns={columns}
        onRowClick={(content) => {
          setSelectedContent(content);
          setIsViewModalOpen(true);
        }}
      />

      {/* 콘텐츠 추가 모달 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="새 콘텐츠 작성"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            name="title"
            label="제목"
            value={newContent.title}
            onChange={(e) => setNewContent({...newContent, title: e.target.value})}
            required
          />
          <Textarea
            name="content"
            label="내용"
            value={newContent.content}
            onChange={(e) => setNewContent({...newContent, content: e.target.value})}
            rows={6}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              name="type"
              label="타입"
              value={newContent.type}
              onChange={(e) => setNewContent({...newContent, type: e.target.value as any})}
              options={[
                { value: 'post', label: '게시글' },
                { value: 'product', label: '상품' },
                { value: 'page', label: '페이지' }
              ]}
            />
            <Select
              name="status"
              label="상태"
              value={newContent.status}
              onChange={(e) => setNewContent({...newContent, status: e.target.value as any})}
              options={[
                { value: 'draft', label: '초안' },
                { value: 'published', label: '게시됨' },
                { value: 'scheduled', label: '예약' }
              ]}
            />
          </div>
          <Select
            name="category"
            label="카테고리"
            value={newContent.category}
            onChange={(e) => setNewContent({...newContent, category: e.target.value})}
            options={categories.map(cat => ({ value: cat, label: cat }))}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {newContent.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <Input
                name="tagInput"
                placeholder="태그를 입력하세요"
                value={newContent.tagInput}
                onChange={(e) => setNewContent({...newContent, tagInput: e.target.value})}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(newContent.tagInput);
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleAddTag(newContent.tagInput)}
                className="ml-2"
              >
                추가
              </Button>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleAddContent}>
              저장
            </Button>
          </div>
        </div>
      </Modal>

      {/* 콘텐츠 상세보기 모달 */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="콘텐츠 상세정보"
        size="xl"
      >
        {selectedContent && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">{selectedContent.title}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  selectedContent.type === 'post' ? 'bg-blue-100 text-blue-800' :
                  selectedContent.type === 'product' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                )}>
                  {selectedContent.type === 'post' ? '게시글' :
                   selectedContent.type === 'product' ? '상품' : '페이지'}
                </span>
                <span className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  getStatusColor(selectedContent.status)
                )}>
                  {selectedContent.status === 'published' ? '게시됨' :
                   selectedContent.status === 'draft' ? '초안' : '예약'}
                </span>
                <span className="text-sm text-gray-500">
                  조회수: {selectedContent.views.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">내용</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-900 whitespace-pre-line">{selectedContent.content}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">카테고리</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContent.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">태그</label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedContent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">작성일</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedContent.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">게시일</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedContent.publishedAt ? formatDate(selectedContent.publishedAt) : '-'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={() => setIsViewModalOpen(false)}
              >
                닫기
              </Button>
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setIsEditModalOpen(true);
                }}
              >
                수정
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 콘텐츠 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="콘텐츠 수정"
        size="lg"
      >
        {selectedContent && (
          <div className="space-y-4">
            <Input
              name="title"
              label="제목"
              value={selectedContent.title}
              onChange={(e) => setSelectedContent({...selectedContent, title: e.target.value})}
              required
            />
            <Textarea
              name="content"
              label="내용"
              value={selectedContent.content}
              onChange={(e) => setSelectedContent({...selectedContent, content: e.target.value})}
              rows={6}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                name="type"
                label="타입"
                value={selectedContent.type}
                onChange={(e) => setSelectedContent({...selectedContent, type: e.target.value as any})}
                options={[
                  { value: 'post', label: '게시글' },
                  { value: 'product', label: '상품' },
                  { value: 'page', label: '페이지' }
                ]}
              />
              <Select
                name="status"
                label="상태"
                value={selectedContent.status}
                onChange={(e) => setSelectedContent({...selectedContent, status: e.target.value as any})}
                options={[
                  { value: 'draft', label: '초안' },
                  { value: 'published', label: '게시됨' },
                  { value: 'scheduled', label: '예약' }
                ]}
              />
            </div>
            <Select
              name="category"
              label="카테고리"
              value={selectedContent.category}
              onChange={(e) => setSelectedContent({...selectedContent, category: e.target.value})}
              options={categories.map(cat => ({ value: cat, label: cat }))}
            />
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                취소
              </Button>
              <Button onClick={handleEditContent}>
                저장
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 콘텐츠 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteContent}
        title="콘텐츠 삭제"
        message={`정말로 "${selectedContent?.title}" 콘텐츠를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </div>
  );
}
