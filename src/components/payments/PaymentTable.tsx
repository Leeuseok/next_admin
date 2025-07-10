import { useState } from 'react';
import Table from '@/components/Table';
import { cn } from '@/lib/utils';
import type { Payment } from '@/types/payment';
import type { TableColumn } from '@/types';

interface PaymentTableProps {
  payments: Payment[];
  onView: (payment: Payment) => void;
  onApprove: (payment: Payment) => void;
  onRefund: (payment: Payment) => void;
}

export default function PaymentTable({ payments, onView, onApprove, onRefund }: PaymentTableProps) {
  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      completed: { label: '완료', className: 'bg-green-100 text-green-800' },
      pending: { label: '대기', className: 'bg-yellow-100 text-yellow-800' },
      failed: { label: '실패', className: 'bg-red-100 text-red-800' },
      refunded: { label: '환불', className: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status];
    return (
      <span className={cn('px-2 py-1 text-xs font-medium rounded-full', config.className)}>
        {config.label}
      </span>
    );
  };

  const columns: TableColumn[] = [
    {
      key: 'transactionId',
      label: '거래ID',
      sortable: true
    },
    {
      key: 'userName',
      label: '사용자',
      sortable: true
    },
    {
      key: 'amount',
      label: '금액',
      sortable: true,
      render: (value: number) => `₩${value.toLocaleString()}`
    },
    {
      key: 'method',
      label: '결제방법',
      sortable: true
    },
    {
      key: 'status',
      label: '상태',
      sortable: true,
      render: (value: Payment['status']) => getStatusBadge(value)
    },
    {
      key: 'createdAt',
      label: '결제일시',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('ko-KR')
    },
    {
      key: 'actions',
      label: '작업',
      render: (_, row: Payment) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onView(row)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            상세보기
          </button>
          {row.status === 'pending' && (
            <button
              onClick={() => onApprove(row)}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              승인
            </button>
          )}
          {row.status === 'completed' && (
            <button
              onClick={() => onRefund(row)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              환불
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <Table
        data={payments}
        columns={columns}
        onRowClick={(payment) => onView(payment)}
      />
    </div>
  );
}
