import { useState, useEffect } from 'react';
import type { Content, ContentStats, UseContentReturn } from '@/types/content';

const mockContents: Content[] = [
  {
    id: '1',
    title: '웹사이트 리뉴얼 안내',
    type: 'news',
    status: 'published',
    author: '관리자',
    reviewer: '편집장',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    publishedAt: '2024-01-15T10:00:00Z',
    reviewedAt: '2024-01-15T09:30:00Z',
    excerpt: '웹사이트가 새롭게 리뉴얼되었습니다.',
    tags: ['뉴스', '업데이트'],
    category: '공지사항',
    viewCount: 1250,
    featured: true,
    priority: 'high',
    seoTitle: '웹사이트 리뉴얼 - 새로운 기능과 개선사항',
    seoDescription: '웹사이트 리뉴얼을 통해 더 나은 사용자 경험을 제공합니다.'
  },
  {
    id: '2',
    title: '신제품 출시 예정',
    type: 'product',
    status: 'pending',
    author: '김철수',
    createdAt: '2024-01-14T09:30:00Z',
    updatedAt: '2024-01-14T09:30:00Z',
    excerpt: '새로운 제품이 곧 출시될 예정입니다.',
    tags: ['제품', '출시'],
    category: '제품',
    viewCount: 0,
    featured: false,
    priority: 'medium',
    reviewNotes: '마케팅 검토 필요'
  },
  {
    id: '3',
    title: '서비스 이용약관',
    type: 'page',
    status: 'approved',
    author: '법무팀',
    reviewer: '법무 책임자',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    publishedAt: '2024-01-12T16:45:00Z',
    reviewedAt: '2024-01-12T15:00:00Z',
    excerpt: '서비스 이용약관입니다.',
    tags: ['약관', '정책'],
    category: '법적 문서',
    viewCount: 3420,
    featured: false,
    priority: 'high'
  },
  {
    id: '4',
    title: '프로모션 이미지',
    type: 'image',
    status: 'scheduled',
    author: '디자인팀',
    createdAt: '2024-01-16T11:15:00Z',
    updatedAt: '2024-01-16T11:15:00Z',
    scheduledAt: '2024-01-20T09:00:00Z',
    excerpt: '새해 프로모션 배너 이미지',
    imageUrl: '/images/promo-banner.jpg',
    tags: ['프로모션', '배너'],
    category: '마케팅',
    viewCount: 0,
    featured: true,
    priority: 'medium'
  },
  {
    id: '5',
    title: '구버전 정책 문서',
    type: 'page',
    status: 'archived',
    author: '홍보팀',
    createdAt: '2023-12-01T11:15:00Z',
    updatedAt: '2023-12-01T11:15:00Z',
    publishedAt: '2023-12-01T11:15:00Z',
    excerpt: '구버전 회사 정책입니다.',
    tags: ['정책', '아카이브'],
    category: '회사 정보',
    viewCount: 2180,
    featured: false,
    priority: 'low'
  }
];

const mockStats: ContentStats = {
  totalContent: 847,
  publishedContent: 623,
  draftContent: 156,
  pendingContent: 45,
  archivedContent: 68,
  rejectedContent: 12,
  scheduledContent: 23,
  categoryStats: {
    '공지사항': 120,
    '제품': 180,
    '법적 문서': 45,
    '마케팅': 90,
    '회사 정보': 35
  },
  typeStats: {
    'post': 350,
    'page': 200,
    'news': 150,
    'product': 120,
    'image': 80,
    'video': 47
  }
};

export function useContent(): UseContentReturn {
  const [contents, setContents] = useState<Content[]>(mockContents);
  const [stats, setStats] = useState<ContentStats>(mockStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/content');
      // const data = await response.json();
      // setContents(data.contents);
      // setStats(data.stats);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setContents(mockContents);
      setStats(mockStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : '콘텐츠 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      // 실제 API 호출 시:
      // await fetch(`/api/content/${id}`, { method: 'DELETE' });
      
      setContents(prev => prev.filter(content => content.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '콘텐츠 삭제 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const updateContent = async (id: string, updates: Partial<Content>) => {
    try {
      // 실제 API 호출 시:
      // const response = await fetch(`/api/content/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      
      setContents(prev => prev.map(content => 
        content.id === id ? { ...content, ...updates, updatedAt: new Date().toISOString() } : content
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : '콘텐츠 수정 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const createContent = async (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // 실제 API 호출 시:
      // const response = await fetch('/api/content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(contentData)
      // });
      
      const newContent: Content = {
        ...contentData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setContents(prev => [newContent, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '콘텐츠 생성 중 오류가 발생했습니다.');
      throw err;
    }
  };

  const refreshContent = () => {
    fetchContent();
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    contents,
    stats,
    loading,
    error,
    refreshContent,
    deleteContent,
    updateContent,
    createContent
  };
}
