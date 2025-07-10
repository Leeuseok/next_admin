// 문의/답변 관련 타입 정의
export interface Inquiry {
  id: string;
  title: string;
  content: string;
  type: 'bug' | 'feature' | 'complaint' | 'general';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  userId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface InquiryResponse {
  id: string;
  inquiryId: string;
  content: string;
  authorId: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface InquiryFilter {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  assigneeFilter: string;
}

// 사용자 타입
export interface User {
  id: string;
  name: string;
  email: string;
}

// 관리자 타입
export interface Admin {
  id: string;
  name: string;
}
