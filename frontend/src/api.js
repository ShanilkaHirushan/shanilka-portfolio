import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach token to every request if present
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('portfolio_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// ─── Content ──────────────────────────────────────────────────
export const fetchAllContent = () => API.get('/content').then(r => r.data);
export const fetchContent    = key => API.get(`/content/${key}`).then(r => r.data);
export const updateContent   = (key, value) => API.put(`/content/${key}`, { value }).then(r => r.data);

// ─── Contact ──────────────────────────────────────────────────
export const sendContact     = data => API.post('/contact', data).then(r => r.data);
export const fetchMessages   = () => API.get('/contact').then(r => r.data);
export const markRead        = id => API.patch(`/contact/${id}/read`).then(r => r.data);

// ─── Blog ─────────────────────────────────────────────────────
export const fetchPosts      = (params) => API.get('/blog', { params }).then(r => r.data);
export const fetchPost       = slug => API.get(`/blog/${slug}`).then(r => r.data);
export const fetchAdminPosts = () => API.get('/blog/admin/all').then(r => r.data);
export const createPost      = data => API.post('/blog', data).then(r => r.data);
export const updatePost      = (id, data) => API.put(`/blog/${id}`, data).then(r => r.data);
export const deletePost      = id => API.delete(`/blog/${id}`).then(r => r.data);

// ─── Resume ───────────────────────────────────────────────────
export const fetchResumeStats  = () => API.get('/resume/stats').then(r => r.data);
export const uploadResume      = form => API.post('/resume/upload', form, { headers: { 'Content-Type': 'multipart/form-data' }}).then(r => r.data);

// ─── Admin ────────────────────────────────────────────────────
export const adminLogin        = creds => API.post('/admin/login', creds).then(r => r.data);
export const fetchDashboard    = () => API.get('/admin/dashboard').then(r => r.data);
