import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import Card from '../components/Card';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'defining-entities', title: 'Defining Entities', level: 2 },
  { id: 'entity-decorators', title: 'Entity Decorators', level: 2 },
  { id: 'relationships', title: 'Relationships', level: 2 },
];

export default function Entities() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: 'Core Concepts', path: '/overview' },
            { label: 'Entities' },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">
            Core Concept
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            Entities
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Define your data models with type-safe entities and powerful ORM
            capabilities.
          </p>
        </div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            Entities are TypeScript classes that represent your data models. They
            map to database tables and provide a type-safe way to work with your
            data throughout your application.
          </p>

          <Alert variant="info" title="ORM Integration">
            Premium Docs integrates seamlessly with popular ORMs like TypeORM and
            Prisma. Choose the one that best fits your needs.
          </Alert>
        </section>

        {/* Defining Entities */}
        <section id="defining-entities" className="prose mb-12">
          <h2>Defining Entities</h2>
          <p>
            Create an entity by defining a class and decorating it with the
            <code>@Entity</code> annotation:
          </p>

          <div className="not-prose">
            <CodeBlock
              code={`import { Entity, Column, PrimaryGeneratedColumn } from 'premium-docs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}`}
              language="typescript"
            />
          </div>

          <p>
            This entity will be mapped to a <code>user</code> table in your
            database with the specified columns.
          </p>
        </section>

        {/* Entity Decorators */}
        <section id="entity-decorators" className="prose mb-12">
          <h2>Entity Decorators</h2>
          <p>
            Premium Docs provides several decorators to define entity properties:
          </p>

          <div className="not-prose grid gap-4 my-6">
            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>@Entity()</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Marks a class as a database entity.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                @Entity(options?: EntityOptions)
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>@Column()</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Defines a regular database column.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                @Column(options?: ColumnOptions)
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>@PrimaryGeneratedColumn()</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Defines an auto-incrementing primary key column.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                @PrimaryGeneratedColumn(strategy?: 'increment' | 'uuid')
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">
                <code>@CreateDateColumn()</code>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Automatically sets the creation timestamp.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                @CreateDateColumn()
              </div>
            </Card>
          </div>

          <Alert variant="success" title="Type Safety">
            All entity properties are fully typed, providing excellent IntelliSense
            and compile-time type checking.
          </Alert>
        </section>

        {/* Relationships */}
        <section id="relationships" className="prose mb-12">
          <h2>Relationships</h2>
          <p>Define relationships between entities using relation decorators:</p>

          <h3>One-to-Many Relationship</h3>
          <div className="not-prose">
            <CodeBlock
              code={`import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'premium-docs';
import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}`}
              language="typescript"
            />
          </div>

          <h3>Many-to-One Relationship</h3>
          <div className="not-prose">
            <CodeBlock
              code={`import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'premium-docs';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;
}`}
              language="typescript"
            />
          </div>

          <h3>Many-to-Many Relationship</h3>
          <div className="not-prose">
            <CodeBlock
              code={`import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'premium-docs';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}`}
              language="typescript"
            />
          </div>

          <Alert variant="info" title="Learn More">
            Check out the{' '}
            <Link to="/rest-endpoints">REST Endpoints guide</Link> to learn how to
            expose your entities through API endpoints.
          </Alert>
        </section>

        <Pagination
          prev={{ title: 'Annotations', path: '/annotations' }}
          next={{ title: 'REST Endpoints', path: '/rest-endpoints' }}
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
