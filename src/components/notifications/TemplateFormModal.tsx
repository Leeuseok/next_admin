import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { Input, Select, Textarea, Checkbox, Button } from '@/components/Form';
import type { NotificationTemplate } from '@/types/notifications';

interface TemplateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: NotificationTemplate;
  onSave: (template: Partial<NotificationTemplate>) => void;
}

export default function TemplateFormModal({ isOpen, onClose, template, onSave }: TemplateFormModalProps) {
  const [formData, setFormData] = useState<Partial<NotificationTemplate>>(
    template || {
      name: '',
      title: '',
      message: '',
      type: 'info',
      category: '',
      isActive: true
    }
  );

  const handleChange = (field: keyof NotificationTemplate, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={template ? '알림 템플릿 수정' : '새 알림 템플릿'}
    >
      <div className="space-y-4">
        <Input
          name="name"
          label="템플릿 이름"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
        
        <Input
          name="title"
          label="제목 템플릿"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="예: 새로운 {type} 알림"
          required
        />
        
        <Textarea
          name="message"
          label="메시지 템플릿"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="예: {username}님이 {action}했습니다."
          rows={3}
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Select
            name="type"
            label="타입"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            options={[
              { value: 'info', label: '정보' },
              { value: 'success', label: '성공' },
              { value: 'warning', label: '경고' },
              { value: 'error', label: '오류' }
            ]}
          />
          
          <Input
            name="category"
            label="카테고리"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
        </div>
        
        <Checkbox
          name="isActive"
          label="활성화"
          checked={formData.isActive}
          onChange={(e) => handleChange('isActive', e.target.checked)}
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            취소
          </Button>
          <Button onClick={handleSubmit}>
            {template ? '수정' : '추가'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
