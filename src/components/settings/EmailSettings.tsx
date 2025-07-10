import { Input, Button } from '@/components/Form';
import type { SystemSettings } from '@/types/settings';

interface EmailSettingsProps {
  settings: SystemSettings['email'];
  onChange: (field: string, value: any) => void;
  onTestEmail: () => void;
}

export default function EmailSettings({ settings, onChange, onTestEmail }: EmailSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">이메일 설정</h3>
        <Button
          onClick={onTestEmail}
          variant="secondary"
          size="sm"
        >
          테스트 이메일 전송
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="smtpHost"
          label="SMTP 호스트"
          value={settings.smtpHost}
          onChange={(e) => onChange('smtpHost', e.target.value)}
          placeholder="smtp.gmail.com"
        />
        <Input
          name="smtpPort"
          label="SMTP 포트"
          type="number"
          value={settings.smtpPort}
          onChange={(e) => onChange('smtpPort', parseInt(e.target.value))}
          min="1"
          max="65535"
        />
        <Input
          name="smtpUsername"
          label="SMTP 사용자명"
          value={settings.smtpUsername}
          onChange={(e) => onChange('smtpUsername', e.target.value)}
        />
        <Input
          name="smtpPassword"
          label="SMTP 비밀번호"
          type="password"
          value={settings.smtpPassword}
          onChange={(e) => onChange('smtpPassword', e.target.value)}
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.enableSsl}
            onChange={(e) => onChange('enableSsl', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">SSL 암호화 사용</span>
        </label>
      </div>
    </div>
  );
}
