import { Input } from '@/components/Form';
import type { SystemSettings } from '@/types/settings';

interface SecuritySettingsProps {
  settings: SystemSettings['security'];
  onChange: (field: string, value: any) => void;
}

export default function SecuritySettings({ settings, onChange }: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">보안 설정</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="sessionTimeout"
          label="세션 타임아웃 (분)"
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => onChange('sessionTimeout', parseInt(e.target.value))}
          min="1"
          max="1440"
        />
        <Input
          name="passwordMinLength"
          label="최소 비밀번호 길이"
          type="number"
          value={settings.passwordMinLength}
          onChange={(e) => onChange('passwordMinLength', parseInt(e.target.value))}
          min="4"
          max="50"
        />
        <Input
          name="loginAttempts"
          label="최대 로그인 시도 횟수"
          type="number"
          value={settings.loginAttempts}
          onChange={(e) => onChange('loginAttempts', parseInt(e.target.value))}
          min="1"
          max="10"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.enableTwoFactor}
            onChange={(e) => onChange('enableTwoFactor', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">2단계 인증 활성화</span>
        </label>
      </div>
    </div>
  );
}
