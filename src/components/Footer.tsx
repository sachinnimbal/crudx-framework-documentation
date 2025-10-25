import { CommandLineIcon, ArrowTopRightOnSquareIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Premium Docs. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label="GitHub"
              title="GitHub"
            >
              <CommandLineIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label="Twitter"
              title="Twitter/X"
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <BriefcaseIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Privacy Policy
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Terms of Service
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
