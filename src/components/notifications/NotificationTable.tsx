import React from 'react';
import Table from '@/components/Table';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import type { Notification } from '@/types/notifications';
import type { TableColumn } from '@/types';

interface NotificationTableProps {
  notifications: Notification[];
  onView: (notification: Notification) => void;
  onDelete: (id: string) => void;
}

export default function NotificationTable({ notifications, onView, onDelete }: NotificationTableProps) {
  // 알림 타입별 아이콘 및 색상
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

  const columns: TableColumn[] = [
    { 
      key: 'type', 
      label: '타입',
      render: (_, row: Notification) => getTypeIcon(row.type) 
    },
    { 
      key: 'title', 
      label: '제목',
      render: (value: string) => value 
    },
    { 
      key: 'priority', 
      label: '우선순위',
      render: (_, row: Notification) => getPriorityBadge(row.priority) 
    },
    { 
      key: 'status', 
      label: '상태',
      render: (_, row: Notification) => getStatusBadge(row.status) 
    },
    { 
      key: 'category', 
      label: '카테고리',
      render: (value: string) => value 
    },
    { 
      key: 'createdAt', 
      label: '생성일시',
      render: (value: string) => new Date(value).toLocaleDateString('ko-KR') 
    },
    { 
      key: 'actions', 
      label: '작업',
      render: (_, row: Notification) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onView(row)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            보기
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            삭제
          </button>
        </div>
      )
    }
  ];

  return (
    <Table
      data={notifications}
      columns={columns}
      onRowClick={(notification) => onView(notification as Notification)}
    />
  );
}
