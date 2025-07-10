import type { PopularPage } from '@/types/analytics';

interface PopularPagesProps {
  pages: PopularPage[];
}

export default function PopularPages({ pages }: PopularPagesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">인기 페이지</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{page.page}</p>
                <p className="text-sm text-gray-500">
                  {page.views.toLocaleString()} 조회수 · {page.uniqueViews.toLocaleString()} 순 방문자
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="text-center">
                  <p className="font-medium">{page.bounceRate}</p>
                  <p className="text-xs">이탈률</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">{page.avgTime}</p>
                  <p className="text-xs">평균 시간</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
