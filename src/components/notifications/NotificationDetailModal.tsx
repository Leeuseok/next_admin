import React from 'react';
import Modal from '@/components/Modal';
import { Button } from '@/components/Form';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import type { Notification } from '@/types/notifications';

interface NotificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationDetailModal({ 
  isOpen, 
  onClose, 
  notification,
  onMarkAsRead
}: NotificationDetailModalProps) {
  if (!notification) return null;

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">높음</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">보통</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">낮음</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Notification['status']) => {
    switch (status) {
      case 'unread':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">읽지 않음</span>;
      case 'read':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">읽음</span>;
      case 'archived':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">보관됨</span>;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="알림 상세"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {getTypeIcon(notification.type)}
          <h3 className="text-lg font-medium">{notification.title}</h3>
        </div>
        <p className="text-gray-600">{notification.message}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">우선순위:</span>
            <div className="mt-1">{getPriorityBadge(notification.priority)}</div>
          </div>
          <div>
            <span className="font-medium">상태:</span>
            <div className="mt-1">{getStatusBadge(notification.status)}</div>
          </div>
          <div>
            <span className="font-medium">카테고리:</span>
            <p className="mt-1">{notification.category}</p>
          </div>
          <div>
            <span className="font-medium">생성일시:</span>
            <p className="mt-1">{new Date(notification.createdAt).toLocaleString('ko-KR')}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            닫기
          </Button>
          {notification.status === 'unread' && (
            <Button
              onClick={() => {
                onMarkAsRead(notification.id);
                onClose();
              }}
            >
              읽음으로 표시
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
