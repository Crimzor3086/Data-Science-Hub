import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchAPI } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category?: string;
  date?: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchAPI.search(searchTerm);
      setResults(response.data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex max-w-2xl">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button type="submit" className="rounded-l-none">
            Search
          </Button>
        </div>
      </form>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : query ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {results.length === 0
              ? `No results found for "${query}"`
              : `Search results for "${query}" (${results.length} results)`}
          </h2>

          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.id} className="border-b border-gray-200 pb-6">
                <Link
                  to={result.url}
                  className="text-xl font-medium text-blue-600 hover:underline"
                >
                  {result.title}
                </Link>
                <p className="mt-2 text-gray-600">{result.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  {result.category && (
                    <span className="mr-4">Category: {result.category}</span>
                  )}
                  {result.date && <span>Date: {result.date}</span>}
                </div>
              </div>
                  ))}
                </div>
              </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Enter a search term to find content
        </div>
      )}
      </div>
  );
};

export default SearchPage; 