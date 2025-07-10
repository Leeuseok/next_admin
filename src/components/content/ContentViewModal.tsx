import Modal from '@/components/Modal';
import { Button } from '@/components/Form';
import { formatDate, cn } from '@/lib/utils';
import type { Content } from '@/types/content';

interface ContentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: Content | null;
  onEdit: (content: Content) => void;
}

export default function ContentViewModal({ isOpen, onClose, content, onEdit }: ContentViewModalProps) {
  if (!content) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 text-blue-800';
      case 'page':
        return 'bg-orange-100 text-orange-800';
      case 'news':
        return 'bg-purple-100 text-purple-800';
      case 'product':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return '게시됨';
      case 'draft':
        return '초안';
      case 'archived':
        return '보관됨';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return '게시글';
      case 'page':
        return '페이지';
      case 'news':
        return '뉴스';
      case 'product':
        return '제품';
      default:
        return type;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="콘텐츠 상세정보"
      size="xl"
    >
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">{content.title}</h3>
          <div className="flex items-center space-x-4">
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              getTypeColor(content.type)
            )}>
              {getTypeLabel(content.type)}
            </span>
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              getStatusColor(content.status)
            )}>
              {getStatusLabel(content.status)}
            </span>
            <span className="text-sm text-gray-500">
              조회수: {content.viewCount.toLocaleString()}
            </span>
            {content.featured && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                추천
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {content.excerpt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">요약</label>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-900">{content.excerpt}</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
            <div className="p-3 bg-gray-50 rounded-md max-h-64 overflow-y-auto">
              <p className="text-sm text-gray-900 whitespace-pre-line">{content.content}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <p className="text-sm text-gray-900">{content.category}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
              <p className="text-sm text-gray-900">{content.author}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">작성일</label>
              <p className="text-sm text-gray-900">{formatDate(new Date(content.createdAt))}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">게시일</label>
              <p className="text-sm text-gray-900">
                {content.publishedAt ? formatDate(new Date(content.publishedAt)) : '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            닫기
          </Button>
          <Button
            onClick={() => {
              onClose();
              onEdit(content);
            }}
          >
            수정
          </Button>
        </div>
      </div>
    </Modal>
  );
}
