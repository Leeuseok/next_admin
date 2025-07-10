import { useState, useEffect } from 'react';
import type { Notification, NotificationTemplate, NotificationFilter } from '@/types/notifications';

// 샘플 알림 데이터
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: '새로운 사용자 가입',
    message: '김철수님이 새로 가입했습니다.',
    type: 'info',
    priority: 'medium',
    status: 'unread',
    createdAt: '2024-01-15T10:30:00Z',
    targetUser: 'admin',
    category: '사용자 관리',
    actions: ['approve', 'view']
  },
  {
    id: '2',
    title: '결제 실패',
    message: '이영희님의 결제가 실패했습니다.',
    type: 'error',
    priority: 'high',
    status: 'read',
    createdAt: '2024-01-15T09:15:00Z',
    targetUser: 'admin',
    category: '결제',
    actions: ['retry', 'contact']
  },
  {
    id: '3',
    title: '시스템 백업 완료',
    message: '일일 백업이 성공적으로 완료되었습니다.',
    type: 'success',
    priority: 'low',
    status: 'read',
    createdAt: '2024-01-15T08:00:00Z',
    targetUser: 'system',
    category: '시스템',
    actions: ['view']
  },
  {
    id: '4',
    title: '서버 디스크 사용량 경고',
    message: '서버 디스크 사용량이 80%를 초과했습니다.',
    type: 'warning',
    priority: 'high',
    status: 'unread',
    createdAt: '2024-01-15T07:45:00Z',
    targetUser: 'admin',
    category: '시스템',
    actions: ['cleanup', 'expand']
  }
];

// 샘플 알림 템플릿
const sampleTemplates: NotificationTemplate[] = [
  {
    id: '1',
    name: '사용자 가입',
    title: '새로운 사용자 가입',
    message: '{username}님이 새로 가입했습니다.',
    type: 'info',
    category: '사용자 관리',
    isActive: true
  },
  {
    id: '2',
    name: '결제 실패',
    title: '결제 실패',
    message: '{username}님의 결제가 실패했습니다. 사유: {reason}',
    type: 'error',
    category: '결제',
    isActive: true
  },
  {
    id: '3',
    name: '시스템 백업',
    title: '시스템 백업 완료',
    message: '{type} 백업이 성공적으로 완료되었습니다.',
    type: 'success',
    category: '시스템',
    isActive: true
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [templates, setTemplates] = useState<NotificationTemplate[]>(sampleTemplates);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<NotificationFilter>({
    searchTerm: '',
    status: 'all',
    type: 'all'
  });

  // 필터링된 알림 데이터
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || notification.status === filters.status;
    const matchesType = filters.type === 'all' || notification.type === filters.type;
    return matchesSearch && matchesStatus && matchesType;
  });

  // 통계 계산
  const stats = {
    unreadCount: notifications.filter(n => n.status === 'unread').length,
    highPriorityCount: notifications.filter(n => n.priority === 'high').length,
    todayCount: notifications.filter(n => {
      const today = new Date().toDateString();
      return new Date(n.createdAt).toDateString() === today;
    }).length,
    totalCount: notifications.length
  };

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/notifications');
      // const data = await response.json();
      // setNotifications(data);
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      setNotifications(sampleNotifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알림을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/notification-templates');
      // const data = await response.json();
      // setTemplates(data);
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      setTemplates(sampleTemplates);
    } catch (err) {
      setError(err instanceof Error ? err.message : '템플릿을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 알림 상태 변경 (읽음, 보관 등)
  const updateNotificationStatus = (id: string, status: Notification['status']) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status } : n
    ));
  };

  // 알림 삭제
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // 템플릿 추가/수정
  const saveTemplate = (template: NotificationTemplate) => {
    if (template.id) {
      // 기존 템플릿 수정
      setTemplates(prev => prev.map(t => 
        t.id === template.id ? template : t
      ));
    } else {
      // 새 템플릿 추가
      const newTemplate = {
        ...template,
        id: Date.now().toString()
      };
      setTemplates([...templates, newTemplate]);
    }
  };

  // 템플릿 삭제
  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  // 필터 설정 업데이트
  const updateFilters = (newFilters: Partial<NotificationFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchNotifications();
    fetchTemplates();
  }, []);

  return {
    notifications: filteredNotifications,
    templates,
    loading,
    error,
    stats,
    filters,
    updateFilters,
    updateNotificationStatus,
    deleteNotification,
    saveTemplate,
    deleteTemplate,
    refreshNotifications: fetchNotifications,
    refreshTemplates: fetchTemplates
  };
}
