import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import CodeBlock from '../components/CodeBlock';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'controllers', title: 'Controllers', level: 2 },
  { id: 'routes', title: 'Routes', level: 2 },
];

export default function CoreAnnotations() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Core Concepts', path: '/overview' }, { label: 'Core Annotations' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">Core Concept</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Core Annotations</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Learn the essential decorators you will use most often.</p>
        </div>

        <section id="overview" className="prose mb-12">
          <h2>Overview</h2>
          <p>Annotations provide a declarative API for routing and data handling.</p>
        </section>

        <section id="controllers" className="prose mb-12">
          <h2>Controllers</h2>
          <div className="not-prose">
            <CodeBlock language="typescript" code={`import { Controller, Get } from 'premium-docs';

@Controller('/api/users')
export class UserController {
  @Get()
  list() {
    return [];
  }
}`} />
          </div>
        </section>

        <section id="routes" className="prose mb-12">
          <h2>Routes</h2>
          <div className="not-prose">
            <CodeBlock language="typescript" code={`import { Post, Body } from 'premium-docs';

@Post()
create(@Body() dto: any) {
  return { ok: true };
}`} />
          </div>
        </section>

        <Pagination prev={{ title: 'Quick Setup', path: '/quick-setup' }} next={{ title: 'Base Entities', path: '/base-entities' }} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
