// Payment 관련 타입 정의
export interface Payment {
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

export interface PaymentStats {
  totalAmount: number;
  completedCount: number;
  pendingCount: number;
  failedCount: number;
  refundedCount: number;
}

export interface UsePaymentReturn {
  payments: Payment[];
  stats: PaymentStats;
  loading: boolean;
  error: string | null;
  refreshPayments: () => void;
  updatePaymentStatus: (id: string, status: Payment['status']) => Promise<void>;
  processRefund: (id: string) => Promise<void>;
  approvePayment: (id: string) => Promise<void>;
  exportPayments: () => Promise<void>;
}
