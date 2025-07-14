import { useState } from 'react';
import { Input, Select, Button, Textarea } from '@/components/Form';
import type { Content } from '@/types/content';

interface ContentFormProps {
  content?: Content;
  onSubmit: (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function ContentForm({ content, onSubmit, onCancel, isEdit = false }: ContentFormProps) {
  const [formData, setFormData] = useState({
    title: content?.title || '',
    content: content?.content || '',
    type: content?.type || 'post' as const,
    status: content?.status || 'draft' as const,
    category: content?.category || '',
    tags: content?.tags || [],
    tagInput: '',
    author: content?.author || '',
    featured: content?.featured || false,
    excerpt: content?.excerpt || '',
    priority: content?.priority || 'medium' as const,
    scheduledAt: content?.scheduledAt ? content.scheduledAt.split('T')[0] : '',
    seoTitle: content?.seoTitle || '',
    seoDescription: content?.seoDescription || ''
  });

  const categories = [
    '공지사항',
    '뉴스',
    '제품',
    '회사 정보',
    '법적 문서',
    '블로그',
    '이벤트',
    '기타'
  ];

  const handleAddTag = (tagInput: string) => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag],
        tagInput: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contentData = {
      title: formData.title,
      content: formData.content,
      type: formData.type,
      status: formData.status,
      category: formData.category,
      tags: formData.tags,
      author: formData.author,
      featured: formData.featured,
      excerpt: formData.excerpt,
      priority: formData.priority,
      viewCount: content?.viewCount || 0,
      publishedAt: formData.status === 'published' ? new Date().toISOString() : content?.publishedAt,
      scheduledAt: formData.scheduledAt ? new Date(formData.scheduledAt).toISOString() : undefined,
      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
      reviewer: content?.reviewer,
      reviewedAt: content?.reviewedAt,
      reviewNotes: content?.reviewNotes
    };

    onSubmit(contentData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        label="제목"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      
      <Textarea
        name="excerpt"
        label="요약"
        value={formData.excerpt}
        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
        rows={2}
        placeholder="콘텐츠 요약을 입력하세요"
      />
      
      <Textarea
        name="content"
        label="내용"
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        rows={8}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          name="type"
          label="타입"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value as Content['type']})}
          options={[
            { value: 'post', label: '게시글' },
            { value: 'page', label: '페이지' },
            { value: 'news', label: '뉴스' },
            { value: 'product', label: '제품' },
            { value: 'image', label: '이미지' },
            { value: 'video', label: '비디오' }
          ]}
        />
        
        <Select
          name="status"
          label="상태"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value as Content['status']})}
          options={[
            { value: 'draft', label: '임시저장' },
            { value: 'pending', label: '검토 대기' },
            { value: 'approved', label: '승인됨' },
            { value: 'published', label: '게시됨' },
            { value: 'scheduled', label: '예약됨' },
            { value: 'archived', label: '보관됨' }
          ]}
        />
        
        <Select
          name="category"
          label="카테고리"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          options={categories.map(cat => ({ value: cat, label: cat }))}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="author"
          label="작성자"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          required
        />
        
        <Select
          name="priority"
          label="우선순위"
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value as Content['priority']})}
          options={[
            { value: 'low', label: '낮음' },
            { value: 'medium', label: '보통' },
            { value: 'high', label: '높음' }
          ]}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
            추천 콘텐츠
          </label>
        </div>
        
        {formData.status === 'scheduled' && (
          <Input
            name="scheduledAt"
            label="예약 날짜"
            type="date"
            value={formData.scheduledAt}
            onChange={(e) => setFormData({...formData, scheduledAt: e.target.value})}
          />
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <Input
            name="tagInput"
            placeholder="태그를 입력하세요"
            value={formData.tagInput}
            onChange={(e) => setFormData({...formData, tagInput: e.target.value})}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag(formData.tagInput);
              }
            }}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleAddTag(formData.tagInput)}
            className="ml-2"
          >
            추가
          </Button>
        </div>
      </div>
      
      {/* SEO 섹션 */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">SEO 설정</h4>
        <div className="space-y-4">
          <Input
            name="seoTitle"
            label="SEO 제목"
            value={formData.seoTitle}
            onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
            placeholder="검색 엔진에 표시될 제목"
          />
          
          <Textarea
            name="seoDescription"
            label="SEO 설명"
            value={formData.seoDescription}
            onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
            rows={3}
            placeholder="검색 엔진에 표시될 설명"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button type="submit">
          {isEdit ? '수정' : '생성'}
        </Button>
      </div>
    </form>
  );
}
