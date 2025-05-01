import api from './api';

export interface TrainingResource {
  _id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  description?: string;
}

export interface TrainingModule {
  _id: string;
  title: string;
  description: string;
  category: 'photography' | 'pricing' | 'packaging' | 'marketing' | 'orders' | 'shipping';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  thumbnail: string;
  contentLanguage: string;
  videoUrl: string;
  resources: TrainingResource[];
  learningPoints: string[];
  featured: boolean;
  progress?: number;
  completed?: boolean;
}

export interface TrainingProgress {
  _id: string;
  user: string;
  module: TrainingModule | string;
  progress: number;
  completed: boolean;
  lastAccessed: Date;
  resourcesDownloaded: {
    resourceId: string;
    downloadedAt: Date;
  }[];
}

// Get all training modules
export const getAllModules = async (language: string = 'english') => {
  const response = await api.get(`/training?contentLanguage=${language}`);
  return response.data;
};

// Get modules by category
export const getModulesByCategory = async (category: string, language: string = 'english') => {
  const response = await api.get(`/training/category/${category}?contentLanguage=${language}`);
  return response.data;
};

// Get featured modules
export const getFeaturedModules = async (language: string = 'english') => {
  const response = await api.get(`/training/featured?contentLanguage=${language}`);
  return response.data;
};

// Get module by ID
export const getModuleById = async (id: string) => {
  const response = await api.get(`/training/${id}`);
  return response.data;
};

// Update progress for a module
export const updateProgress = async (moduleId: string, progress: number, completed: boolean = false) => {
  const response = await api.post(`/training/${moduleId}/progress`, { progress, completed });
  return response.data;
};

// Track resource download
export const trackResourceDownload = async (moduleId: string, resourceId: string) => {
  const response = await api.post(`/training/${moduleId}/resource/${resourceId}`);
  return response.data;
};

// Get user's progress for all modules
export const getUserProgress = async () => {
  const response = await api.get('/training/progress');
  return response.data;
};
