// 알림 관련 타입 정의
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high';
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
  targetUser?: string;
  category: string;
  actions?: string[];
}

// 알림 템플릿 타입
export interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: string;
  isActive: boolean;
}

// 알림 필터 타입
export interface NotificationFilter {
  searchTerm: string;
  status: string;
  type: string;
}
