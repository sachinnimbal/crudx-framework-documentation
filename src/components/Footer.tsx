import { CommandLineIcon, ArrowTopRightOnSquareIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CrudX Framework. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sachinnimbal/crudx-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label="GitHub"
              title="GitHub Repository"
            >
              <CommandLineIcon className="w-5 h-5" />
            </a>
            <a
              href="https://sachinnimbal.github.io/crudx-framework/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label="Documentation"
              title="Official Documentation"
            >
              <BookOpenIcon className="w-5 h-5" />
            </a>
            <a
              href="https://mvnrepository.com/artifact/io.github.sachinnimbal/crudx-starter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label="Maven Central"
              title="Maven Central Repository"
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">
          <a href="https://github.com/sachinnimbal/crudx-framework#license" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            MIT License
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="https://github.com/sachinnimbal/crudx-framework/issues" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Report Issues
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="https://github.com/sachinnimbal/crudx-framework/discussions" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Community
          </a>
        </div>
      </div>
    </footer>
  );
}