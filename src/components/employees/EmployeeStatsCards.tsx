import type { EmployeeStats } from '@/types/employees';

interface EmployeeStatsCardsProps {
  stats: EmployeeStats;
}

export default function EmployeeStatsCards({ stats }: EmployeeStatsCardsProps) {
  const safe = (v: number | undefined) => (typeof v === 'number' ? v : 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 총 인원 */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow border border-blue-100 p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-blue-700">총 인원</span>
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-3xl font-bold text-blue-900">{safe(stats.totalEmployees).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-blue-50 pt-2">전체 등록 인원</div>
      </div>
      {/* 재직 인원 */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow border border-green-100 p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-green-700">재직 인원</span>
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-3xl font-bold text-green-900">{safe(stats.activeEmployees).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-green-50 pt-2">현재 근무 중</div>
      </div>
      {/* 신규 입사자 */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow border border-purple-100 p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-purple-700">신규 입사자</span>
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-3xl font-bold text-purple-900">{safe(stats.newEmployees).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-purple-50 pt-2">이번 달 입사</div>
      </div>
      {/* 퇴사자 */}
      <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow border border-red-100 p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </div>
            <span className="text-base font-semibold text-red-700">퇴사자</span>
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-3xl font-bold text-red-900">{safe(stats.leavers).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-red-50 pt-2">이번 달 퇴사</div>
      </div>
      {/* 휴직/정지자 */}
      <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow border border-yellow-100 p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-yellow-700">휴직/정지자</span>
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-3xl font-bold text-yellow-900">{safe(stats.suspendedEmployees).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-yellow-50 pt-2">현재 휴직/정지</div>
      </div>
      {/* 남성 인원 */}
      <div className="bg-gradient-to-br from-blue-100 to-white rounded-xl shadow border border-blue-200 p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-semibold text-blue-800">남성</span>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-3xl font-bold text-blue-900">{safe(stats.male).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-blue-100 pt-2">전체 남성 인원</div>
      </div>
      {/* 여성 인원 */}
      <div className="bg-gradient-to-br from-pink-100 to-white rounded-xl shadow border border-pink-200 p-6 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-semibold text-pink-800">여성</span>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-3xl font-bold text-pink-900">{safe(stats.female).toLocaleString()}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-pink-100 pt-2">전체 여성 인원</div>
      </div>
      {/* 부서별 인원 */}
      <div className="bg-gradient-to-br from-gray-100 to-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-between h-full col-span-1 md:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-semibold text-gray-700">부서별 인원</span>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {Object.entries(stats.departmentStats || {}).map(([dept, count]) => (
            <div key={dept} className="flex flex-col items-center">
              <span className="text-xs text-gray-500">{dept}</span>
              <span className="text-lg font-bold text-gray-900">{safe(count)}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500 border-t border-gray-100 pt-2">부서별 인원 현황</div>
      </div>
    </div>
  );
}
