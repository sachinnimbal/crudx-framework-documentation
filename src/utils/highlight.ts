/**
 * Utility for syntax highlighting with lazy loading
 */

export interface HighlightResult {
  tokens: Array<{
    types: string[];
    content: string;
  }>;
  language: string;
}

/**
 * Lazy load the syntax highlighter to reduce initial bundle size
 */
export async function loadHighlighter() {
  const { default: Highlight, Prism } = await import('prism-react-renderer');
  return { Highlight, Prism };
}

/**
 * Get language label for display
 */
export function getLanguageLabel(language: string): string {
  const labels: Record<string, string> = {
    tsx: 'TypeScript',
    ts: 'TypeScript',
    jsx: 'JavaScript',
    js: 'JavaScript',
    json: 'JSON',
    bash: 'Shell',
    sh: 'Shell',
    css: 'CSS',
    html: 'HTML',
    python: 'Python',
    py: 'Python',
    java: 'Java',
    go: 'Go',
    rust: 'Rust',
    sql: 'SQL',
  };
  
  return labels[language] || language.toUpperCase();
}
