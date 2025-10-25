import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import CodeBlock from '../components/CodeBlock';

const tocItems = [
  { id: 'what-are-entities', title: 'What are Entities?', level: 2 },
  { id: 'fields', title: 'Fields', level: 2 },
  { id: 'relationships', title: 'Relationships', level: 2 },
];

export default function BaseEntities() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Core Concepts', path: '/overview' }, { label: 'Base Entities' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">Core Concept</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Base Entities</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Define your domain models with concise, type-safe entities.</p>
        </div>

        <section id="what-are-entities" className="prose mb-12">
          <h2>What are Entities?</h2>
          <p>Entities are your core data structures mapped to the database.</p>
        </section>

        <section id="fields" className="prose mb-12">
          <h2>Fields</h2>
          <div className="not-prose">
            <CodeBlock language="typescript" code={`@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}`} />
          </div>
        </section>

        <section id="relationships" className="prose mb-12">
          <h2>Relationships</h2>
          <div className="not-prose">
            <CodeBlock language="typescript" code={`@OneToMany(() => Post, post => post.author)
posts: Post[];`} />
          </div>
        </section>

        <Pagination prev={{ title: 'Core Annotations', path: '/core-annotations' }} next={{ title: 'REST Endpoints', path: '/rest-endpoints' }} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
