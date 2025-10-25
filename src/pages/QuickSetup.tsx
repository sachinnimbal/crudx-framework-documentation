import CodeBlock from '../components/CodeBlock';
import Badge from '../components/Badge';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'install', title: 'Install', level: 2 },
  { id: 'scaffold', title: 'Scaffold', level: 2 },
  { id: 'run', title: 'Run', level: 2 },
];

export default function QuickSetup() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Getting Started', path: '/overview' }, { label: 'Quick Setup' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="success" className="mb-4">5‑Minute Setup</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Quick Setup</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Install, scaffold, and run your first app in minutes.</p>
        </div>

        <section id="install" className="prose mb-12">
          <h2>Install</h2>
          <p>Install the CLI globally:</p>
          <div className="not-prose">
            <CodeBlock code="npm i -g premium-docs" language="bash" showLineNumbers={false} />
          </div>
        </section>

        <section id="scaffold" className="prose mb-12">
          <h2>Scaffold</h2>
          <p>Create a new project:</p>
          <div className="not-prose">
            <CodeBlock code="premium-docs create my-app" language="bash" showLineNumbers={false} />
          </div>
        </section>

        <section id="run" className="prose mb-12">
          <h2>Run</h2>
          <p>Start the dev server:</p>
          <div className="not-prose">
            <CodeBlock code="npm run dev" language="bash" showLineNumbers={false} />
          </div>
        </section>

        <Pagination prev={{ title: 'Overview', path: '/overview' }} next={{ title: 'Getting Started', path: '/getting-started' }} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
