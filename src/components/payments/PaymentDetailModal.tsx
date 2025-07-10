import Modal from '@/components/Modal';
import { Button } from '@/components/Form';
import { cn } from '@/lib/utils';
import type { Payment } from '@/types/payment';

interface PaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
  onApprove: (payment: Payment) => void;
  onRefund: (payment: Payment) => void;
}

export default function PaymentDetailModal({ 
  isOpen, 
  onClose, 
  payment, 
  onApprove, 
  onRefund 
}: PaymentDetailModalProps) {
  if (!payment) return null;

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

  const handleApprove = () => {
    onApprove(payment);
    onClose();
  };

  const handleRefund = () => {
    onRefund(payment);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="결제 상세 정보"
      size="lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">거래ID</label>
            <p className="text-sm text-gray-900">{payment.transactionId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사용자</label>
            <p className="text-sm text-gray-900">{payment.userName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">결제금액</label>
            <p className="text-sm text-gray-900 font-semibold">₩{payment.amount.toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">결제방법</label>
            <p className="text-sm text-gray-900">{payment.method}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
            <div className="mt-1">{getStatusBadge(payment.status)}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">결제일시</label>
            <p className="text-sm text-gray-900">
              {new Date(payment.createdAt).toLocaleString('ko-KR')}
            </p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
          <p className="text-sm text-gray-900">{payment.description}</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              닫기
            </Button>
            {payment.status === 'pending' && (
              <Button
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                승인
              </Button>
            )}
            {payment.status === 'completed' && (
              <Button
                onClick={handleRefund}
                className="bg-red-600 hover:bg-red-700"
              >
                환불
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
