import React from 'react';
import { 
  ClockIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import type { Inquiry, User, Admin } from '@/types/inquiries';
import Table from '@/components/Table';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import { formatDate, getTimeAgo } from '@/lib/utils';
import { Select } from '@/components/Form';
import type { TableColumn } from '@/types';

interface InquiryTableProps {
  inquiries: Inquiry[];
  users: User[];
  admins: Admin[];
  onView: (inquiry: Inquiry) => void;
  onReply: (inquiry: Inquiry) => void;
  onStatusChange: (id: string, status: string) => void;
  onAssigneeChange: (id: string, assigneeId: string) => void;
}

export default function InquiryTable({ 
  inquiries, 
  users, 
  admins, 
  onView, 
  onReply, 
  onStatusChange, 
  onAssigneeChange 
}: InquiryTableProps) {
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
      render: (value: string) => (
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(row);
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onReply(row);
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
                  <div className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                    <Select
                      name="status"
                      value={row.status}
                      onChange={(e) => onStatusChange(row.id, e.target.value)}
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
                  <div className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                    <Select
                      name="assignee"
                      value={row.assignedTo || ''}
                      onChange={(e) => onAssigneeChange(row.id, e.target.value)}
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

  return (
    <Table
      data={inquiries}
      columns={columns}
      onRowClick={onView}
    />
  );
}
