import api from '@/lib/api';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'project' | 'blog' | 'service';
  url: string;
  thumbnail?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  pageSize: number;
}

export const searchService = {
  search: async (query: string, type?: string, page = 1, pageSize = 10): Promise<SearchResponse> => {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (type && type !== 'all') {
      params.append('type', type);
    }

    const response = await api.get<SearchResponse>(`/search?${params.toString()}`);
    return response.data;
  }
}; 