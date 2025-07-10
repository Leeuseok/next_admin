import type { ContentStats } from '@/types/content';

interface ContentStatsCardsProps {
  stats: ContentStats;
}

export default function ContentStatsCards({ stats }: ContentStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">총 콘텐츠</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.totalContent.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+8.2%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">게시됨</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.publishedContent.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+12.3%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">임시저장</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.draftContent.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-orange-600 font-medium">+5.7%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">보관됨</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.archivedContent.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600 font-medium">-2.1%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 4 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
