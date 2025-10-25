import { Suspense, lazy } from 'react';
import { cn } from '../utils/cn';
import { getLanguageLabel } from '../utils/highlight';
import CopyButton from './CopyButton';

// Lazy load the syntax highlighter to reduce initial bundle size
const SyntaxHighlighter = lazy(() => import('./SyntaxHighlighter'));

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
  title?: string;
}

export default function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  className,
  title,
}: CodeBlockProps) {
  return (
    <div className={cn(
      'relative rounded-lg border border-border my-4 w-full',
      'overflow-hidden', // Contain everything within this container
      className
    )}>
      {/* Header - No scroll, truncate content */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-muted/50 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
          {title && (
            <span className="text-xs font-medium truncate">
              {title}
            </span>
          )}
          <span className="text-xs text-muted-foreground label-text whitespace-nowrap flex-shrink-0">
            {getLanguageLabel(language)}
          </span>
        </div>
        <div className="flex-shrink-0">
          <CopyButton text={code} />
        </div>
      </div>

      {/* Code - Independent horizontal scroll, no vertical overflow */}
      <div className="relative w-full overflow-x-auto overflow-y-visible">
        <Suspense
          fallback={
            <pre className="p-3 sm:p-4 overflow-x-auto bg-muted/30 scrollbar-thin m-0">
              <code className="text-xs sm:text-sm font-mono whitespace-pre block">
                {code}
              </code>
            </pre>
          }
        >
          <SyntaxHighlighter
            code={code}
            language={language}
            showLineNumbers={showLineNumbers}
          />
        </Suspense>
      </div>
    </div>
  );
}