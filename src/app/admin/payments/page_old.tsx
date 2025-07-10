'use client';

import { useState } from 'react';
import { 
  CreditCardIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import StatCard from '@/components/StatCard';
import Table from '@/components/Table';
import Modal from '@/components/Modal';

// 결제 데이터 타입
interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  createdAt: string;
  description: string;
  transactionId: string;
}

// 샘플 결제 데이터
const samplePayments: Payment[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '김철수',
    amount: 50000,
    method: '신용카드',
    status: 'completed',
    createdAt: '2024-01-15T10:30:00Z',
    description: '프리미엄 플랜 구독',
    transactionId: 'TXN001'
  },
  {
    id: '2',
    userId: 'user2',
    userName: '이영희',
    amount: 25000,
    method: '계좌이체',
    status: 'pending',
    createdAt: '2024-01-15T09:15:00Z',
    description: '베이직 플랜 구독',
    transactionId: 'TXN002'
  },
  {
    id: '3',
    userId: 'user3',
    userName: '박민수',
    amount: 100000,
    method: '신용카드',
    status: 'failed',
    createdAt: '2024-01-15T08:45:00Z',
    description: '엔터프라이즈 플랜 구독',
    transactionId: 'TXN003'
  },
  {
    id: '4',
    userId: 'user4',
    userName: '최지현',
    amount: 30000,
    method: 'PayPal',
    status: 'refunded',
    createdAt: '2024-01-14T16:20:00Z',
    description: '스탠다드 플랜 구독',
    transactionId: 'TXN004'
  }
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(samplePayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 통계 계산
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const failedPayments = payments.filter(p => p.status === 'failed');

  // 상태별 스타일
  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">완료</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">대기</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">실패</span>;
      case 'refunded':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">환불</span>;
      default:
        return null;
    }
  };

  // 필터링된 결제 데이터
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 테이블 컬럼 정의
  const columns = [
    { key: 'transactionId', label: '거래ID' },
    { key: 'userName', label: '사용자' },
    { key: 'amount', label: '금액' },
    { key: 'method', label: '결제방법' },
    { key: 'status', label: '상태' },
    { key: 'createdAt', label: '결제일시' },
    { key: 'actions', label: '작업' }
  ];

  // 테이블 데이터 변환
  const tableData = filteredPayments.map(payment => ({
    transactionId: payment.transactionId,
    userName: payment.userName,
    amount: `₩${payment.amount.toLocaleString()}`,
    method: payment.method,
    status: getStatusBadge(payment.status),
    createdAt: new Date(payment.createdAt).toLocaleDateString('ko-KR'),
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={() => {
            setSelectedPayment(payment);
            setIsModalOpen(true);
          }}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          상세보기
        </button>
      </div>
    )
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">결제 관리</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span>결제 내역 다운로드</span>
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="총 결제금액"
          value={`₩${totalAmount.toLocaleString()}`}
          icon={<CreditCardIcon className="h-6 w-6" />}
          change={{ value: 12, type: 'increase' }}
        />
        <StatCard
          title="완료된 결제"
          value={completedPayments.length.toString()}
          icon={<CheckCircleIcon className="h-6 w-6" />}
          change={{ value: 8, type: 'increase' }}
        />
        <StatCard
          title="대기중인 결제"
          value={pendingPayments.length.toString()}
          icon={<ClockIcon className="h-6 w-6" />}
          change={{ value: 3, type: 'decrease' }}
        />
        <StatCard
          title="실패한 결제"
          value={failedPayments.length.toString()}
          icon={<XCircleIcon className="h-6 w-6" />}
          change={{ value: 2, type: 'decrease' }}
        />
      </div>

      {/* 필터링 및 검색 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="사용자명 또는 거래ID 검색..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="completed">완료</option>
              <option value="pending">대기</option>
              <option value="failed">실패</option>
              <option value="refunded">환불</option>
            </select>
          </div>
        </div>
      </div>

      {/* 결제 목록 테이블 */}
      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          data={tableData}
        />
      </div>

      {/* 결제 상세 정보 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="결제 상세 정보"
      >
        {selectedPayment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">거래ID</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPayment.transactionId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">사용자</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPayment.userName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">결제금액</label>
                <p className="mt-1 text-sm text-gray-900">₩{selectedPayment.amount.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">결제방법</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPayment.method}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">상태</label>
                <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">결제일시</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedPayment.createdAt).toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">설명</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPayment.description}</p>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                닫기
              </button>
              {selectedPayment.status === 'pending' && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  승인
                </button>
              )}
              {selectedPayment.status === 'completed' && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                  환불
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
