import { Input } from '@/components/Form';
import type { SystemSettings } from '@/types/settings';

interface NotificationSettingsProps {
  settings: SystemSettings['notifications'];
  onChange: (field: string, value: any) => void;
}

export default function NotificationSettings({ settings, onChange }: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">알림 설정</h3>
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => onChange('emailNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">이메일 알림</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.smsNotifications}
            onChange={(e) => onChange('smsNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">SMS 알림</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => onChange('pushNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">푸시 알림</span>
        </label>
      </div>
      <Input
        name="slackWebhook"
        label="Slack 웹훅 URL"
        type="url"
        value={settings.slackWebhook}
        onChange={(e) => onChange('slackWebhook', e.target.value)}
        placeholder="https://hooks.slack.com/services/..."
      />
    </div>
  );
}
