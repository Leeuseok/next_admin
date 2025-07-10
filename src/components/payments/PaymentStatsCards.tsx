import { 
  CreditCardIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import type { PaymentStats } from '@/types/payment';

interface PaymentStatsCardsProps {
  stats: PaymentStats;
}

export default function PaymentStatsCards({ stats }: PaymentStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">총 결제금액</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ₩{stats.totalAmount.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCardIcon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">완료된 결제</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.completedCount.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600 font-medium">+8.2%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">대기중인 결제</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.pendingCount.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-orange-600 font-medium">-3.1%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <ClockIcon className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">실패한 결제</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.failedCount.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-red-600 font-medium">-15.3%</span>
              <span className="text-sm text-gray-500 ml-1">vs 지난 달</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <XCircleIcon className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
