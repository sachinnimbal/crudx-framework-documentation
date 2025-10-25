import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card p-6',
        hover && 'transition-all hover:shadow-lg hover:border-primary/50',
        className
      )}
    >
      {children}
    </div>
  );
}
