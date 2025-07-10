import React from 'react';
import Table from '@/components/Table';
import type { NotificationTemplate } from '@/types/notifications';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import type { TableColumn } from '@/types';

interface TemplateTableProps {
  templates: NotificationTemplate[];
  onEdit: (template: NotificationTemplate) => void;
  onDelete: (id: string) => void;
}

export default function TemplateTable({ templates, onEdit, onDelete }: TemplateTableProps) {
  const getTypeIcon = (type: NotificationTemplate['type']) => {
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

  const columns: TableColumn[] = [
    { 
      key: 'name', 
      label: '이름',
      render: (value: string) => value 
    },
    { 
      key: 'type', 
      label: '타입',
      render: (_, row: NotificationTemplate) => getTypeIcon(row.type) 
    },
    { 
      key: 'category', 
      label: '카테고리',
      render: (value: string) => value 
    },
    { 
      key: 'isActive', 
      label: '상태',
      render: (value: boolean) => value ? 
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">활성</span> :
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">비활성</span> 
    },
    { 
      key: 'actions', 
      label: '작업',
      render: (_, row: NotificationTemplate) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(row)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            편집
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
      data={templates}
      columns={columns}
    />
  );
}
