import { useScrollSpy } from '../hooks/useScrollSpy';
import { cn } from '../utils/cn';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TOCProps {
  items: TOCItem[];
  className?: string;
}

export default function TOC({ items, className }: TOCProps) {
  const activeId = useScrollSpy(
    items.map((item) => item.id),
    150
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className={cn('space-y-2', className)}
    >
      <h4 className="text-sm font-semibold mb-4">On this page</h4>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'block py-1 transition-colors border-l-2 pl-3 focus-ring rounded',
                activeId === item.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
