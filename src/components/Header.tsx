import { Link } from "react-router-dom";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import SearchBox from "./SearchBox";
import { cn } from "../utils/cn";
import Badge from "./Badge";
import overviewData from "../data/overview.json";

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  isSearchOpen: boolean;
  onSearchClose: () => void;
}

export default function Header({
  onMenuClick,
  onSearchClick,
  isSearchOpen,
  onSearchClose,
}: HeaderProps) {
  const { version } = overviewData;
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-30 glass border-b border-border/50"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-accent rounded-lg focus-ring transition-colors"
                aria-label="Open menu"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>

              <Link
                to="/"
                className="flex items-center gap-3 focus-ring rounded-lg"
              >
                {/* Inline SVG Logo */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <rect
                    width="32"
                    height="32"
                    rx="8"
                    className="fill-primary"
                  />
                  <path
                    d="M16 8L22 12V20L16 24L10 20V12L16 8Z"
                    className="fill-primary-foreground"
                    opacity="0.9"
                  />
                  <path
                    d="M16 12L19 14V18L16 20L13 18V14L16 12Z"
                    className="fill-primary-foreground"
                    opacity="0.6"
                  />
                </svg>
                <div className="hidden sm:block">
                  <div className="text-base font-semibold">CrudX Framework</div>
                  <div className="text-xs text-muted-foreground">
                    API Documentation{" "}
                    <Badge variant="info" className="mb-4">
                      {version}
                    </Badge>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <button
                onClick={onSearchClick}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-lg",
                  "border border-border bg-background/50",
                  "hover:bg-accent transition-colors focus-ring",
                  "text-sm text-muted-foreground"
                )}
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span className="flex-1 text-left">
                  Search documentation...
                </span>
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-muted rounded">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onSearchClick}
                className="md:hidden p-2 hover:bg-accent rounded-lg focus-ring transition-colors"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>

              <ThemeToggle />

              <Link
                to="/getting-started"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 focus-ring transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <SearchBox isOpen={isSearchOpen} onClose={onSearchClose} />
    </>
  );
}
