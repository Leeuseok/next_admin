import type { UserStats } from '@/types/users';

interface UserStatsCardsProps {
  stats: UserStats;
}

export default function UserStatsCards({ stats }: UserStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">총 사용자</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.totalUsers.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+5.2%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">활성 사용자</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.activeUsers.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+3.1%</span>
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
            <p className="text-sm font-medium text-gray-600">신규 사용자</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.newUsers.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-gray-500 ml-1">오늘</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">정지된 사용자</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.suspendedUsers.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-red-600 font-medium">+2</span>
              <span className="text-sm text-gray-500 ml-1">오늘</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
