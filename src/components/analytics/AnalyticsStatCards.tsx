import type { AnalyticsData } from '@/types/analytics';

interface AnalyticsStatCardsProps {
  analytics: AnalyticsData;
}

export default function AnalyticsStatCards({ analytics }: AnalyticsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">총 방문자</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {analytics.totalVisitors.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">페이지뷰</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {analytics.pageViews.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+8.3%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">세션</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {analytics.sessions.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-red-600 font-medium">-2.1%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">이탈률</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.bounceRate}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">-5.2%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
