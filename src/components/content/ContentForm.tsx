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
    excerpt: content?.excerpt || ''
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
      viewCount: content?.viewCount || 0,
      publishedAt: formData.status === 'published' ? new Date().toISOString() : content?.publishedAt
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
          onChange={(e) => setFormData({...formData, type: e.target.value as any})}
          options={[
            { value: 'post', label: '게시글' },
            { value: 'page', label: '페이지' },
            { value: 'news', label: '뉴스' },
            { value: 'product', label: '제품' }
          ]}
        />
        
        <Select
          name="status"
          label="상태"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value as any})}
          options={[
            { value: 'draft', label: '초안' },
            { value: 'published', label: '게시됨' },
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
