import { NavLink } from 'react-router-dom';
import { DocumentTextIcon, RocketLaunchIcon, TagIcon, CircleStackIcon, BoltIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', path: '/overview', icon: DocumentTextIcon },
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

export default function Sidebar() {
  return (
    <div className="py-6 px-4 space-y-6 scrollbar-thin">
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
  );
}
