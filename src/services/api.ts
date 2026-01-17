// Always use isii.global backend for production
const API_URL = 'https://isii.global/api';

// Log API URL for debugging (remove in production)
if (import.meta.env.DEV) {
  console.log('🌐 API URL:', API_URL);
}

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    console.error('❌ API Error:', {
      endpoint,
      status: response.status,
      error: error,
    });
    throw new Error(error.message || error.error || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

// Articles API
export const articlesAPI = {
  getAll: async () => {
    return apiRequest('/articles');
  },
  getById: async (id: string) => {
    return apiRequest(`/articles/${id}`);
  },
  create: async (data: { title: string; date: string; imageUrl: string; pdfUrl: string }) => {
    return apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: { title: string; date: string; imageUrl: string; pdfUrl: string }) => {
    return apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return apiRequest(`/articles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Upload API
export const uploadAPI = {
  uploadFile: async (file: File, type: 'image' | 'pdf') => {
    const token = getToken();
    
    if (!token) {
      throw new Error('Authentication required. Please log in to upload files.');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Clear invalid token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Your session has expired. Please log in again.');
      }
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  },
  uploadMultiple: async (image?: File, pdf?: File) => {
    const token = getToken();
    
    if (!token) {
      throw new Error('Authentication required. Please log in to upload files.');
    }

    const formData = new FormData();
    
    if (image) formData.append('image', image);
    if (pdf) formData.append('pdf', pdf);

    if (!image && !pdf) {
      throw new Error('Please select at least one file to upload.');
    }

    try {
      const response = await fetch(`${API_URL}/upload/multiple`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type - let browser set it with boundary for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Clear invalid token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          throw new Error('Your session has expired. Please log in again.');
        }
        const error = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(error.message || error.error || 'Upload failed');
      }

      return response.json();
    } catch (error: any) {
      // Handle CORS and network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        if (error.message.includes('CORS') || error.message.includes('Access-Control-Allow-Origin')) {
          throw new Error('CORS error: The server is not allowing requests from this origin. Please check server configuration or try again later.');
        }
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      }
      throw error;
    }
  },
};

