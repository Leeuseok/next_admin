// Settings 관련 타입 정의
export interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    adminEmail: string;
    timezone: string;
    language: string;
  };
  security: {
    sessionTimeout: number;
    passwordMinLength: number;
    enableTwoFactor: boolean;
    loginAttempts: number;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    enableSsl: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    slackWebhook: string;
  };
  backup: {
    autoBackup: boolean;
    backupInterval: string;
    retentionDays: number;
    backupLocation: string;
  };
}
