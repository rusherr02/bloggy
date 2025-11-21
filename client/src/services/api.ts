import axios from 'axios';
import type {
  Blog,
  BlogListItem,
  BlogCreateInput,
  BlogUpdateInput,
  Comment,
  CommentCreateInput,
  UserLogin,
  AuthResponse,
  PaginatedResponse,
  SearchParams
} from 'shared';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: (data: UserLogin) => api.post<AuthResponse>('/auth/login', data),
  register: (data: UserLogin) => api.post<AuthResponse>('/auth/register', data)
};

// Blog API
export const blogApi = {
  getAll: (page: number = 1, limit: number = 10) =>
    api.get<PaginatedResponse<BlogListItem>>('/blogs/public', { params: { page, limit } }),

  getById: (id: number) =>
    api.get<Blog>(`/blogs/public/${id}`),

  search: (params: SearchParams) =>
    api.get<PaginatedResponse<BlogListItem>>('/blogs/search', { params }),

  getCategories: () =>
    api.get<string[]>('/blogs/categories'),

  like: (id: number) =>
    api.post<{ likes: number }>(`/blogs/${id}/like`),

  // Admin endpoints
  getAllAdmin: (page: number = 1, limit: number = 10) =>
    api.get<PaginatedResponse<BlogListItem>>('/blogs/admin', { params: { page, limit } }),

  getByIdAdmin: (id: number) =>
    api.get<Blog>(`/blogs/admin/${id}`),

  create: (data: BlogCreateInput) =>
    api.post<Blog>('/blogs', data),

  update: (id: number, data: BlogUpdateInput) =>
    api.put<Blog>(`/blogs/${id}`, data),

  delete: (id: number) =>
    api.delete(`/blogs/${id}`)
};

// Comment API
export const commentApi = {
  getByBlogId: (blogId: number) =>
    api.get<Comment[]>(`/comments/blog/${blogId}`),

  create: (data: CommentCreateInput) =>
    api.post<Comment>('/comments', data),

  createAsAuthor: (data: CommentCreateInput) =>
    api.post<Comment>('/comments/author', data),

  delete: (id: number) =>
    api.delete(`/comments/${id}`)
};

// Upload API
export const uploadApi = {
  uploadImage: (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('image', file);

    return api.post<{ url: string; filename: string; size: number; mimetype: string }>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      }
    );
  }
};

export default api;
