import { useState } from 'react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  PhotoIcon,
  NewspaperIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Table from '@/components/Table';
import { formatDate, getStatusColor, cn, truncateText } from '@/lib/utils';
import type { Content as ContentType } from '@/types/content';
import type { TableColumn } from '@/types';

interface ContentTableProps {
  contents: ContentType[];
  onView: (content: ContentType) => void;
  onEdit: (content: ContentType) => void;
  onDelete: (content: ContentType) => void;
}

export default function ContentTable({ contents, onView, onEdit, onDelete }: ContentTableProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <DocumentTextIcon className="h-4 w-4 text-blue-600" />;
      case 'product':
        return <PhotoIcon className="h-4 w-4 text-green-600" />;
      case 'news':
        return <NewspaperIcon className="h-4 w-4 text-purple-600" />;
      case 'page':
        return <GlobeAltIcon className="h-4 w-4 text-orange-600" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return '게시글';
      case 'product':
        return '상품';
      case 'news':
        return '뉴스';
      case 'page':
        return '페이지';
      default:
        return type;
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

  const columns: TableColumn[] = [
    {
      key: 'title',
      label: '제목',
      sortable: true,
      render: (value: string, row: ContentType) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            {getTypeIcon(row.type)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">
              {row.excerpt || '-'}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: '타입',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          value === 'post' ? 'bg-blue-100 text-blue-800' :
          value === 'product' ? 'bg-green-100 text-green-800' :
          value === 'news' ? 'bg-purple-100 text-purple-800' :
          'bg-orange-100 text-orange-800'
        )}>
          {getTypeLabel(value)}
        </span>
      )
    },
    {
      key: 'status',
      label: '상태',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          value === 'published' ? 'bg-green-100 text-green-800' :
          value === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        )}>
          {getStatusLabel(value)}
        </span>
      )
    },
    {
      key: 'category',
      label: '카테고리',
      sortable: true
    },
    {
      key: 'author',
      label: '작성자',
      sortable: true
    },
    {
      key: 'viewCount',
      label: '조회수',
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    {
      key: 'createdAt',
      label: '작성일',
      sortable: true,
      render: (value: string) => formatDate(new Date(value))
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: ContentType) => (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onView(row)}
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
      data={contents}
      columns={columns}
      onRowClick={(content) => onView(content)}
    />
  );
}
