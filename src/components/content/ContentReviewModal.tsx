import { useState } from 'react';
import type { Content } from '@/types/content';
import Modal from '@/components/Modal';
import { Button } from '@/components/Form';

interface ContentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: Content | null;
  onApprove: (id: string, notes?: string) => Promise<void>;
  onReject: (id: string, notes: string) => Promise<void>;
}

export default function ContentReviewModal({
  isOpen,
  onClose,
  content,
  onApprove,
  onReject
}: ContentReviewModalProps) {
  const [reviewNotes, setReviewNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!content) return null;

  const handleApprove = async () => {
    setLoading(true);
    try {
      await onApprove(content.id, reviewNotes);
      onClose();
      setReviewNotes('');
    } catch (error) {
      console.error('승인 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reviewNotes.trim()) {
      alert('반려 사유를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    try {
      await onReject(content.id, reviewNotes);
      onClose();
      setReviewNotes('');
    } catch (error) {
      console.error('반려 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Content['status']) => {
    const statusStyles = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      scheduled: 'bg-purple-100 text-purple-800',
      archived: 'bg-gray-100 text-gray-600'
    };

    const statusLabels = {
      draft: '임시저장',
      pending: '검토 대기',
      approved: '승인됨',
      published: '게시됨',
      rejected: '반려됨',
      scheduled: '예약됨',
      archived: '보관됨'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const getPriorityBadge = (priority: Content['priority']) => {
    const priorityStyles = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700'
    };

    const priorityLabels = {
      low: '낮음',
      medium: '보통',
      high: '높음'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityStyles[priority]}`}>
        {priorityLabels[priority]}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="콘텐츠 검수" size="lg">
      <div className="space-y-6">
        {/* 콘텐츠 정보 */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
              <p className="text-sm text-gray-600 mt-1">작성자: {content.author}</p>
              <p className="text-sm text-gray-600">
                작성일: {new Date(content.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              {getStatusBadge(content.status)}
              {getPriorityBadge(content.priority)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">타입:</span>
              <span className="ml-2 text-gray-600">{content.type}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">카테고리:</span>
              <span className="ml-2 text-gray-600">{content.category}</span>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-700">태그:</span>
              <span className="ml-2 text-gray-600">{content.tags.join(', ')}</span>
            </div>
          </div>

          {content.excerpt && (
            <div className="mt-4">
              <span className="font-medium text-gray-700">요약:</span>
              <p className="mt-1 text-gray-600">{content.excerpt}</p>
            </div>
          )}

          {content.content && (
            <div className="mt-4">
              <span className="font-medium text-gray-700">내용:</span>
              <div className="mt-1 p-3 bg-white border rounded text-sm text-gray-600 max-h-40 overflow-y-auto">
                {content.content}
              </div>
            </div>
          )}

          {content.imageUrl && (
            <div className="mt-4">
              <span className="font-medium text-gray-700">이미지:</span>
              <img 
                src={content.imageUrl} 
                alt={content.title}
                className="mt-2 max-w-xs rounded border"
              />
            </div>
          )}

          {content.reviewNotes && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <span className="font-medium text-yellow-800">이전 검토 의견:</span>
              <p className="mt-1 text-yellow-700">{content.reviewNotes}</p>
            </div>
          )}
        </div>

        {/* 검토 의견 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            검토 의견
          </label>
          <textarea
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="검토 의견을 입력하세요. 반려 시 필수입니다."
          />
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleReject}
            disabled={loading}
          >
            반려
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleApprove}
            disabled={loading}
          >
            승인
          </Button>
        </div>
      </div>
    </Modal>
  );
}
