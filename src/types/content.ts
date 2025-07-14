// Content 관련 타입 정의
export interface Content {
  id: string;
  title: string;
  type: 'post' | 'page' | 'news' | 'product' | 'image' | 'video';
  status: 'draft' | 'pending' | 'approved' | 'published' | 'rejected' | 'archived' | 'scheduled';
  author: string;
  reviewer?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  reviewedAt?: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  tags: string[];
  category: string;
  viewCount: number;
  featured: boolean;
  priority: 'low' | 'medium' | 'high';
  seoTitle?: string;
  seoDescription?: string;
  reviewNotes?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  usageCount: number;
  createdAt: string;
}

export interface ContentStats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  pendingContent: number;
  archivedContent: number;
  rejectedContent: number;
  scheduledContent: number;
  categoryStats: { [category: string]: number };
  typeStats: { [type: string]: number };
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
