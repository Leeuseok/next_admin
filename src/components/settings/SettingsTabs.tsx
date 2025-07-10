import { 
  CogIcon, 
  ShieldCheckIcon, 
  EnvelopeIcon, 
  BellIcon, 
  CircleStackIcon 
} from '@heroicons/react/24/outline';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { key: 'general', label: '일반 설정', icon: CogIcon },
  { key: 'security', label: '보안 설정', icon: ShieldCheckIcon },
  { key: 'email', label: '이메일 설정', icon: EnvelopeIcon },
  { key: 'notifications', label: '알림 설정', icon: BellIcon },
  { key: 'backup', label: '백업 설정', icon: CircleStackIcon }
];

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
