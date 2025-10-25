// import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import Accordion from '../components/Accordion';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'what-are-annotations', title: 'What are Annotations?', level: 2 },
  { id: 'controller-annotations', title: 'Controller Annotations', level: 2 },
  { id: 'route-annotations', title: 'Route Annotations', level: 2 },
  { id: 'parameter-annotations', title: 'Parameter Annotations', level: 2 },
];

const accordionItems = [
  {
    id: 'controller',
    title: '@Controller',
    content: (
      <div className="space-y-2">
        <p>
          Marks a class as a controller and defines the base route path for all
          endpoints in the controller.
        </p>
        <code className="text-xs">@Controller(path: string)</code>
      </div>
    ),
  },
  {
    id: 'get',
    title: '@Get',
    content: (
      <div className="space-y-2">
        <p>Defines a GET endpoint. Optionally takes a route path parameter.</p>
        <code className="text-xs">@Get(path?: string)</code>
      </div>
    ),
  },
  {
    id: 'post',
    title: '@Post',
    content: (
      <div className="space-y-2">
        <p>Defines a POST endpoint. Optionally takes a route path parameter.</p>
        <code className="text-xs">@Post(path?: string)</code>
      </div>
    ),
  },
  {
    id: 'body',
    title: '@Body',
    content: (
      <div className="space-y-2">
        <p>
          Injects the request body into a method parameter. Automatically parses JSON.
        </p>
        <code className="text-xs">@Body()</code>
      </div>
    ),
  },
];

export default function Annotations() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: 'Core Concepts', path: '/overview' },
            { label: 'Annotations' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">
            Core Concept
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            Annotations
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Learn how to use decorators to define controllers, routes, and
            parameters in your application.
          </p>
        </div>

        {/* What are Annotations */}
        <section id="what-are-annotations" className="prose mb-12">
          <h2>What are Annotations?</h2>
          <p>
            Annotations (also known as decorators) are a TypeScript feature that
            allows you to add metadata to classes, methods, and parameters. Premium
            Docs uses annotations to define routes, controllers, and request
            handling logic in a clean and declarative way.
          </p>

          <Alert variant="info" title="TypeScript Configuration">
            To use decorators, you must enable{' '}
            <code>experimentalDecorators</code> and{' '}
            <code>emitDecoratorMetadata</code> in your <code>tsconfig.json</code>.
          </Alert>
        </section>

        {/* Controller Annotations */}
        <section id="controller-annotations" className="prose mb-12">
          <h2>Controller Annotations</h2>
          <p>
            The <code>@Controller</code> annotation marks a class as a request
            handler and defines the base path for all routes within that controller.
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`import { Controller, Get } from 'premium-docs';

@Controller('/api/products')
export class ProductController {
  @Get()
  getAllProducts() {
    return { products: [] };
  }

  @Get('/:id')
  getProductById() {
    return { product: {} };
  }
}`}
              language="typescript"
            />
          </div>

          <p>
            In this example, the controller defines two endpoints:
          </p>
          <ul>
            <li>
              <code>GET /api/products</code> - Returns all products
            </li>
            <li>
              <code>GET /api/products/:id</code> - Returns a specific product
            </li>
          </ul>
        </section>

        {/* Route Annotations */}
        <section id="route-annotations" className="prose mb-12">
          <h2>Route Annotations</h2>
          <p>
            Route annotations define HTTP method handlers within your controllers.
            Premium Docs supports all standard HTTP methods:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`import { Controller, Get, Post, Put, Delete } from 'premium-docs';

@Controller('/api/users')
export class UserController {
  @Get()
  getAll() {
    return { users: [] };
  }

  @Post()
  create() {
    return { success: true };
  }

  @Put('/:id')
  update() {
    return { success: true };
  }

  @Delete('/:id')
  remove() {
    return { success: true };
  }
}`}
              language="typescript"
            />
          </div>

          <Alert variant="success" title="Path Parameters">
            Use colon notation (<code>:paramName</code>) to define dynamic route
            parameters that can be accessed in your handler methods.
          </Alert>
        </section>

        {/* Parameter Annotations */}
        <section id="parameter-annotations" className="prose mb-12">
          <h2>Parameter Annotations</h2>
          <p>
            Parameter annotations inject request data into your handler method
            parameters:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`import { Controller, Post, Get, Body, Param, Query } from 'premium-docs';

@Controller('/api/posts')
export class PostController {
  @Post()
  createPost(@Body() postData: CreatePostDto) {
    return { success: true, data: postData };
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    return { post: { id } };
  }

  @Get()
  searchPosts(@Query('q') query: string) {
    return { results: [], query };
  }
}`}
              language="typescript"
            />
          </div>

          <h3>Available Parameter Decorators</h3>
          <div className="not-prose my-6">
            <Accordion items={accordionItems} />
          </div>
        </section>

        <Pagination
          prev={{ title: 'Getting Started', path: '/getting-started' }}
          next={{ title: 'Entities', path: '/entities' }}
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
