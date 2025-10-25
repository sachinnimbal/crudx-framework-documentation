import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

interface PaginationProps {
  prev?: { title: string; path: string };
  next?: { title: string; path: string };
  className?: string;
}

export default function Pagination({ prev, next, className }: PaginationProps) {
  return (
    <nav
      aria-label="Page navigation"
      className={cn('flex items-center justify-between gap-4 pt-8 border-t border-border', className)}
    >
      {prev ? (
        <Link
          to={prev.path}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all focus-ring group max-w-xs"
        >
          <ChevronLeftIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground mb-1">Previous</div>
            <div className="text-sm font-medium">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          to={next.path}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition-all focus-ring group max-w-xs ml-auto"
        >
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Next</div>
            <div className="text-sm font-medium">{next.title}</div>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
      )}
    </nav>
  );
}
