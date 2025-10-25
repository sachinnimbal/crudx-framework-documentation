import { Link } from 'react-router-dom';
import { CommandLineIcon, ArchiveBoxArrowDownIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import CodeBlock from '../components/CodeBlock';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'prerequisites', title: 'Prerequisites', level: 2 },
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'project-setup', title: 'Project Setup', level: 2 },
  { id: 'running', title: 'Running Your App', level: 2 },
];

export default function GettingStarted() {
  const installTabs = [
    {
      id: 'npm',
      label: 'npm',
      content: (
        <CodeBlock
          code="npm install premium-docs"
          language="bash"
          showLineNumbers={true}
        />
      ),
    },
    {
      id: 'yarn',
      label: 'yarn',
      content: (
        <CodeBlock
          code="yarn add premium-docs"
          language="bash"
          showLineNumbers={false}
        />
      ),
    },
    {
      id: 'pnpm',
      label: 'pnpm',
      content: (
        <CodeBlock
          code="pnpm add premium-docs"
          language="bash"
          showLineNumbers={false}
        />
      ),
    },
  ];

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: 'Getting Started' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="success" className="mb-4">
            Quick Start
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            Getting Started
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Follow this guide to install and set up Premium Docs in your project.
          </p>
        </div>

        {/* Prerequisites */}
        <section id="prerequisites" className="prose mb-12">
          <h2>Prerequisites</h2>
          <p>Before you begin, make sure you have the following installed:</p>
          
          <div className="not-prose grid sm:grid-cols-3 gap-4 my-6">
            <Card>
              <div className="flex items-center gap-3 mb-2">
                <CommandLineIcon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Node.js</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Version 18.0 or higher
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <ArchiveBoxArrowDownIcon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Package Manager</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                npm, yarn, or pnpm
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <PlayCircleIcon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">TypeScript</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Version 5.0 or higher
              </p>
            </Card>
          </div>

          <Alert variant="info" title="Note">
            We recommend using the latest LTS version of Node.js for the best
            experience and compatibility.
          </Alert>
        </section>

        {/* Installation */}
        <section id="installation" className="prose mb-12">
          <h2>Installation</h2>
          <p>
            Install Premium Docs using your preferred package manager:
          </p>
          
          <div className="not-prose">
            <Tabs tabs={installTabs} />
          </div>
        </section>

        {/* Project Setup */}
        <section id="project-setup" className="prose mb-12">
          <h2>Project Setup</h2>
          <p>
            Create a new project or add Premium Docs to an existing one. Here's a
            basic setup:
          </p>

          <h3>1. Create your main application file</h3>
          <div className="not-prose">
            <CodeBlock
              code={`// src/index.ts
import { createApp } from 'premium-docs';
import { UserController } from './controllers/user.controller';

const app = createApp({
  port: 3000,
  cors: true,
  controllers: [UserController],
});

app.listen(() => {
  console.log('Server is running on http://localhost:3000');
});`}
              language="typescript"
              title="src/index.ts"
            />
          </div>

          <h3>2. Create your first controller</h3>
          <div className="not-prose">
            <CodeBlock
              code={`// src/controllers/user.controller.ts
import { Controller, Get, Post, Body } from 'premium-docs';

@Controller('/api/users')
export class UserController {
  @Get()
  async getAllUsers() {
    return { users: [] };
  }

  @Post()
  async createUser(@Body() userData: any) {
    return { success: true, user: userData };
  }
}`}
              language="typescript"
              title="src/controllers/user.controller.ts"
            />
          </div>

          <Alert variant="success" title="TypeScript Configuration">
            Make sure to enable <code>experimentalDecorators</code> and{' '}
            <code>emitDecoratorMetadata</code> in your{' '}
            <code>tsconfig.json</code>.
          </Alert>
        </section>

        {/* Running */}
        <section id="running" className="prose mb-12">
          <h2>Running Your Application</h2>
          <p>Start your application with:</p>
          
          <div className="not-prose">
            <CodeBlock
              code="npm run dev"
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <p>
            Your application should now be running at{' '}
            <code>http://localhost:3000</code>. Try accessing your first endpoint:
          </p>

          <div className="not-prose">
            <CodeBlock
              code="curl http://localhost:3000/api/users"
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <Alert variant="info" title="What's Next?">
            Now that you have a basic setup, explore our guides on{' '}
            <Link to="/annotations">Annotations</Link>,{' '}
            <Link to="/entities">Entities</Link>, and{' '}
            <Link to="/rest-endpoints">REST Endpoints</Link> to build more advanced
            features.
          </Alert>
        </section>

        <Pagination
          prev={{ title: 'Overview', path: '/overview' }}
          next={{ title: 'Annotations', path: '/annotations' }}
        />
      </div>

      {/* Right Sidebar - TOC */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
