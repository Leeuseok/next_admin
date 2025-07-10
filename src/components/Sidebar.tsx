'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  CogIcon,
  BellIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    name: '대시보드',
    href: '/admin',
    icon: HomeIcon
  },
  {
    name: '사용자 관리',
    href: '/admin/users',
    icon: UsersIcon
  },
  {
    name: '콘텐츠 관리',
    href: '/admin/content',
    icon: DocumentTextIcon
  },
  {
    name: '통계 및 분석',
    href: '/admin/analytics',
    icon: ChartBarIcon
  },
  {
    name: '권한 관리',
    href: '/admin/permissions',
    icon: ShieldCheckIcon
  },
  {
    name: '문의/답변',
    href: '/admin/inquiries',
    icon: ChatBubbleLeftRightIcon,
    badge: '5'
  },
  {
    name: '결제 관리',
    href: '/admin/payments',
    icon: CreditCardIcon
  },
  {
    name: '시스템 설정',
    href: '/admin/settings',
    icon: CogIcon
  },
  {
    name: '알림 관리',
    href: '/admin/notifications',
    icon: BellIcon
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:z-10',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900">
              Admin Panel
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 pb-20 overflow-y-auto">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    )}
                  />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">관리자</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
    >
      <Bars3Icon className="h-6 w-6" />
    </button>
  );
}
