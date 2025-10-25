import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileDrawer from './components/MobileDrawer';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import GettingStarted from './pages/GettingStarted';
import QuickSetup from './pages/QuickSetup';
import Annotations from './pages/Annotations';
import CoreAnnotations from './pages/CoreAnnotations';
import Entities from './pages/Entities';
import BaseEntities from './pages/BaseEntities';
import RestEndpoints from './pages/RestEndpoints';
import { useTheme } from './hooks/useTheme';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Escape to close drawers
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme class is applied in the theme hook now

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        isSearchOpen={isSearchOpen}
        onSearchClose={() => setIsSearchOpen(false)}
      />

      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 fixed left-0 top-16 bottom-0 overflow-y-auto border-r border-border">
          <Sidebar />
        </aside>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileDrawer onClose={() => setIsMobileMenuOpen(false)} />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 xl:ml-72">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/overview" replace />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/quick-setup" element={<QuickSetup />} />
                <Route path="/getting-started" element={<GettingStarted />} />
                <Route path="/core-annotations" element={<CoreAnnotations />} />
                <Route path="/annotations" element={<Annotations />} />
                <Route path="/entities" element={<Entities />} />
                <Route path="/base-entities" element={<BaseEntities />} />
                <Route path="/rest-endpoints" element={<RestEndpoints />} />
              </Routes>
            </motion.div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
