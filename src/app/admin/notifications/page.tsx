'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import NotificationStatsCards from '@/components/notifications/NotificationStatsCards';
import NotificationTable from '@/components/notifications/NotificationTable';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import NotificationDetailModal from '@/components/notifications/NotificationDetailModal';
import TemplateTable from '@/components/notifications/TemplateTable';
import TemplateFormModal from '@/components/notifications/TemplateFormModal';
import { useNotifications } from '@/hooks/useNotifications';
import type { Notification, NotificationTemplate } from '@/types/notifications';

export default function NotificationsPage() {
  const {
    notifications,
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
    refreshNotifications
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<'list' | 'templates'>('list');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | undefined>(undefined);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailModalOpen(true);
  };

  const handleCreateNotification = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditTemplate = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setIsTemplateModalOpen(true);
  };

  const handleAddTemplate = () => {
    setSelectedTemplate(undefined);
    setIsTemplateModalOpen(true);
  };

  const handleMarkAsRead = (notificationId: string) => {
    updateNotificationStatus(notificationId, 'read');
    setIsDetailModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center p-8">로드 중...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
          <button
            onClick={refreshNotifications}
            className="ml-4 underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">알림 관리</h1>
        <button
          onClick={handleCreateNotification}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>알림 생성</span>
        </button>
      </div>

      {/* 통계 카드 */}
      <NotificationStatsCards
        unreadCount={stats.unreadCount}
        highPriorityCount={stats.highPriorityCount}
        todayCount={stats.todayCount}
        totalCount={stats.totalCount}
      />

      {/* 탭 메뉴 */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              알림 목록
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              알림 템플릿
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'list' && (
            <div className="space-y-6">
              {/* 필터링 및 검색 */}
              <NotificationFilters
                filters={filters}
                onFilterChange={updateFilters}
              />
              
              {/* 알림 목록 테이블 */}
              <NotificationTable
                notifications={notifications}
                onView={handleViewNotification}
                onDelete={deleteNotification}
              />
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">알림 템플릿</h3>
                <button
                  onClick={handleAddTemplate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center space-x-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>템플릿 추가</span>
                </button>
              </div>

              {/* 템플릿 목록 테이블 */}
              <TemplateTable
                templates={templates}
                onEdit={handleEditTemplate}
                onDelete={deleteTemplate}
              />
            </div>
          )}
        </div>
      </div>

      {/* 알림 상세 모달 */}
      {selectedNotification && (
        <NotificationDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          notification={selectedNotification}
          onMarkAsRead={() => handleMarkAsRead(selectedNotification.id)}
        />
      )}

      {/* 알림 생성 모달 */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="알림 생성"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">제목</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">메시지</label>
            <textarea
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">타입</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="info">정보</option>
                <option value="success">성공</option>
                <option value="warning">경고</option>
                <option value="error">오류</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">우선순위</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="low">낮음</option>
                <option value="medium">보통</option>
                <option value="high">높음</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">카테고리</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={() => {
                // 알림 생성 로직
                alert('알림이 생성되었습니다.');
                setIsCreateModalOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              생성
            </button>
          </div>
        </div>
      </Modal>

      {/* 템플릿 폼 모달 */}
      <TemplateFormModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        template={selectedTemplate}
        onSave={(template) => {
          // Add a generated ID if it's a new template
          const completeTemplate: NotificationTemplate = {
            id: template.id || Date.now().toString(),
            name: template.name || '',
            title: template.title || '',
            message: template.message || '',
            type: template.type || 'info',
            category: template.category || '',
            isActive: template.isActive !== undefined ? template.isActive : true
          };
          saveTemplate(completeTemplate);
          setIsTemplateModalOpen(false);
        }}
      />
    </div>
  );
}
