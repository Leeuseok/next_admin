'use client';

import { useState } from 'react';
import InquiryFilters from '@/components/inquiries/InquiryFilters';
import InquiryTable from '@/components/inquiries/InquiryTable';
import InquiryDetailModal from '@/components/inquiries/InquiryDetailModal';
import ResponseModal from '@/components/inquiries/ResponseModal';
import { useInquiries } from '@/hooks/useInquiries';
import type { Inquiry } from '@/types/inquiries';

export default function InquiriesPage() {
  const {
    inquiries,
    users,
    admins,
    loading,
    error,
    stats,
    filters,
    updateFilters,
    updateInquiryStatus,
    updateInquiryAssignee,
    addResponse,
    getInquiryResponses,
    refreshInquiries
  } = useInquiries();
  
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [newResponse, setNewResponse] = useState('');

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
  };

  const handleReplyInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsResponseModalOpen(true);
  };

  const handleAddResponse = () => {
    if (selectedInquiry && newResponse.trim()) {
      addResponse(selectedInquiry.id, newResponse, '1'); // '1' is the current admin ID
      setNewResponse('');
      setIsResponseModalOpen(false);
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    updateInquiryStatus(id, status as any);
  };

  const handleAssigneeChange = (id: string, assigneeId: string) => {
    updateInquiryAssignee(id, assigneeId);
  };

  if (loading) {
    return <div className="flex justify-center p-8">로드 중...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
          <button
            onClick={refreshInquiries}
            className="ml-4 underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const inquiryResponses = selectedInquiry ? getInquiryResponses(selectedInquiry.id) : [];

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
            대기: {stats.pendingCount}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            진행중: {stats.inProgressCount}
          </span>
        </div>
      </div>

      {/* 필터링 */}
      <InquiryFilters
        filters={filters}
        admins={admins}
        onFilterChange={updateFilters}
        resultsCount={inquiries.length}
      />

      {/* 문의 테이블 */}
      <InquiryTable
        inquiries={inquiries}
        users={users}
        admins={admins}
        onView={handleViewInquiry}
        onReply={handleReplyInquiry}
        onStatusChange={handleStatusChange}
        onAssigneeChange={handleAssigneeChange}
      />

      {/* 문의 상세 모달 */}
      <InquiryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        inquiry={selectedInquiry}
        responses={inquiryResponses}
        users={users}
        admins={admins}
        onReply={() => {
          setIsDetailModalOpen(false);
          setIsResponseModalOpen(true);
        }}
      />

      {/* 답변 작성 모달 */}
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        inquiry={selectedInquiry}
        response={newResponse}
        onResponseChange={(value) => setNewResponse(value)}
        onSubmit={handleAddResponse}
      />
    </div>
  );
}
