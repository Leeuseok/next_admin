import React from 'react';
import Table from '@/components/Table';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import type { Role, Permission } from '@/types/permissions';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export default function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  const columns = [
    {
      key: 'name',
      label: '역할명',
      sortable: true,
      render: (value: string, row: Role) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <UserGroupIcon className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'permissions',
      label: '권한 수',
      render: (value: Permission[]) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {value.length}개
        </span>
      )
    },
    {
      key: 'createdAt',
      label: '생성일',
      sortable: true,
      render: (value: Date) => formatDate(value)
    },
    {
      key: 'updatedAt',
      label: '수정일',
      sortable: true,
      render: (value: Date) => formatDate(value)
    },
    {
      key: 'actions',
      label: '작업',
      render: (_: any, row: Role) => (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onEdit(row)}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm w-full text-left',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )}
                  >
                    <PencilIcon className="mr-3 h-4 w-4" />
                    수정
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onDelete(row)}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm w-full text-left',
                      active ? 'bg-gray-100 text-red-900' : 'text-red-700'
                    )}
                  >
                    <TrashIcon className="mr-3 h-4 w-4" />
                    삭제
                  </button>
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
      data={roles}
      columns={columns}
    />
  );
}
