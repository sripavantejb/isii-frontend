import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { articlesAPI } from "@/services/api";
import { buildSearchIndex, searchContent, SearchResult } from "@/services/searchData";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const Search = ({ isOpen, onClose }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load search index on mount
  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        setLoading(true);
        const articles = await articlesAPI.getAll();
        const index = buildSearchIndex(articles);
        setSearchIndex(index);
      } catch (error) {
        console.error("Failed to load search index:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadSearchIndex();
    }
  }, [isOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Perform search when query changes
  useEffect(() => {
    if (query.trim().length > 0 && searchIndex.length > 0) {
      const searchResults = searchContent(query, searchIndex);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, searchIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "Enter" && results.length > 0) {
      handleResultClick(results[0]);
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    if (result.type === "article") {
      // Open article PDF in new tab
      window.open(result.url, "_blank");
    } else {
      // Navigate to page
      navigate(result.url);
    }
    handleClose();
  };

  // Handle close
  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  // Group results by type
  const articles = results.filter((r) => r.type === "article");
  const people = results.filter((r) => r.type === "person");
  const pages = results.filter((r) => r.type === "page");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[60]"
        onClick={handleClose}
        style={{ top: '80px' }}
      />

      {/* Search Bar */}
      <div 
        className="fixed left-0 right-0 z-[70] bg-white border-b border-border shadow-sm animate-in slide-in-from-top duration-200" 
        style={{ top: '80px' }}
      >
        <div className="container-custom section-padding py-4">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={handleClose}
              className="absolute right-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Results Panel */}
          {query.trim().length > 0 && (
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="py-8 text-center text-muted-foreground">
                  Loading...
                </div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No results found
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Articles */}
                  {articles.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                        Articles
                      </h3>
                      <div className="space-y-2">
                        {articles.map((result, index) => (
                          <button
                            key={`article-${index}`}
                            onClick={() => handleResultClick(result)}
                            className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <div className="font-semibold text-foreground">
                              {result.title}
                            </div>
                            {result.metadata?.date && (
                              <div className="text-sm text-muted-foreground mt-1">
                                {result.metadata.date}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* People */}
                  {people.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                        People
                      </h3>
                      <div className="space-y-2">
                        {people.map((result, index) => (
                          <button
                            key={`person-${index}`}
                            onClick={() => handleResultClick(result)}
                            className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <div className="font-semibold text-foreground">
                              {result.title}
                            </div>
                            {result.description && (
                              <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {result.description}
                              </div>
                            )}
                            {result.metadata?.category && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {result.metadata.category}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pages */}
                  {pages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                        Pages
                      </h3>
                      <div className="space-y-2">
                        {pages.map((result, index) => (
                          <button
                            key={`page-${index}`}
                            onClick={() => handleResultClick(result)}
                            className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <div className="font-semibold text-foreground">
                              {result.title}
                            </div>
                            {result.description && (
                              <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {result.description}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

