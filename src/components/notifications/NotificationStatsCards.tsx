import StatCard from '@/components/StatCard';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

interface NotificationStatsProps {
  unreadCount: number;
  highPriorityCount: number;
  todayCount: number;
  totalCount: number;
}

export default function NotificationStatsCards({ unreadCount, highPriorityCount, todayCount, totalCount }: NotificationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="읽지 않은 알림"
        value={unreadCount.toString()}
        icon={<BellIcon className="h-6 w-6" />}
        change={{ value: 3, type: 'increase' }}
      />
      <StatCard
        title="높은 우선순위"
        value={highPriorityCount.toString()}
        icon={<ExclamationTriangleIcon className="h-6 w-6" />}
        change={{ value: 1, type: 'increase' }}
      />
      <StatCard
        title="오늘 생성됨"
        value={todayCount.toString()}
        icon={<InformationCircleIcon className="h-6 w-6" />}
        change={{ value: 5, type: 'increase' }}
      />
      <StatCard
        title="총 알림"
        value={totalCount.toString()}
        icon={<CheckCircleIcon className="h-6 w-6" />}
        change={{ value: 12, type: 'increase' }}
      />
    </div>
  );
}
