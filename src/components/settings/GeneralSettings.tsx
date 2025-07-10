import { Input, Select, Textarea } from '@/components/Form';
import type { SystemSettings } from '@/types/settings';

interface GeneralSettingsProps {
  settings: SystemSettings['general'];
  onChange: (field: string, value: any) => void;
}

export default function GeneralSettings({ settings, onChange }: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">일반 설정</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="siteName"
          label="사이트 이름"
          value={settings.siteName}
          onChange={(e) => onChange('siteName', e.target.value)}
          required
        />
        <Input
          name="adminEmail"
          label="관리자 이메일"
          type="email"
          value={settings.adminEmail}
          onChange={(e) => onChange('adminEmail', e.target.value)}
          required
        />
        <Select
          name="timezone"
          label="시간대"
          value={settings.timezone}
          onChange={(e) => onChange('timezone', e.target.value)}
          options={[
            { value: 'Asia/Seoul', label: 'Asia/Seoul' },
            { value: 'UTC', label: 'UTC' },
            { value: 'America/New_York', label: 'America/New_York' },
            { value: 'Europe/London', label: 'Europe/London' }
          ]}
        />
        <Select
          name="language"
          label="언어"
          value={settings.language}
          onChange={(e) => onChange('language', e.target.value)}
          options={[
            { value: 'ko', label: '한국어' },
            { value: 'en', label: 'English' },
            { value: 'ja', label: '日本語' }
          ]}
        />
      </div>
      <Textarea
        name="siteDescription"
        label="사이트 설명"
        value={settings.siteDescription}
        onChange={(e) => onChange('siteDescription', e.target.value)}
        rows={3}
      />
    </div>
  );
}
