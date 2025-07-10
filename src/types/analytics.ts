// Analytics 관련 타입 정의
export interface AnalyticsData {
  totalVisitors: number;
  pageViews: number;
  sessions: number;
  bounceRate: string;
  avgSessionDuration: string;
  conversionRate: string;
  newUsers: number;
  returningUsers: number;
}

export interface ChartData {
  name: string;
  value?: number;
  visitors?: number;
  pageviews?: number;
  sessions?: number;
  revenue?: number;
}

export interface PopularPage {
  page: string;
  views: number;
  uniqueViews: number;
  bounceRate: string;
  avgTime: string;
}

export interface DetailRow {
  date: string;
  visitors: number;
  pageviews: number;
  sessions: number;
  avgSession: string;
  bounceRate: string;
}

export interface UseAnalyticsReturn {
  analytics: AnalyticsData;
  visitorTrends: ChartData[];
  pageviewSessionData: ChartData[];
  monthlyRevenue: ChartData[];
  popularPages: PopularPage[];
  detailData: DetailRow[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}
