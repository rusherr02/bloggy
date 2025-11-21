// User types
export interface User {
  id: number;
  username: string;
  createdAt: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Blog types
export interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  authorId: number;
  imageUrl?: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCreateInput {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  imageUrl?: string;
}

export interface BlogUpdateInput extends Partial<BlogCreateInput> {
  id: number;
}

export interface BlogListItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  likes: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

// Comment types
export interface Comment {
  id: number;
  blogId: number;
  content: string;
  authorName: string;
  isAuthor: boolean;
  createdAt: string;
}

export interface CommentCreateInput {
  blogId: number;
  content: string;
  authorName: string;
}

// Like types
export interface Like {
  id: number;
  blogId: number;
  createdAt: string;
}

// Analytics types
export interface BlogAnalytics {
  blogId: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Search types
export interface SearchParams {
  query: string;
  category?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}
