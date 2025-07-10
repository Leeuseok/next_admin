'use client';

import { useState, useEffect } from 'react';
import {
  CalendarIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import StatCard, { StatGrid } from '@/components/StatCard';
import { 
  LineChartComponent, 
  BarChartComponent, 
  PieChartComponent, 
  AreaChartComponent,
  MultiLineChart 
} from '@/components/Charts';
import { Select, Button } from '@/components/Form';
import { formatNumber, formatCurrency, exportToCSV } from '@/lib/utils';
import { Analytics, ChartData } from '@/types';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 12456,
    activeUsers: 8934,
    newUsersToday: 145,
    totalContent: 3421,
    publishedContent: 2876,
    totalViews: 145678,
    todayViews: 5432,
    conversionRate: 15.6
  });

  // 시간별 방문자 데이터
  const [hourlyVisitors, setHourlyVisitors] = useState<ChartData[]>([
    { name: '00:00', value: 120 },
    { name: '03:00', value: 80 },
    { name: '06:00', value: 150 },
    { name: '09:00', value: 450 },
    { name: '12:00', value: 650 },
    { name: '15:00', value: 580 },
    { name: '18:00', value: 720 },
    { name: '21:00', value: 560 }
  ]);

  // 일별 방문자 데이터
  const [dailyVisitors, setDailyVisitors] = useState<ChartData[]>([
    { name: '월', value: 4200 },
    { name: '화', value: 3800 },
    { name: '수', value: 4600 },
    { name: '목', value: 5200 },
    { name: '금', value: 4900 },
    { name: '토', value: 3600 },
    { name: '일', value: 3200 }
  ]);

  // 월별 매출 데이터
  const [monthlyRevenue, setMonthlyRevenue] = useState<ChartData[]>([
    { name: '1월', value: 24000000 },
    { name: '2월', value: 28000000 },
    { name: '3월', value: 32000000 },
    { name: '4월', value: 35000000 },
    { name: '5월', value: 38000000 },
    { name: '6월', value: 42000000 }
  ]);

  // 기기별 접속 통계
  const [deviceStats, setDeviceStats] = useState<ChartData[]>([
    { name: 'Desktop', value: 45.2 },
    { name: 'Mobile', value: 38.7 },
    { name: 'Tablet', value: 16.1 }
  ]);

  // 브라우저별 통계
  const [browserStats, setBrowserStats] = useState<ChartData[]>([
    { name: 'Chrome', value: 65.4 },
    { name: 'Safari', value: 18.2 },
    { name: 'Firefox', value: 9.8 },
    { name: 'Edge', value: 4.1 },
    { name: 'Others', value: 2.5 }
  ]);

  // 페이지뷰 vs 세션 비교
  const [pageviewSessionData, setPageviewSessionData] = useState([
    { name: '월', pageviews: 12000, sessions: 8000 },
    { name: '화', pageviews: 15000, sessions: 9500 },
    { name: '수', pageviews: 18000, sessions: 11000 },
    { name: '목', pageviews: 22000, sessions: 13500 },
    { name: '금', pageviews: 19000, sessions: 12000 },
    { name: '토', pageviews: 14000, sessions: 9000 },
    { name: '일', pageviews: 11000, sessions: 7500 }
  ]);

  // 사용자 유입 경로
  const [trafficSources, setTrafficSources] = useState<ChartData[]>([
    { name: '직접 방문', value: 35.6 },
    { name: '검색 엔진', value: 28.4 },
    { name: '소셜 미디어', value: 18.2 },
    { name: '이메일', value: 10.3 },
    { name: '광고', value: 7.5 }
  ]);

  // 인기 페이지
  const [popularPages, setPopularPages] = useState([
    { page: '/admin/dashboard', views: 15420, percentage: 25.6 },
    { page: '/admin/users', views: 12380, percentage: 20.5 },
    { page: '/admin/content', views: 9560, percentage: 15.9 },
    { page: '/admin/analytics', views: 7890, percentage: 13.1 },
    { page: '/admin/settings', views: 5670, percentage: 9.4 }
  ]);

  // 지역별 사용자 분포
  const [regionData, setRegionData] = useState<ChartData[]>([
    { name: '서울', value: 42.3 },
    { name: '부산', value: 15.7 },
    { name: '대구', value: 8.9 },
    { name: '인천', value: 7.2 },
    { name: '광주', value: 5.8 },
    { name: '대전', value: 4.6 },
    { name: '기타', value: 15.5 }
  ]);

  const handleExportData = () => {
    const exportData = [
      { 날짜: '2024-01-15', 방문자: 4200, 페이지뷰: 12000, 세션: 8000, 매출: 1400000 },
      { 날짜: '2024-01-14', 방문자: 3800, 페이지뷰: 15000, 세션: 9500, 매출: 1200000 },
      { 날짜: '2024-01-13', 방문자: 4600, 페이지뷰: 18000, 세션: 11000, 매출: 1600000 },
      { 날짜: '2024-01-12', 방문자: 5200, 페이지뷰: 22000, 세션: 13500, 매출: 1800000 },
      { 날짜: '2024-01-11', 방문자: 4900, 페이지뷰: 19000, 세션: 12000, 매출: 1700000 },
      { 날짜: '2024-01-10', 방문자: 3600, 페이지뷰: 14000, 세션: 9000, 매출: 1300000 },
      { 날짜: '2024-01-09', 방문자: 3200, 페이지뷰: 11000, 세션: 7500, 매출: 1100000 }
    ];
    
    exportToCSV(exportData, `analytics_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통계 및 분석</h1>
          <p className="text-gray-600">상세한 데이터 분석과 통계를 확인하세요.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            name="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            options={[
              { value: '7days', label: '최근 7일' },
              { value: '30days', label: '최근 30일' },
              { value: '90days', label: '최근 90일' },
              { value: '1year', label: '최근 1년' }
            ]}
          />
          <Button
            variant="secondary"
            onClick={handleExportData}
            className="inline-flex items-center"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            데이터 내보내기
          </Button>
        </div>
      </div>

      {/* 주요 통계 카드 */}
      <StatGrid>
        <StatCard
          title="총 사용자"
          value={formatNumber(analytics.totalUsers)}
          change={{ value: 12.5, type: 'increase' }}
          icon={<ChartBarIcon className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="활성 사용자"
          value={formatNumber(analytics.activeUsers)}
          change={{ value: 8.2, type: 'increase' }}
          icon={<ChartBarIcon className="h-5 w-5 text-green-600" />}
        />
        <StatCard
          title="총 페이지뷰"
          value={formatNumber(analytics.totalViews)}
          change={{ value: 15.3, type: 'increase' }}
          icon={<ChartBarIcon className="h-5 w-5 text-purple-600" />}
        />
        <StatCard
          title="전환율"
          value={`${analytics.conversionRate}%`}
          change={{ value: 2.1, type: 'increase' }}
          icon={<ChartBarIcon className="h-5 w-5 text-orange-600" />}
        />
      </StatGrid>

      {/* 방문자 및 페이지뷰 트렌드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          title="시간별 방문자"
          data={hourlyVisitors}
        />
        <AreaChartComponent
          title="일별 방문자"
          data={dailyVisitors}
        />
      </div>

      {/* 페이지뷰 vs 세션 비교 */}
      <MultiLineChart
        title="페이지뷰 vs 세션"
        data={pageviewSessionData}
        lines={[
          { dataKey: 'pageviews', name: '페이지뷰', color: '#8884d8' },
          { dataKey: 'sessions', name: '세션', color: '#82ca9d' }
        ]}
      />

      {/* 매출 통계 */}
      <BarChartComponent
        title="월별 매출"
        data={monthlyRevenue}
      />

      {/* 기기 및 브라우저 통계 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent
          title="기기별 접속 통계"
          data={deviceStats}
        />
        <PieChartComponent
          title="브라우저별 통계"
          data={browserStats}
        />
      </div>

      {/* 유입 경로 및 지역별 분포 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent
          title="사용자 유입 경로"
          data={trafficSources}
        />
        <PieChartComponent
          title="지역별 사용자 분포"
          data={regionData}
        />
      </div>

      {/* 인기 페이지 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">인기 페이지</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {popularPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{page.page}</span>
                    <span className="text-sm text-gray-500">{formatNumber(page.views)} 뷰</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  {page.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 상세 통계 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">상세 통계</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  날짜
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  방문자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  페이지뷰
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  세션
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  평균 세션 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이탈률
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: '2024-01-15', visitors: 4200, pageviews: 12000, sessions: 8000, avgSession: '2:34', bounceRate: '45.2%' },
                { date: '2024-01-14', visitors: 3800, pageviews: 15000, sessions: 9500, avgSession: '2:45', bounceRate: '42.8%' },
                { date: '2024-01-13', visitors: 4600, pageviews: 18000, sessions: 11000, avgSession: '3:12', bounceRate: '38.9%' },
                { date: '2024-01-12', visitors: 5200, pageviews: 22000, sessions: 13500, avgSession: '3:28', bounceRate: '35.6%' },
                { date: '2024-01-11', visitors: 4900, pageviews: 19000, sessions: 12000, avgSession: '3:02', bounceRate: '41.3%' }
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(row.date).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(row.visitors)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(row.pageviews)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(row.sessions)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.avgSession}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.bounceRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 실시간 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">실시간 방문자</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">오늘 신규 사용자</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.newUsersToday)}</p>
            </div>
            <div className="text-green-600 text-sm font-medium">
              +8.2%
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">오늘 페이지뷰</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.todayViews)}</p>
            </div>
            <div className="text-red-600 text-sm font-medium">
              -3.1%
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">서버 응답 시간</p>
              <p className="text-2xl font-bold text-gray-900">124ms</p>
            </div>
            <div className="text-green-600 text-sm font-medium">
              정상
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
