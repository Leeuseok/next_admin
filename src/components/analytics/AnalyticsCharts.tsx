import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { ChartData } from '@/types/analytics';

interface AnalyticsChartsProps {
  visitorTrends: ChartData[];
  pageviewSessionData: ChartData[];
  monthlyRevenue: ChartData[];
}

export default function AnalyticsCharts({ 
  visitorTrends, 
  pageviewSessionData, 
  monthlyRevenue 
}: AnalyticsChartsProps) {
  return (
    <div className="space-y-6">
      {/* 방문자 추이 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">방문자 추이</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="방문자"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 페이지뷰 vs 세션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">페이지뷰 vs 세션</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pageviewSessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="pageviews" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="페이지뷰"
              />
              <Line 
                type="monotone" 
                dataKey="sessions" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="세션"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 월별 매출 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">월별 매출</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="매출" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
