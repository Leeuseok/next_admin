import React from 'react';
import Modal from '@/components/Modal';
import { Button, Textarea } from '@/components/Form';
import type { Inquiry } from '@/types/inquiries';

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: Inquiry | null;
  response: string;
  onResponseChange: (value: string) => void;
  onSubmit: () => void;
}

export default function ResponseModal({
  isOpen,
  onClose,
  inquiry,
  response,
  onResponseChange,
  onSubmit
}: ResponseModalProps) {
  if (!inquiry) return null;
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="답변 작성"
      size="lg"
    >
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-md p-4">
          <h4 className="font-medium text-gray-900 mb-2">문의 제목</h4>
          <p className="text-sm text-gray-600">{inquiry.title}</p>
        </div>
        <Textarea
          name="response"
          label="답변 내용"
          value={response}
          onChange={(e) => onResponseChange(e.target.value)}
          rows={6}
          placeholder="답변을 입력하세요..."
          required
        />
        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            취소
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={!response.trim()}
          >
            답변 등록
          </Button>
        </div>
      </div>
    </Modal>
  );
}
