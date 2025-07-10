'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { SidebarToggle } from './Sidebar';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSidebarToggle: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const notifications = [
    { id: 1, title: '새로운 사용자 가입', time: '5분 전', unread: true },
    { id: 2, title: '결제 완료', time: '1시간 전', unread: true },
    { id: 3, title: '문의 접수', time: '2시간 전', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <SidebarToggle onClick={onSidebarToggle} />
          
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="검색..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full">
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">알림</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <Menu.Item key={notification.id}>
                      {({ active }) => (
                        <div
                          className={cn(
                            'px-4 py-3 border-b border-gray-100 cursor-pointer',
                            active ? 'bg-gray-50' : '',
                            notification.unread ? 'bg-blue-50' : ''
                          )}
                        >
                          <div className="flex items-start">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
                <div className="px-4 py-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    모든 알림 보기
                  </button>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* User menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 font-medium hidden md:block">
                관리자
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">관리자</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          'flex items-center px-4 py-2 text-sm text-gray-700',
                          active ? 'bg-gray-100' : ''
                        )}
                      >
                        <UserIcon className="mr-3 h-4 w-4" />
                        프로필
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          'flex items-center px-4 py-2 text-sm text-gray-700',
                          active ? 'bg-gray-100' : ''
                        )}
                      >
                        <CogIcon className="mr-3 h-4 w-4" />
                        설정
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={cn(
                          'flex items-center px-4 py-2 text-sm text-gray-700',
                          active ? 'bg-gray-100' : ''
                        )}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4" />
                        로그아웃
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}
