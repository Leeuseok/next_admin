import { Input, Select, Button } from '@/components/Form';
import type { SystemSettings } from '@/types/settings';

interface BackupSettingsProps {
  settings: SystemSettings['backup'];
  onChange: (field: string, value: any) => void;
  onExecuteBackup: () => void;
}

export default function BackupSettings({ settings, onChange, onExecuteBackup }: BackupSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">백업 설정</h3>
        <Button
          onClick={onExecuteBackup}
          className="bg-green-600 hover:bg-green-700"
          size="sm"
        >
          백업 실행
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          name="backupInterval"
          label="백업 주기"
          value={settings.backupInterval}
          onChange={(e) => onChange('backupInterval', e.target.value)}
          options={[
            { value: 'hourly', label: '매시간' },
            { value: 'daily', label: '매일' },
            { value: 'weekly', label: '매주' },
            { value: 'monthly', label: '매월' }
          ]}
        />
        <Input
          name="retentionDays"
          label="보관 일수"
          type="number"
          value={settings.retentionDays}
          onChange={(e) => onChange('retentionDays', parseInt(e.target.value))}
          min="1"
          max="365"
        />
      </div>
      <Input
        name="backupLocation"
        label="백업 위치"
        value={settings.backupLocation}
        onChange={(e) => onChange('backupLocation', e.target.value)}
        placeholder="/backups"
      />
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.autoBackup}
            onChange={(e) => onChange('autoBackup', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">자동 백업 활성화</span>
        </label>
      </div>
    </div>
  );
}
