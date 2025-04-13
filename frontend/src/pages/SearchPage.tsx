import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Search, Loader2 } from 'lucide-react';
import { searchService, type SearchResult } from '@/services/search';
import { Background } from '@/components/ui/background';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, []);

  const handleSearch = async (newPage = 1) => {
    if (!query.trim()) {
      toast({
        title: 'Search query required',
        description: 'Please enter a search term',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSearchParams({ q: query });
    setPage(newPage);

    try {
      const response = await searchService.search(
        query,
        activeTab === 'all' ? undefined : activeTab,
        newPage
      );
      
      setResults(response.results);
      setTotal(response.total);
    } catch (error) {
      toast({
        title: 'Search failed',
        description: 'An error occurred while searching. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    handleSearch(1);
  };

  const handleLoadMore = () => {
    handleSearch(page + 1);
  };

  return (
    <Background 
      image="/images/image (11).jpg"
      overlayOpacity={0.8}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Search</h1>
          
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Search courses, projects, blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(1)}
              className="flex-1 bg-white/90 backdrop-blur-sm"
            />
            <Button onClick={() => handleSearch(1)} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="ml-2">Search</span>
            </Button>
          </div>

          {results.length > 0 && (
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-4 bg-white/90 backdrop-blur-sm">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="course">Courses</TabsTrigger>
                <TabsTrigger value="project">Projects</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="service">Services</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="space-y-4">
                  {results.map((result) => (
                    <Card key={result.id} className="bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>{result.title}</CardTitle>
                        <CardDescription>{result.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="link" asChild>
                          <a href={result.url}>View details</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {total > results.length && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="bg-white/90 backdrop-blur-sm"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Load More
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/90">No results found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </Background>
  );
};

export default SearchPage; 