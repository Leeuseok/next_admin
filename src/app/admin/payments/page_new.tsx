'use client';

import { useState, useEffect } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/Form';
import PaymentStatsCards from '@/components/payments/PaymentStatsCards';
import PaymentFilters from '@/components/payments/PaymentFilters';
import PaymentTable from '@/components/payments/PaymentTable';
import PaymentDetailModal from '@/components/payments/PaymentDetailModal';
import { usePayment } from '@/hooks/usePayment';
import type { Payment } from '@/types/payment';

export default function PaymentsPage() {
  const {
    payments,
    stats,
    loading,
    error,
    refreshPayments,
    approvePayment,
    processRefund,
    exportPayments
  } = usePayment();

  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // 필터링 로직
  useEffect(() => {
    let filtered = payments;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(payment => 
        payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 상태 필터
    if (statusFilter) {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // 결제방법 필터
    if (methodFilter) {
      filtered = filtered.filter(payment => payment.method === methodFilter);
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter, methodFilter]);

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
  };

  const handleApprovePayment = async (payment: Payment) => {
    try {
      await approvePayment(payment.id);
    } catch (error) {
      console.error('결제 승인 실패:', error);
    }
  };

  const handleRefundPayment = async (payment: Payment) => {
    try {
      await processRefund(payment.id);
    } catch (error) {
      console.error('환불 처리 실패:', error);
    }
  };

  const handleExportPayments = async () => {
    try {
      await exportPayments();
    } catch (error) {
      console.error('결제 내역 내보내기 실패:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">결제 관리</h1>
          <p className="text-gray-600">모든 결제 내역을 관리하고 처리하세요.</p>
        </div>
        <Button
          onClick={handleExportPayments}
          className="inline-flex items-center"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          결제 내역 다운로드
        </Button>
      </div>

      {/* 통계 카드 */}
      <PaymentStatsCards stats={stats} />

      {/* 검색 및 필터 */}
      <PaymentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        methodFilter={methodFilter}
        onMethodChange={setMethodFilter}
        resultCount={filteredPayments.length}
      />

      {/* 결제 목록 테이블 */}
      <PaymentTable
        payments={filteredPayments}
        onView={handleViewPayment}
        onApprove={handleApprovePayment}
        onRefund={handleRefundPayment}
      />

      {/* 결제 상세 정보 모달 */}
      <PaymentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        payment={selectedPayment}
        onApprove={handleApprovePayment}
        onRefund={handleRefundPayment}
      />
    </div>
  );
}
