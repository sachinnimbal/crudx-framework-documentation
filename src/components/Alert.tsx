import { cn } from '../utils/cn';
import { InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
}

export default function Alert({ children, variant = 'info', title, className }: AlertProps) {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-300',
      Icon: InformationCircleIcon,
    },
    success: {
      container: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      title: 'text-green-900 dark:text-green-300',
      Icon: CheckCircleIcon,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      title: 'text-yellow-900 dark:text-yellow-300',
      Icon: ExclamationTriangleIcon,
    },
    error: {
      container: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-900 dark:text-red-300',
      Icon: XCircleIcon,
    },
  };

  const config = variants[variant];
  const Icon = config.Icon;

  return (
    <div
      role="alert"
      className={cn(
        'rounded-lg border p-4 flex gap-3',
        config.container,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.icon)} />
      <div className="flex-1">
        {title && (
          <h5 className={cn('font-semibold mb-1', config.title)}>{title}</h5>
        )}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
