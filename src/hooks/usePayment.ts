import { useState, useEffect } from 'react';
import type { Payment, PaymentStats, UsePaymentReturn } from '@/types/payment';

const mockPayments: Payment[] = [
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
  },
  {
    id: '5',
    userId: 'user5',
    userName: '정수빈',
    amount: 75000,
    method: '신용카드',
    status: 'completed',
    createdAt: '2024-01-14T14:30:00Z',
    description: '프리미엄 플랜 구독',
    transactionId: 'TXN005'
  },
  {
    id: '6',
    userId: 'user6',
    userName: '한도훈',
    amount: 40000,
    method: '계좌이체',
    status: 'pending',
    createdAt: '2024-01-14T11:45:00Z',
    description: '스탠다드 플랜 구독',
    transactionId: 'TXN006'
  }
];

const calculateStats = (payments: Payment[]): PaymentStats => {
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedCount = payments.filter(p => p.status === 'completed').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const failedCount = payments.filter(p => p.status === 'failed').length;
  const refundedCount = payments.filter(p => p.status === 'refunded').length;

  return {
    totalAmount,
    completedCount,
    pendingCount,
    failedCount,
    refundedCount
  };
};

export function usePayment(): UsePaymentReturn {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    totalAmount: 0,
    completedCount: 0,
    pendingCount: 0,
    failedCount: 0,
    refundedCount: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/payments');
      // const data = await response.json();
      // setPayments(data.payments);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setPayments(mockPayments);
      setStats(calculateStats(mockPayments));
    } catch (err) {
      setError(err instanceof Error ? err.message : '결제 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (id: string, status: Payment['status']) => {
    try {
      // 실제 API 호출 시:
      // await fetch(`/api/payments/${id}/status`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // });
      
      setPayments(prev => {
        const updated = prev.map(payment => 
          payment.id === id ? { ...payment, status } : payment
        );
        setStats(calculateStats(updated));
        return updated;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '결제 상태 업데이트 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const processRefund = async (id: string) => {
    try {
      // 실제 API 호출 시:
      // await fetch(`/api/payments/${id}/refund`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      await updatePaymentStatus(id, 'refunded');
    } catch (err) {
      setError(err instanceof Error ? err.message : '환불 처리 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const approvePayment = async (id: string) => {
    try {
      // 실제 API 호출 시:
      // await fetch(`/api/payments/${id}/approve`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      await updatePaymentStatus(id, 'completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : '결제 승인 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const exportPayments = async () => {
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/payments/export');
      // const blob = await response.blob();
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'payments.xlsx';
      // a.click();
      
      // 임시 구현 - CSV 다운로드
      const csvContent = [
        ['거래ID', '사용자', '금액', '결제방법', '상태', '결제일시', '설명'].join(','),
        ...payments.map(p => [
          p.transactionId,
          p.userName,
          p.amount,
          p.method,
          p.status,
          new Date(p.createdAt).toLocaleString('ko-KR'),
          p.description
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payments.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : '결제 내역 내보내기 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const refreshPayments = () => {
    fetchPayments();
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    stats,
    loading,
    error,
    refreshPayments,
    updatePaymentStatus,
    processRefund,
    approvePayment,
    exportPayments
  };
}
