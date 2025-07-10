import React from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/Form';
import type { Inquiry, InquiryResponse, User, Admin } from '@/types/inquiries';
import { formatDate, getTimeAgo } from '@/lib/utils';
import { 
  ClockIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface InquiryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: Inquiry | null;
  responses: InquiryResponse[];
  users: User[];
  admins: Admin[];
  onReply: () => void;
}

export default function InquiryDetailModal({
  isOpen,
  onClose,
  inquiry,
  responses,
  users,
  admins,
  onReply
}: InquiryDetailModalProps) {
  if (!inquiry) return null;
  
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };
  
  const user = users.find(u => u.id === inquiry.userId);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="문의 상세정보"
      size="xl"
    >
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{inquiry.title}</h3>
                <p className="text-sm text-gray-500">
                  {user?.name} • {formatDate(inquiry.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(inquiry.status)}
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(inquiry.status)
              )}>
                {inquiry.status === 'pending' ? '대기' :
                 inquiry.status === 'in_progress' ? '진행중' :
                 inquiry.status === 'resolved' ? '해결' : '종료'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">문의 내용</h4>
          <div className="bg-gray-50 rounded-md p-4">
            <p className="text-sm text-gray-900 whitespace-pre-line">{inquiry.content}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">유형</label>
            <p className="mt-1 text-sm text-gray-900">
              {inquiry.type === 'bug' ? '버그' :
               inquiry.type === 'feature' ? '기능요청' :
               inquiry.type === 'complaint' ? '불만' : '일반'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">담당자</label>
            <p className="mt-1 text-sm text-gray-900">
              {inquiry.assignedTo ? 
                admins.find(a => a.id === inquiry.assignedTo)?.name : '미배정'}
            </p>
          </div>
        </div>

        {responses.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-4">답변 내역</h4>
            <div className="space-y-4">
              {responses.map((response) => (
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
            onClick={onClose}
          >
            닫기
          </Button>
          <Button onClick={onReply}>
            답변하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
