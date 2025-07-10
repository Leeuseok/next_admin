'use client';

import { useState, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import { Input, Select, Button, Textarea } from '@/components/Form';
import { formatDate, getStatusColor, cn, getTimeAgo } from '@/lib/utils';
import { Inquiry, InquiryResponse, TableColumn } from '@/types';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: '1',
      title: '로그인 문제',
      content: '로그인이 되지 않습니다. 비밀번호를 재설정해도 같은 문제가 발생합니다.',
      type: 'bug',
      status: 'pending',
      userId: '1',
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      title: '새로운 기능 요청',
      content: '대시보드에 더 많은 차트 옵션을 추가해주세요.',
      type: 'feature',
      status: 'in_progress',
      userId: '2',
      assignedTo: '1',
      createdAt: new Date('2024-01-14T15:20:00'),
      updatedAt: new Date('2024-01-14T16:45:00')
    },
    {
      id: '3',
      title: '서비스 불만',
      content: '결제 처리가 너무 느립니다. 개선이 필요합니다.',
      type: 'complaint',
      status: 'resolved',
      userId: '3',
      assignedTo: '2',
      createdAt: new Date('2024-01-13T09:15:00'),
      updatedAt: new Date('2024-01-13T14:20:00'),
      resolvedAt: new Date('2024-01-13T14:20:00')
    },
    {
      id: '4',
      title: '일반 문의',
      content: '사용법에 대해 자세히 알고 싶습니다.',
      type: 'general',
      status: 'closed',
      userId: '4',
      assignedTo: '1',
      createdAt: new Date('2024-01-12T11:30:00'),
      updatedAt: new Date('2024-01-12T16:00:00')
    },
    {
      id: '5',
      title: '페이지 로딩 오류',
      content: '특정 페이지가 로딩되지 않습니다. 오류 메시지가 표시됩니다.',
      type: 'bug',
      status: 'pending',
      userId: '5',
      createdAt: new Date('2024-01-11T14:45:00'),
      updatedAt: new Date('2024-01-11T14:45:00')
    }
  ]);

  const [responses, setResponses] = useState<InquiryResponse[]>([
    {
      id: '1',
      inquiryId: '2',
      content: '해당 기능에 대해 검토 중입니다. 다음 업데이트에서 반영될 예정입니다.',
      authorId: '1',
      createdAt: new Date('2024-01-14T16:45:00'),
      isInternal: false
    },
    {
      id: '2',
      inquiryId: '3',
      content: '결제 시스템을 개선하였습니다. 이제 더 빠른 처리가 가능합니다.',
      authorId: '2',
      createdAt: new Date('2024-01-13T14:20:00'),
      isInternal: false
    }
  ]);

  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>(inquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [newResponse, setNewResponse] = useState('');

  const users = [
    { id: '1', name: '김철수', email: 'kim@example.com' },
    { id: '2', name: '이영희', email: 'lee@example.com' },
    { id: '3', name: '박민수', email: 'park@example.com' },
    { id: '4', name: '정수진', email: 'jung@example.com' },
    { id: '5', name: '최민호', email: 'choi@example.com' }
  ];

  const admins = [
    { id: '1', name: '관리자1' },
    { id: '2', name: '관리자2' }
  ];

  useEffect(() => {
    let filtered = inquiries;

    if (searchTerm) {
      filtered = filtered.filter(inquiry => 
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(inquiry => inquiry.status === statusFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(inquiry => inquiry.type === typeFilter);
    }

    if (assigneeFilter) {
      filtered = filtered.filter(inquiry => inquiry.assignedTo === assigneeFilter);
    }

    setFilteredInquiries(filtered);
  }, [inquiries, searchTerm, statusFilter, typeFilter, assigneeFilter]);

  const handleStatusChange = (inquiryId: string, newStatus: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === inquiryId 
        ? { 
            ...inquiry, 
            status: newStatus as any,
            updatedAt: new Date(),
            resolvedAt: newStatus === 'resolved' ? new Date() : undefined
          }
        : inquiry
    ));
  };

  const handleAssigneeChange = (inquiryId: string, assigneeId: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === inquiryId 
        ? { 
            ...inquiry, 
            assignedTo: assigneeId || undefined,
            updatedAt: new Date()
          }
        : inquiry
    ));
  };

  const handleAddResponse = () => {
    if (selectedInquiry && newResponse.trim()) {
      const response: InquiryResponse = {
        id: Date.now().toString(),
        inquiryId: selectedInquiry.id,
        content: newResponse,
        authorId: '1', // 현재 로그인한 관리자 ID
        createdAt: new Date(),
        isInternal: false
      };
      setResponses([...responses, response]);
      setNewResponse('');
      setIsResponseModalOpen(false);
      
      // 문의 상태를 '진행 중'으로 업데이트
      if (selectedInquiry.status === 'pending') {
        handleStatusChange(selectedInquiry.id, 'in_progress');
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <ExclamationTriangleIcon className="h-4 w-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircleIcon className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      case 'feature':
        return <PlusIcon className="h-4 w-4 text-green-500" />;
      case 'complaint':
        return <XCircleIcon className="h-4 w-4 text-orange-500" />;
      default:
        return <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  const columns: TableColumn[] = [
    {
      key: 'title',
      label: '제목',
      sortable: true,
      render: (value: string, row: Inquiry) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            {getTypeIcon(row.type)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">
              {users.find(u => u.id === row.userId)?.name || '알 수 없음'}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: '유형',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          value === 'bug' ? 'bg-red-100 text-red-800' :
          value === 'feature' ? 'bg-green-100 text-green-800' :
          value === 'complaint' ? 'bg-orange-100 text-orange-800' :
          'bg-blue-100 text-blue-800'
        )}>
          {value === 'bug' ? '버그' :
           value === 'feature' ? '기능요청' :
           value === 'complaint' ? '불만' : '일반'}
        </span>
      )
    },
    {
      key: 'status',
      label: '상태',
      sortable: true,
      render: (value: string, row: Inquiry) => (
        <div className="flex items-center">
          {getStatusIcon(value)}
          <span className={cn(
            'ml-2 px-2 py-1 text-xs font-medium rounded-full',
            getStatusColor(value)
          )}>
            {value === 'pending' ? '대기' :
             value === 'in_progress' ? '진행중' :
             value === 'resolved' ? '해결' : '종료'}
          </span>
        </div>
      )
    },
    {
      key: 'assignedTo',
      label: '담당자',
      render: (value: string) => (
        <span className="text-sm text-gray-900">
          {value ? admins.find(a => a.id === value)?.name || '알 수 없음' : '미배정'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: '등록일',
      sortable: true,
      render: (value: Date) => (
        <div>
          <div className="text-sm text-gray-900">{formatDate(value)}</div>
          <div className="text-xs text-gray-500">{getTimeAgo(value)}</div>
        </div>
      )
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: Inquiry) => (
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
                      setSelectedInquiry(row);
                      setIsDetailModalOpen(true);
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
                      setSelectedInquiry(row);
                      setIsResponseModalOpen(true);
                    }}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm w-full text-left',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )}
                  >
                    <PencilIcon className="mr-3 h-4 w-4" />
                    답변하기
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="px-4 py-2">
                    <Select
                      name="status"
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      options={[
                        { value: 'pending', label: '대기' },
                        { value: 'in_progress', label: '진행중' },
                        { value: 'resolved', label: '해결' },
                        { value: 'closed', label: '종료' }
                      ]}
                    />
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="px-4 py-2">
                    <Select
                      name="assignee"
                      value={row.assignedTo || ''}
                      onChange={(e) => handleAssigneeChange(row.id, e.target.value)}
                      options={[
                        { value: '', label: '미배정' },
                        ...admins.map(admin => ({ value: admin.id, label: admin.name }))
                      ]}
                    />
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      )
    }
  ];

  const inquiryResponses = responses.filter(r => r.inquiryId === selectedInquiry?.id);

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">문의/답변 관리</h1>
          <p className="text-gray-600">사용자 문의를 관리하고 답변을 제공하세요.</p>
        </div>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            대기: {inquiries.filter(i => i.status === 'pending').length}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            진행중: {inquiries.filter(i => i.status === 'in_progress').length}
          </span>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              name="search"
              placeholder="제목, 내용 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            name="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: '모든 상태' },
              { value: 'pending', label: '대기' },
              { value: 'in_progress', label: '진행중' },
              { value: 'resolved', label: '해결' },
              { value: 'closed', label: '종료' }
            ]}
          />
          <Select
            name="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[
              { value: '', label: '모든 유형' },
              { value: 'general', label: '일반' },
              { value: 'bug', label: '버그' },
              { value: 'feature', label: '기능요청' },
              { value: 'complaint', label: '불만' }
            ]}
          />
          <Select
            name="assignee"
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            options={[
              { value: '', label: '모든 담당자' },
              ...admins.map(admin => ({ value: admin.id, label: admin.name }))
            ]}
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {filteredInquiries.length}개 결과
            </span>
          </div>
        </div>
      </div>

      {/* 문의 테이블 */}
      <Table
        data={filteredInquiries}
        columns={columns}
        onRowClick={(inquiry) => {
          setSelectedInquiry(inquiry);
          setIsDetailModalOpen(true);
        }}
      />

      {/* 문의 상세 모달 */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="문의 상세정보"
        size="xl"
      >
        {selectedInquiry && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(selectedInquiry.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedInquiry.title}</h3>
                    <p className="text-sm text-gray-500">
                      {users.find(u => u.id === selectedInquiry.userId)?.name} • {formatDate(selectedInquiry.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedInquiry.status)}
                  <span className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusColor(selectedInquiry.status)
                  )}>
                    {selectedInquiry.status === 'pending' ? '대기' :
                     selectedInquiry.status === 'in_progress' ? '진행중' :
                     selectedInquiry.status === 'resolved' ? '해결' : '종료'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">문의 내용</h4>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm text-gray-900 whitespace-pre-line">{selectedInquiry.content}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">유형</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedInquiry.type === 'bug' ? '버그' :
                   selectedInquiry.type === 'feature' ? '기능요청' :
                   selectedInquiry.type === 'complaint' ? '불만' : '일반'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">담당자</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedInquiry.assignedTo ? 
                    admins.find(a => a.id === selectedInquiry.assignedTo)?.name : '미배정'}
                </p>
              </div>
            </div>

            {inquiryResponses.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-4">답변 내역</h4>
                <div className="space-y-4">
                  {inquiryResponses.map((response) => (
                    <div key={response.id} className="bg-blue-50 rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {admins.find(a => a.id === response.authorId)?.name || '관리자'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(response.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 whitespace-pre-line">{response.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={() => setIsDetailModalOpen(false)}
              >
                닫기
              </Button>
              <Button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setIsResponseModalOpen(true);
                }}
              >
                답변하기
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 답변 작성 모달 */}
      <Modal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        title="답변 작성"
        size="lg"
      >
        {selectedInquiry && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="font-medium text-gray-900 mb-2">문의 제목</h4>
              <p className="text-sm text-gray-600">{selectedInquiry.title}</p>
            </div>
            <Textarea
              name="response"
              label="답변 내용"
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              rows={6}
              placeholder="답변을 입력하세요..."
              required
            />
            <div className="flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={() => setIsResponseModalOpen(false)}
              >
                취소
              </Button>
              <Button 
                onClick={handleAddResponse}
                disabled={!newResponse.trim()}
              >
                답변 등록
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
