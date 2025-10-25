import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
}

// Mock search data - in production, this would come from a search index
const searchData: SearchResult[] = [
  { title: 'Overview', path: '/overview', excerpt: 'Get started with the documentation' },
  { title: 'Getting Started', path: '/getting-started', excerpt: 'Quick start guide and installation' },
  { title: 'Annotations', path: '/annotations', excerpt: 'Learn about annotations and decorators' },
  { title: 'Entities', path: '/entities', excerpt: 'Working with entities and models' },
  { title: 'REST Endpoints', path: '/rest-endpoints', excerpt: 'API endpoints and HTTP methods' },
];

interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBox({ isOpen, onClose }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].path);
      onClose();
      setQuery('');
    }
  };

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* Search Modal */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
      >
        <div className="bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 bg-transparent outline-none text-sm"
              aria-label="Search documentation"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-accent rounded focus-ring"
              aria-label="Close search"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-h-96 overflow-y-auto scrollbar-thin"
              >
                {results.map((result, index) => (
                  <button
                    key={result.path}
                    onClick={() => handleSelect(result.path)}
                    className={cn(
                      'w-full text-left px-4 py-3 hover:bg-accent transition-colors',
                      index === selectedIndex && 'bg-accent'
                    )}
                  >
                    <div className="font-medium text-sm mb-1">{result.title}</div>
                    <div className="text-xs text-muted-foreground">{result.excerpt}</div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results */}
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </div>
          )}

          {/* Help text */}
          {!query && (
            <div className="px-4 py-3 text-xs text-muted-foreground border-t border-border flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded">↓</kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded">↵</kbd>
                <span>to select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded">esc</kbd>
                <span>to close</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
