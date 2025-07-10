import { useState, useEffect } from 'react';
import type { Inquiry, InquiryResponse, User, Admin, InquiryFilter } from '@/types/inquiries';

// 샘플 사용자 데이터
const sampleUsers: User[] = [
  { id: '1', name: '김철수', email: 'kim@example.com' },
  { id: '2', name: '이영희', email: 'lee@example.com' },
  { id: '3', name: '박민수', email: 'park@example.com' },
  { id: '4', name: '정수진', email: 'jung@example.com' },
  { id: '5', name: '최민호', email: 'choi@example.com' }
];

// 샘플 관리자 데이터
const sampleAdmins: Admin[] = [
  { id: '1', name: '관리자1' },
  { id: '2', name: '관리자2' }
];

// 샘플 문의 데이터
const sampleInquiries: Inquiry[] = [
  {
    id: '1',
    title: '로그인 문제',
    content: '로그인이 되지 않습니다. 비밀번호를 재설정해도 같은 문제가 발생합니다.',
    type: 'bug',
    status: 'pending',
    userId: '1',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    title: '새로운 기능 요청',
    content: '대시보드에 더 많은 차트 옵션을 추가해주세요.',
    type: 'feature',
    status: 'in_progress',
    userId: '2',
    assignedTo: '1',
    createdAt: new Date('2024-01-14T15:20:00'),
    updatedAt: new Date('2024-01-14T16:45:00')
  },
  {
    id: '3',
    title: '서비스 불만',
    content: '결제 처리가 너무 느립니다. 개선이 필요합니다.',
    type: 'complaint',
    status: 'resolved',
    userId: '3',
    assignedTo: '2',
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T14:20:00'),
    resolvedAt: new Date('2024-01-13T14:20:00')
  },
  {
    id: '4',
    title: '일반 문의',
    content: '사용법에 대해 자세히 알고 싶습니다.',
    type: 'general',
    status: 'closed',
    userId: '4',
    assignedTo: '1',
    createdAt: new Date('2024-01-12T11:30:00'),
    updatedAt: new Date('2024-01-12T16:00:00')
  },
  {
    id: '5',
    title: '페이지 로딩 오류',
    content: '특정 페이지가 로딩되지 않습니다. 오류 메시지가 표시됩니다.',
    type: 'bug',
    status: 'pending',
    userId: '5',
    createdAt: new Date('2024-01-11T14:45:00'),
    updatedAt: new Date('2024-01-11T14:45:00')
  }
];

// 샘플 응답 데이터
const sampleResponses: InquiryResponse[] = [
  {
    id: '1',
    inquiryId: '2',
    content: '해당 기능에 대해 검토 중입니다. 다음 업데이트에서 반영될 예정입니다.',
    authorId: '1',
    createdAt: new Date('2024-01-14T16:45:00'),
    isInternal: false
  },
  {
    id: '2',
    inquiryId: '3',
    content: '결제 시스템을 개선하였습니다. 이제 더 빠른 처리가 가능합니다.',
    authorId: '2',
    createdAt: new Date('2024-01-13T14:20:00'),
    isInternal: false
  }
];

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(sampleInquiries);
  const [responses, setResponses] = useState<InquiryResponse[]>(sampleResponses);
  const [users] = useState<User[]>(sampleUsers);
  const [admins] = useState<Admin[]>(sampleAdmins);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<InquiryFilter>({
    searchTerm: '',
    statusFilter: '',
    typeFilter: '',
    assigneeFilter: ''
  });

  // 필터링된 문의 데이터
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = !filters.searchTerm || 
      inquiry.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      inquiry.content.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus = !filters.statusFilter || inquiry.status === filters.statusFilter;
    const matchesType = !filters.typeFilter || inquiry.type === filters.typeFilter;
    const matchesAssignee = !filters.assigneeFilter || inquiry.assignedTo === filters.assigneeFilter;

    return matchesSearch && matchesStatus && matchesType && matchesAssignee;
  });

  // 통계
  const stats = {
    pendingCount: inquiries.filter(i => i.status === 'pending').length,
    inProgressCount: inquiries.filter(i => i.status === 'in_progress').length,
    resolvedCount: inquiries.filter(i => i.status === 'resolved').length,
    closedCount: inquiries.filter(i => i.status === 'closed').length,
    totalCount: inquiries.length
  };

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/inquiries');
      // const data = await response.json();
      // setInquiries(data);
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      setInquiries(sampleInquiries);
    } catch (err) {
      setError(err instanceof Error ? err.message : '문의를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/inquiry-responses');
      // const data = await response.json();
      // setResponses(data);
      
      // 현재는 mock 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      setResponses(sampleResponses);
    } catch (err) {
      setError(err instanceof Error ? err.message : '답변을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 문의 상태 변경
  const updateInquiryStatus = (inquiryId: string, newStatus: Inquiry['status']) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === inquiryId 
        ? { 
            ...inquiry, 
            status: newStatus,
            updatedAt: new Date(),
            resolvedAt: newStatus === 'resolved' ? new Date() : undefined
          }
        : inquiry
    ));
  };

  // 문의 담당자 변경
  const updateInquiryAssignee = (inquiryId: string, assigneeId: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === inquiryId 
        ? { 
            ...inquiry, 
            assignedTo: assigneeId || undefined,
            updatedAt: new Date()
          }
        : inquiry
    ));
  };

  // 답변 추가
  const addResponse = (inquiryId: string, content: string, authorId: string, isInternal: boolean = false) => {
    const response: InquiryResponse = {
      id: Date.now().toString(),
      inquiryId,
      content,
      authorId,
      createdAt: new Date(),
      isInternal
    };
    setResponses([...responses, response]);
    
    // 문의 상태를 '진행 중'으로 업데이트
    const inquiry = inquiries.find(i => i.id === inquiryId);
    if (inquiry && inquiry.status === 'pending') {
      updateInquiryStatus(inquiryId, 'in_progress');
    }

    return response;
  };

  // 필터 설정 업데이트
  const updateFilters = (newFilters: Partial<InquiryFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // 특정 문의의 모든 답변 가져오기
  const getInquiryResponses = (inquiryId: string) => {
    return responses.filter(r => r.inquiryId === inquiryId);
  };

  useEffect(() => {
    fetchInquiries();
    fetchResponses();
  }, []);

  return {
    inquiries: filteredInquiries,
    responses,
    users,
    admins,
    loading,
    error,
    stats,
    filters,
    updateFilters,
    updateInquiryStatus,
    updateInquiryAssignee,
    addResponse,
    getInquiryResponses,
    refreshInquiries: fetchInquiries,
    refreshResponses: fetchResponses
  };
}
