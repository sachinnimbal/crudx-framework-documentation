// import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import EndpointsTable from '../components/EndpointsTable';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import endpoints from '../data/endpoints.json';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'http-methods', title: 'HTTP Methods', level: 2 },
  { id: 'available-endpoints', title: 'Available Endpoints', level: 2 },
  { id: 'authentication', title: 'Authentication', level: 2 },
];

export default function RestEndpoints() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: 'Core Concepts', path: '/overview' },
            { label: 'REST Endpoints' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="info" className="mb-4">
            API Reference
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            REST Endpoints
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Build powerful RESTful APIs with our intuitive endpoint system.
          </p>
        </div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            Premium Docs makes it easy to build RESTful APIs with decorators and
            TypeScript. Define your endpoints using method decorators and let the
            framework handle routing, validation, and serialization.
          </p>

          <Alert variant="success" title="Auto Documentation">
            All endpoints are automatically documented and can be exported to
            OpenAPI/Swagger format.
          </Alert>
        </section>

        {/* HTTP Methods */}
        <section id="http-methods" className="prose mb-12">
          <h2>HTTP Methods</h2>
          <p>
            Premium Docs supports all standard HTTP methods through dedicated
            decorators:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`import { Controller, Get, Post, Put, Delete, Patch } from 'premium-docs';

@Controller('/api/resources')
export class ResourceController {
  @Get()
  findAll() {
    return { data: [] };
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return { data: { id } };
  }

  @Post()
  create(@Body() data: CreateDto) {
    return { success: true, data };
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() data: UpdateDto) {
    return { success: true, data };
  }

  @Patch('/:id')
  partialUpdate(@Param('id') id: string, @Body() data: Partial<UpdateDto>) {
    return { success: true, data };
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return { success: true };
  }
}`}
              language="typescript"
            />
          </div>
        </section>

        {/* Available Endpoints */}
        <section id="available-endpoints" className="prose mb-12">
          <h2>Available Endpoints</h2>
          <p>
            Here's a comprehensive list of available API endpoints. Click on any
            endpoint to see example requests and responses:
          </p>

          <div className="not-prose my-6">
            <EndpointsTable endpoints={endpoints} />
          </div>
        </section>

        {/* Authentication */}
        <section id="authentication" className="prose mb-12">
          <h2>Authentication</h2>
          <p>
            Secure your endpoints with built-in authentication support. Premium Docs
            supports multiple authentication strategies:
          </p>

          <h3>Bearer Token Authentication</h3>
          <div className="not-prose">
            <CodeBlock
              code={`import { Controller, Get, UseGuards } from 'premium-docs';
import { AuthGuard } from '@premium-docs/auth';

@Controller('/api/protected')
@UseGuards(AuthGuard)
export class ProtectedController {
  @Get()
  getProtectedData() {
    return { secret: 'This is protected data' };
  }
}`}
              language="typescript"
            />
          </div>

          <h3>Making Authenticated Requests</h3>
          <div className="not-prose">
            <CodeBlock
              code={`curl -X GET https://api.example.com/api/protected \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"`}
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <Alert variant="warning" title="Security Best Practices">
            Always use HTTPS in production and never commit API keys or tokens to
            version control. Use environment variables for sensitive data.
          </Alert>
        </section>

        <Pagination
          prev={{ title: 'Entities', path: '/entities' }}
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
