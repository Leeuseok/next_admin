import React from 'react';
import Table from '@/components/Table';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import type { Permission } from '@/types/permissions';
import type { TableColumn } from '@/types';

interface PermissionTableProps {
  permissions: Permission[];
  onEdit: (permission: Permission) => void;
}

export default function PermissionTable({ permissions, onEdit }: PermissionTableProps) {
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: '권한명',
      sortable: true,
      render: (value: string, row: Permission) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <ShieldCheckIcon className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'resource',
      label: '리소스',
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'action',
      label: '액션',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          value === 'create' ? 'bg-green-100 text-green-800' :
          value === 'read' ? 'bg-blue-100 text-blue-800' :
          value === 'update' ? 'bg-yellow-100 text-yellow-800' :
          value === 'delete' ? 'bg-red-100 text-red-800' :
          'bg-purple-100 text-purple-800'
        )}>
          {value === 'create' ? '생성' :
           value === 'read' ? '조회' :
           value === 'update' ? '수정' :
           value === 'delete' ? '삭제' : '관리'}
        </span>
      )
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: Permission) => (
        <button
          onClick={() => onEdit(row)}
          className="text-blue-600 hover:text-blue-800"
        >
          편집
        </button>
      )
    }
  ];

  return (
    <Table
      data={permissions}
      columns={columns}
    />
  );
}
