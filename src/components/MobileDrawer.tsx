import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XMarkIcon, DocumentTextIcon, RocketLaunchIcon, TagIcon, CircleStackIcon, BoltIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', path: '/overview', icon: DocumentTextIcon },
      { title: 'Quick Setup', path: '/quick-setup', icon: RocketLaunchIcon },
      { title: 'Getting Started', path: '/getting-started', icon: RocketLaunchIcon },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Core Annotations', path: '/core-annotations', icon: TagIcon },
      { title: 'Base Entities', path: '/base-entities', icon: CircleStackIcon },
      { title: 'Annotations', path: '/annotations', icon: TagIcon },
      { title: 'Entities', path: '/entities', icon: CircleStackIcon },
      { title: 'REST Endpoints', path: '/rest-endpoints', icon: BoltIcon },
    ],
  },
];

interface MobileDrawerProps {
  onClose: () => void;
}

export default function MobileDrawer({ onClose }: MobileDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-background border-r border-border z-50 lg:hidden overflow-y-auto scrollbar-thin"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg focus-ring transition-colors"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="py-6 px-4 space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="label-text mb-2 px-3">{section.title}</h3>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors focus-ring',
                          isActive
                            ? 'bg-accent text-accent-foreground font-medium border-l-2 border-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                        )
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </motion.aside>
    </>
  );
}
