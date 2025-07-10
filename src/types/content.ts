// Content 관련 타입 정의
export interface Content {
  id: string;
  title: string;
  type: 'post' | 'page' | 'news' | 'product';
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  excerpt?: string;
  content?: string;
  tags: string[];
  category: string;
  viewCount: number;
  featured: boolean;
}

export interface ContentStats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  archivedContent: number;
}

export interface UseContentReturn {
  contents: Content[];
  stats: ContentStats;
  loading: boolean;
  error: string | null;
  refreshContent: () => void;
  deleteContent: (id: string) => Promise<void>;
  updateContent: (id: string, updates: Partial<Content>) => Promise<void>;
  createContent: (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}
