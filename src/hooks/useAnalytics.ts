import { useState, useEffect } from 'react';
import type { 
  AnalyticsData, 
  ChartData, 
  PopularPage, 
  DetailRow, 
  UseAnalyticsReturn 
} from '@/types/analytics';

// 임시 mock 데이터 (실제로는 API에서 가져올 데이터)
const mockAnalytics: AnalyticsData = {
  totalVisitors: 45231,
  pageViews: 128456,
  sessions: 32145,
  bounceRate: '42.3%',
  avgSessionDuration: '2:34',
  conversionRate: '3.2%',
  newUsers: 28456,
  returningUsers: 16775
};

const mockVisitorTrends: ChartData[] = [
  { name: '1월', visitors: 4000 },
  { name: '2월', visitors: 3000 },
  { name: '3월', visitors: 2000 },
  { name: '4월', visitors: 2780 },
  { name: '5월', visitors: 1890 },
  { name: '6월', visitors: 2390 },
  { name: '7월', visitors: 3490 }
];

const mockPageviewSessionData: ChartData[] = [
  { name: '1월', pageviews: 12000, sessions: 8000 },
  { name: '2월', pageviews: 15000, sessions: 9500 },
  { name: '3월', pageviews: 18000, sessions: 11000 },
  { name: '4월', pageviews: 22000, sessions: 13500 },
  { name: '5월', pageviews: 19000, sessions: 12000 },
  { name: '6월', pageviews: 25000, sessions: 15000 },
  { name: '7월', pageviews: 28000, sessions: 17000 }
];

const mockMonthlyRevenue: ChartData[] = [
  { name: '1월', revenue: 50000 },
  { name: '2월', revenue: 65000 },
  { name: '3월', revenue: 78000 },
  { name: '4월', revenue: 92000 },
  { name: '5월', revenue: 85000 },
  { name: '6월', revenue: 110000 },
  { name: '7월', revenue: 125000 }
];

const mockPopularPages: PopularPage[] = [
  { page: '/', views: 25000, uniqueViews: 18000, bounceRate: '35.2%', avgTime: '3:24' },
  { page: '/products', views: 18000, uniqueViews: 12000, bounceRate: '42.1%', avgTime: '2:18' },
  { page: '/about', views: 12000, uniqueViews: 8500, bounceRate: '28.7%', avgTime: '4:12' },
  { page: '/contact', views: 8000, uniqueViews: 6200, bounceRate: '52.3%', avgTime: '1:45' },
  { page: '/blog', views: 6500, uniqueViews: 4800, bounceRate: '38.9%', avgTime: '5:32' }
];

const mockDetailData: DetailRow[] = [
  { date: '2024-01-15', visitors: 4200, pageviews: 12000, sessions: 8000, avgSession: '2:34', bounceRate: '45.2%' },
  { date: '2024-01-14', visitors: 3800, pageviews: 15000, sessions: 9500, avgSession: '2:45', bounceRate: '42.8%' },
  { date: '2024-01-13', visitors: 4600, pageviews: 18000, sessions: 11000, avgSession: '3:12', bounceRate: '38.9%' },
  { date: '2024-01-12', visitors: 5200, pageviews: 22000, sessions: 13500, avgSession: '3:28', bounceRate: '35.6%' },
  { date: '2024-01-11', visitors: 4900, pageviews: 19000, sessions: 12000, avgSession: '3:02', bounceRate: '41.3%' }
];

export function useAnalytics(): UseAnalyticsReturn {
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics);
  const [visitorTrends, setVisitorTrends] = useState<ChartData[]>(mockVisitorTrends);
  const [pageviewSessionData, setPageviewSessionData] = useState<ChartData[]>(mockPageviewSessionData);
  const [monthlyRevenue, setMonthlyRevenue] = useState<ChartData[]>(mockMonthlyRevenue);
  const [popularPages, setPopularPages] = useState<PopularPage[]>(mockPopularPages);
  const [detailData, setDetailData] = useState<DetailRow[]>(mockDetailData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시 아래와 같이 구현
      // const response = await fetch('/api/analytics');
      // const data = await response.json();
      // setAnalytics(data.analytics);
      // setVisitorTrends(data.visitorTrends);
      // ...
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
      
      setAnalytics(mockAnalytics);
      setVisitorTrends(mockVisitorTrends);
      setPageviewSessionData(mockPageviewSessionData);
      setMonthlyRevenue(mockMonthlyRevenue);
      setPopularPages(mockPopularPages);
      setDetailData(mockDetailData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchAnalyticsData();
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return {
    analytics,
    visitorTrends,
    pageviewSessionData,
    monthlyRevenue,
    popularPages,
    detailData,
    loading,
    error,
    refreshData
  };
}
