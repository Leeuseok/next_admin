'use client';

import { useState, useEffect } from 'react';
import {
  UsersIcon,
  DocumentTextIcon,
  EyeIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import StatCard, { StatGrid } from '@/components/StatCard';
import { LineChartComponent, BarChartComponent, PieChartComponent } from '@/components/Charts';
import Table from '@/components/Table';
import { formatNumber, formatCurrency, getTimeAgo } from '@/lib/utils';
import { Analytics, ChartData, User, ActivityLog } from '@/types';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 1234,
    activeUsers: 856,
    newUsersToday: 42,
    totalContent: 2845,
    publishedContent: 2156,
    totalViews: 98765,
    todayViews: 3421,
    conversionRate: 12.5
  });

  const [visitorsData, setVisitorsData] = useState<ChartData[]>([
    { name: '월', value: 4000 },
    { name: '화', value: 3000 },
    { name: '수', value: 2000 },
    { name: '목', value: 2780 },
    { name: '금', value: 1890 },
    { name: '토', value: 2390 },
    { name: '일', value: 3490 }
  ]);

  const [revenueData, setRevenueData] = useState<ChartData[]>([
    { name: '1월', value: 12000000 },
    { name: '2월', value: 19000000 },
    { name: '3월', value: 15000000 },
    { name: '4월', value: 25000000 },
    { name: '5월', value: 22000000 },
    { name: '6월', value: 30000000 }
  ]);

  const [deviceData, setDeviceData] = useState<ChartData[]>([
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 }
  ]);

  const [recentUsers, setRecentUsers] = useState<User[]>([
    {
      id: '1',
      name: '김철수',
      email: 'kim@example.com',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee@example.com',
      role: 'moderator',
      status: 'active',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      lastLogin: new Date('2024-01-14T15:45:00')
    },
    {
      id: '3',
      name: '박민수',
      email: 'park@example.com',
      role: 'user',
      status: 'inactive',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-13'),
      lastLogin: new Date('2024-01-13T09:15:00')
    }
  ]);

  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([
    {
      id: '1',
      userId: '1',
      action: '로그인',
      resource: 'auth',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome',
      createdAt: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      userId: '2',
      action: '게시글 작성',
      resource: 'post',
      resourceId: '123',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox',
      createdAt: new Date('2024-01-15T10:25:00')
    },
    {
      id: '3',
      userId: '3',
      action: '프로필 수정',
      resource: 'user',
      resourceId: '3',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari',
      createdAt: new Date('2024-01-15T10:20:00')
    }
  ]);

  const userColumns = [
    { key: 'name', label: '이름', sortable: true },
    { key: 'email', label: '이메일', sortable: true },
    { key: 'role', label: '역할', sortable: true },
    {
      key: 'status',
      label: '상태',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'inactive' ? 'bg-gray-100 text-gray-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? '활성' :
           value === 'inactive' ? '비활성' : '정지'}
        </span>
      )
    },
    {
      key: 'lastLogin',
      label: '최근 로그인',
      render: (value: Date) => getTimeAgo(value)
    }
  ];

  const activityColumns = [
    { key: 'action', label: '활동', sortable: true },
    { key: 'resource', label: '리소스', sortable: true },
    { key: 'ipAddress', label: 'IP 주소', sortable: true },
    {
      key: 'createdAt',
      label: '시간',
      render: (value: Date) => getTimeAgo(value)
    }
  ];

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600">관리자 대시보드 개요</p>
        </div>
        <div className="text-sm text-gray-500">
          마지막 업데이트: {new Date().toLocaleString('ko-KR')}
        </div>
      </div>

      {/* 통계 카드 */}
      <StatGrid>
        <StatCard
          title="총 사용자"
          value={formatNumber(analytics.totalUsers)}
          change={{ value: 8.2, type: 'increase' }}
          icon={<UsersIcon className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="총 콘텐츠"
          value={formatNumber(analytics.totalContent)}
          change={{ value: 12.5, type: 'increase' }}
          icon={<DocumentTextIcon className="h-5 w-5 text-green-600" />}
        />
        <StatCard
          title="오늘 조회수"
          value={formatNumber(analytics.todayViews)}
          change={{ value: 3.1, type: 'decrease' }}
          icon={<EyeIcon className="h-5 w-5 text-purple-600" />}
        />
        <StatCard
          title="전환율"
          value={`${analytics.conversionRate}%`}
          change={{ value: 2.4, type: 'increase' }}
          icon={<CreditCardIcon className="h-5 w-5 text-orange-600" />}
        />
      </StatGrid>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          title="주간 방문자 수"
          data={visitorsData}
        />
        <BarChartComponent
          title="월별 매출"
          data={revenueData}
        />
      </div>

      {/* 디바이스 통계 및 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PieChartComponent
          title="디바이스 통계"
          data={deviceData}
        />
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">최근 활동</h3>
            </div>
            <div className="p-6">
              <Table
                data={recentActivities}
                columns={activityColumns}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 최근 등록 사용자 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">최근 등록 사용자</h3>
            <a href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700">
              모두 보기
            </a>
          </div>
        </div>
        <div className="p-6">
          <Table
            data={recentUsers}
            columns={userColumns}
          />
        </div>
      </div>

      {/* 퀵 액션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">새 사용자 추가</h4>
          <p className="text-sm text-gray-600 mb-4">새로운 사용자 계정을 생성합니다.</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            사용자 추가
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">새 콘텐츠 작성</h4>
          <p className="text-sm text-gray-600 mb-4">새로운 게시글을 작성합니다.</p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
            콘텐츠 작성
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">시스템 백업</h4>
          <p className="text-sm text-gray-600 mb-4">시스템 데이터를 백업합니다.</p>
          <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
            백업 실행
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">보고서 생성</h4>
          <p className="text-sm text-gray-600 mb-4">관리자 보고서를 생성합니다.</p>
          <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
            보고서 생성
          </button>
        </div>
      </div>
    </div>
  );
}
