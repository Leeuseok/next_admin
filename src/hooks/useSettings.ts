import { useState, useEffect } from 'react';
import type { SystemSettings } from '@/types/settings';

const initialSettings: SystemSettings = {
  general: {
    siteName: 'Admin Panel',
    siteDescription: '관리자 패널 시스템',
    adminEmail: 'admin@example.com',
    timezone: 'Asia/Seoul',
    language: 'ko'
  },
  security: {
    sessionTimeout: 30,
    passwordMinLength: 8,
    enableTwoFactor: true,
    loginAttempts: 5
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    enableSsl: true
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    slackWebhook: ''
  },
  backup: {
    autoBackup: true,
    backupInterval: 'daily',
    retentionDays: 30,
    backupLocation: '/backups'
  }
};

export function useSettings() {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/settings');
      // const data = await response.json();
      // setSettings(data);
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      setSettings(initialSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : '설정을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: SystemSettings) => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newSettings)
      // });
      // if (!response.ok) throw new Error('설정 저장 실패');
      
      // 현재는 상태만 업데이트
      setSettings(newSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : '설정 저장 중 오류가 발생했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings,
    handleInputChange,
    refreshSettings: fetchSettings
  };
}
