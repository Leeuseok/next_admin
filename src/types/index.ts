// 사용자 관련 타입
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  profileImage?: string;
  phone?: string;
}

// 콘텐츠 관련 타입
export interface Content {
  id: string;
  title: string;
  content: string;
  type: 'post' | 'product' | 'page';
  status: 'published' | 'draft' | 'scheduled';
  authorId: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  featuredImage?: string;
  views: number;
}

// 공지사항 타입
export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'maintenance';
  status: 'published' | 'draft';
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  priority: number;
}

// 문의/답변 타입
export interface Inquiry {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'bug' | 'feature' | 'complaint';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  userId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface InquiryResponse {
  id: string;
  inquiryId: string;
  content: string;
  authorId: string;
  createdAt: Date;
  isInternal: boolean;
}

// 통계 데이터 타입
export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalContent: number;
  publishedContent: number;
  totalViews: number;
  todayViews: number;
  conversionRate: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

// 권한 관리 타입
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

// 활동 로그 타입
export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

// 결제 관련 타입
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'bank' | 'paypal' | 'crypto';
  transactionId: string;
  createdAt: Date;
  completedAt?: Date;
  description?: string;
}

// 시스템 설정 타입
export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  description: string;
  category: string;
  isEditable: boolean;
  updatedAt: Date;
  updatedBy: string;
}

// 알림 타입
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  targetUsers: string[];
  channels: ('email' | 'push' | 'sms')[];
  status: 'draft' | 'sent' | 'scheduled';
  createdAt: Date;
  scheduledAt?: Date;
  sentAt?: Date;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 테이블 관련 타입
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
}

// 폼 관련 타입
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: any;
}

// 대시보드 위젯 타입
export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'table' | 'activity';
  size: 'small' | 'medium' | 'large';
  data: any;
  refreshInterval?: number;
}
