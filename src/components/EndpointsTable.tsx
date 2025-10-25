import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from './Badge';
import CodeBlock from './CodeBlock';
import { copyToClipboard, showToast } from '../utils/clipboard';
import { cn } from '../utils/cn';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  example?: {
    curl: string;
    response: string;
  };
}

interface EndpointsTableProps {
  endpoints: Endpoint[];
  className?: string;
}

const methodColors: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  GET: 'success',
  POST: 'info',
  PUT: 'warning',
  DELETE: 'error',
  PATCH: 'info',
};

export default function EndpointsTable({ endpoints, className }: EndpointsTableProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCurl = async (curl: string, index: number) => {
    const success = await copyToClipboard(curl);
    if (success) {
      setCopiedIndex(index);
      showToast('cURL copied');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className={cn('border border-border rounded-lg overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground w-12"></th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground w-24">
                Method
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Endpoint
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Description
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {endpoints.map((endpoint, index) => (
              <>
                <tr key={index} className="hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3">
                    {endpoint.example && (
                      <button
                        onClick={() =>
                          setExpandedIndex(expandedIndex === index ? null : index)
                        }
                        className="p-1 hover:bg-accent rounded focus-ring"
                        aria-label={expandedIndex === index ? 'Collapse' : 'Expand'}
                      >
                        {expandedIndex === index ? (
                          <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={methodColors[endpoint.method] || 'default'}>
                      {endpoint.method}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-sm font-mono">{endpoint.path}</code>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {endpoint.description}
                  </td>
                  <td className="px-4 py-3">
                    {endpoint.example && (
                      <button
                        onClick={() => handleCopyCurl(endpoint.example!.curl, index)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1"
                      >
                        {copiedIndex === index ? (
                          <>
                            <CheckIcon className="w-3 h-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <ClipboardDocumentIcon className="w-3 h-3" />
                            cURL
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
                <AnimatePresence>
                  {expandedIndex === index && endpoint.example && (
                    <tr>
                      <td colSpan={5} className="p-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-muted/20 space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Request</h4>
                              <CodeBlock
                                code={endpoint.example.curl}
                                language="bash"
                                showLineNumbers={false}
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Response</h4>
                              <CodeBlock
                                code={endpoint.example.response}
                                language="json"
                                showLineNumbers={false}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
