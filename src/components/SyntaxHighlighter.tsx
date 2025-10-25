import { useEffect, useState } from 'react';
import { Highlight, Prism } from 'prism-react-renderer';

// Set Prism globally for language imports
(window as any).Prism = Prism;

// Track which languages have been loaded
const loadedLanguages = new Set<string>();

// Function to dynamically load language definitions
async function loadLanguage(language: string) {
  if (loadedLanguages.has(language)) {
    return;
  }

  try {
    switch (language) {
      case 'java':
        // @ts-expect-error - PrismJS components don't have type definitions
        await import('prismjs/components/prism-java');
        break;
      case 'python':
      case 'py':
        // @ts-expect-error - PrismJS components don't have type definitions
        await import('prismjs/components/prism-python');
        break;
      case 'go':
        // @ts-expect-error - PrismJS components don't have type definitions
        await import('prismjs/components/prism-go');
        break;
      case 'rust':
        // @ts-expect-error - PrismJS components don't have type definitions
        await import('prismjs/components/prism-rust');
        break;
      case 'sql':
        // @ts-expect-error - PrismJS components don't have type definitions
        await import('prismjs/components/prism-sql');
        break;
      case 'bash':
      case 'sh':
        // @ts-expect-error - PrismJS components don't have type definitions
        await import('prismjs/components/prism-bash');
        break;
    }
    loadedLanguages.add(language);
  } catch (error) {
    console.warn(`Failed to load language: ${language}`, error);
  }
}

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export default function SyntaxHighlighter({
  code,
  language,
  showLineNumbers = true,
}: SyntaxHighlighterProps) {
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    loadLanguage(language).then(() => setLanguageLoaded(true));
  }, [language]);

  // Clean and format the code properly
  const formattedCode = code
    .split('\n')
    .map(line => line.trimEnd()) // Remove trailing whitespace but keep leading
    .join('\n')
    .trim(); // Remove leading/trailing empty lines

  if (!languageLoaded) {
    return (
      <pre className="p-3 sm:p-4 overflow-x-auto bg-muted/30 m-0 scrollbar-thin">
        <code className="text-xs sm:text-sm font-mono whitespace-pre block">
          {formattedCode}
        </code>
      </pre>
    );
  }

  return (
    <Highlight
      code={formattedCode}
      language={language}
      theme={{
        plain: {
          color: 'var(--foreground)',
          backgroundColor: 'var(--muted)',
        },
        styles: [
          {
            types: ['comment', 'prolog', 'doctype', 'cdata'],
            style: {
              color: 'var(--muted-foreground)',
              fontStyle: 'italic',
            },
          },
          {
            types: ['namespace'],
            style: {
              opacity: 0.7,
            },
          },
          {
            types: ['string', 'attr-value'],
            style: {
              color: 'hsl(142, 76%, 36%)',
            },
          },
          {
            types: ['punctuation', 'operator'],
            style: {
              color: 'var(--foreground)',
            },
          },
          {
            types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
            style: {
              color: 'hsl(221, 87%, 60%)',
            },
          },
          {
            types: ['atrule', 'keyword', 'attr-name', 'selector'],
            style: {
              color: 'hsl(301, 63%, 40%)',
              fontWeight: '500',
            },
          },
          {
            types: ['function', 'deleted', 'tag'],
            style: {
              color: 'hsl(348, 83%, 47%)',
            },
          },
          {
            types: ['function-variable'],
            style: {
              color: 'hsl(221, 87%, 60%)',
            },
          },
          {
            types: ['tag', 'selector', 'keyword'],
            style: {
              color: 'hsl(301, 63%, 40%)',
            },
          },
          {
            types: ['class-name'],
            style: {
              color: 'hsl(41, 99%, 38%)',
              fontWeight: '500',
            },
          },
          {
            types: ['annotation'],
            style: {
              color: 'hsl(142, 76%, 36%)',
            },
          },
        ],
      }}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm m-0 scrollbar-thin font-mono ${className}`}
          style={{
            ...style,
            fontFamily: '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace',
            lineHeight: '1.6',
            tabSize: 4,
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="whitespace-pre min-w-max leading-relaxed">
              {showLineNumbers && (
                <span className="inline-block w-6 sm:w-8 select-none opacity-50 text-right mr-2 sm:mr-4 flex-shrink-0 align-top">
                  {i + 1}
                </span>
              )}
              <span className="inline-block align-top">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}