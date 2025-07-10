'use client';

import { useState } from 'react';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import SettingsTabs from '@/components/settings/SettingsTabs';
import GeneralSettings from '@/components/settings/GeneralSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import EmailSettings from '@/components/settings/EmailSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import BackupSettings from '@/components/settings/BackupSettings';
import { useSettings } from '@/hooks/useSettings';

export default function SettingsPage() {
  const {
    settings,
    loading,
    error,
    updateSettings,
    handleInputChange,
    refreshSettings
  } = useSettings();
  
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'backup' | 'test' | null>(null);
  const [testEmailRecipient, setTestEmailRecipient] = useState<string>('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSave = async () => {
    try {
      await updateSettings(settings);
      alert('설정이 저장되었습니다.');
    } catch (error) {
      alert('설정 저장 중 오류가 발생했습니다.');
    }
  };

  const handleBackup = () => {
    setModalType('backup');
    setIsModalOpen(true);
  };

  const handleTestEmail = () => {
    setTestEmailRecipient(settings.general.adminEmail);
    setModalType('test');
    setIsModalOpen(true);
  };
  
  const handleExecuteBackup = () => {
    // 백업 실행 로직 - 실제로는 API 호출
    alert('백업이 시작되었습니다.');
    setIsModalOpen(false);
  };
  
  const handleSendTestEmail = () => {
    // 테스트 이메일 전송 로직 - 실제로는 API 호출
    alert('테스트 이메일이 전송되었습니다.');
    setIsModalOpen(false);
  };

  // 특정 섹션의 필드 업데이트를 위한 핸들러
  const handleSectionChange = (section: keyof typeof settings, field: string, value: any) => {
    handleInputChange(section, field, value);
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
            onClick={refreshSettings}
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
        <h1 className="text-2xl font-bold text-gray-900">시스템 설정</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleBackup}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <CircleStackIcon className="h-4 w-4" />
            <span>백업 실행</span>
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            저장
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* 탭 네비게이션 */}
        <SettingsTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* 탭 컨텐츠 */}
        <div className="p-6">
          {activeTab === 'general' && (
            <GeneralSettings 
              settings={settings.general}
              onChange={(field, value) => handleSectionChange('general', field, value)} 
            />
          )}

          {activeTab === 'security' && (
            <SecuritySettings 
              settings={settings.security}
              onChange={(field, value) => handleSectionChange('security', field, value)} 
            />
          )}

          {activeTab === 'email' && (
            <EmailSettings 
              settings={settings.email}
              onChange={(field, value) => handleSectionChange('email', field, value)}
              onTestEmail={handleTestEmail} 
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationSettings 
              settings={settings.notifications}
              onChange={(field, value) => handleSectionChange('notifications', field, value)} 
            />
          )}

          {activeTab === 'backup' && (
            <BackupSettings 
              settings={settings.backup}
              onChange={(field, value) => handleSectionChange('backup', field, value)} 
              onExecuteBackup={handleBackup}
            />
          )}
        </div>
      </div>

      {/* 백업/테스트 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'backup' ? '백업 실행' : '이메일 테스트'}
      >
        <div className="space-y-4">
          {modalType === 'backup' ? (
            <div>
              <p className="text-sm text-gray-600">
                시스템 백업을 실행하시겠습니까? 이 작업은 몇 분이 소요될 수 있습니다.
              </p>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={handleExecuteBackup}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  백업 실행
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600">
                현재 SMTP 설정으로 테스트 이메일을 전송하시겠습니까?
              </p>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">받는 사람</label>
                <input
                  type="email"
                  value={testEmailRecipient}
                  onChange={(e) => setTestEmailRecipient(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={handleSendTestEmail}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  전송
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
