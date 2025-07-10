'use client';

import { CalendarDaysIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsStatCards from '@/components/analytics/AnalyticsStatCards';
import AnalyticsCharts from '@/components/analytics/AnalyticsCharts';
import PopularPages from '@/components/analytics/PopularPages';
import DetailTable from '@/components/analytics/DetailTable';

export default function AnalyticsPage() {
  const {
    analytics,
    visitorTrends,
    pageviewSessionData,
    monthlyRevenue,
    popularPages,
    detailData,
    loading,
    error,
    refreshData
  } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">데이터를 불러오는 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-red-800">{error}</span>
          <button
            onClick={refreshData}
            className="ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통계 및 분석</h1>
          <p className="text-gray-600">웹사이트 방문자 및 사용자 행동 분석</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>기간 선택</span>
          </button>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>새로고침</span>
          </button>
        </div>
      </div>

      {/* 주요 통계 카드 */}
      <AnalyticsStatCards analytics={analytics} />

      {/* 차트 섹션 */}
      <AnalyticsCharts
        visitorTrends={visitorTrends}
        pageviewSessionData={pageviewSessionData}
        monthlyRevenue={monthlyRevenue}
      />

      {/* 인기 페이지 */}
      <PopularPages pages={popularPages} />

      {/* 상세 통계 테이블 */}
      <DetailTable data={detailData} />

      {/* 실시간 통계 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">실시간 통계</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">142</div>
              <div className="text-sm text-gray-500">현재 온라인</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-500">오늘 방문자</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3,456</div>
              <div className="text-sm text-gray-500">오늘 페이지뷰</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2.3%</div>
              <div className="text-sm text-gray-500">실시간 전환율</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
