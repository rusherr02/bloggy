import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Alert,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
  IconButton,
  Card,
  CardMedia,
  CardActions
} from '@mui/material';
import { Save, Publish, CloudUpload, Delete } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogApi, uploadApi } from '../services/api';
import type { Blog, BlogCreateInput, BlogUpdateInput } from 'shared';

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id && id !== 'new';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchingBlog, setFetchingBlog] = useState(isEditMode);

  const categories = ['Technology', 'Programming', 'Web Development', 'Design', 'Business', 'Lifestyle', 'Other'];
  const availableTags = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Tutorial', 'Guide', 'News'];

  useEffect(() => {
    if (isEditMode) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setFetchingBlog(true);
      const response = await blogApi.getByIdAdmin(parseInt(id!));
      const blog = response.data;

      setTitle(blog.title);
      setContent(blog.content);
      setExcerpt(blog.excerpt);
      setCategory(blog.category);
      setTags(blog.tags);
      setStatus(blog.status);
      setImageUrl(blog.imageUrl || '');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch blog');
    } finally {
      setFetchingBlog(false);
    }
  };

  const handleSubmit = async (publishNow: boolean = false) => {
    setError(null);
    setLoading(true);

    const blogStatus = publishNow ? 'published' : status;

    try {
      if (isEditMode) {
        const updateData: BlogUpdateInput = {
          id: parseInt(id!),
          title,
          content,
          excerpt,
          category,
          tags,
          status: blogStatus,
          imageUrl: imageUrl || undefined
        };
        await blogApi.update(parseInt(id!), updateData);
      } else {
        const createData: BlogCreateInput = {
          title,
          content,
          excerpt,
          category,
          tags,
          status: blogStatus,
          imageUrl: imageUrl || undefined
        };
        await blogApi.create(createData);
      }

      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, GIF, and WebP images are allowed');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const response = await uploadApi.uploadImage(file, setUploadProgress);
      setImageUrl(response.data.url);
      setUploadProgress(0);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload image');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setUploadProgress(0);
  };

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ]
  }), []);

  if (fetchingBlog) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            multiline
            rows={2}
            required
            helperText="A short summary that appears in the blog list"
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Featured Image (Optional)
            </Typography>
            {imageUrl ? (
              <Card sx={{ maxWidth: 400, mb: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imageUrl.startsWith('http') ? imageUrl : `http://localhost:3001${imageUrl}`}
                  alt="Blog featured image"
                />
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Box>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageUpload}
                  />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Max 5MB. Allowed: JPG, PNG, GIF, WebP
                </Typography>
              </Box>
            )}
            {uploading && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                  Uploading... {uploadProgress}%
                </Typography>
              </Box>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Content
            </Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              style={{ height: '400px', marginBottom: '50px' }}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={tags}
              onChange={(e) => setTags(e.target.value as string[])}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {availableTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Status
            </Typography>
            <ToggleButtonGroup
              value={status}
              exclusive
              onChange={(e, value) => value && setStatus(value)}
              aria-label="blog status"
            >
              <ToggleButton value="draft" aria-label="draft">
                Draft
              </ToggleButton>
              <ToggleButton value="published" aria-label="published">
                Published
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={() => handleSubmit(false)}
              disabled={loading || !title || !content || !excerpt || !category}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
            {status === 'draft' && (
              <Button
                variant="contained"
                color="success"
                startIcon={<Publish />}
                onClick={() => handleSubmit(true)}
                disabled={loading || !title || !content || !excerpt || !category}
              >
                {loading ? 'Publishing...' : 'Publish Now'}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
