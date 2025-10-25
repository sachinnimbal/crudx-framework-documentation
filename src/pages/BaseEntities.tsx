import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import Alert from '../components/Alert';

const tocItems = [
  { id: 'mysql-entity', title: 'CrudXMySQLEntity', level: 2 },
  { id: 'postgresql-entity', title: 'CrudXPostgreSQLEntity', level: 2 },
  { id: 'mongo-entity', title: 'CrudXMongoEntity', level: 2 },
];

export default function BaseEntities() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Core Concepts', path: '/overview' }, { label: 'Base Entities' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">Core Concept</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Base Entity Classes</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Choose the right base class for your database to get started quickly.</p>
        </div>

        {/* CrudXMySQLEntity */}
        <section id="mysql-entity" className="prose mb-12">
          <h2>CrudXMySQLEntity&lt;ID&gt;</h2>
          <p>Base class for MySQL entities with auto-increment ID generation.</p>

          <Card className="my-6">
            <div className="text-sm space-y-2">
              <div><strong>ID Strategy:</strong> GenerationType.IDENTITY</div>
              <div><strong>Use For:</strong> MySQL, MariaDB</div>
            </div>
          </Card>

          <div className="not-prose">
            <CodeBlock
              code={`@Entity
@Table(name = "employees")
public class Employee extends CrudXMySQLEntity<Long> {
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String department;
    private BigDecimal salary;
}`}
              language="java"
            />
          </div>

          <Alert variant="info" title="What's Included">
            The base class automatically provides: <code>id</code> (primary key), <code>createdAt</code>, <code>updatedAt</code>, <code>createdBy</code>, <code>updatedBy</code> fields with proper JPA annotations.
          </Alert>
        </section>

        {/* CrudXPostgreSQLEntity */}
        <section id="postgresql-entity" className="prose mb-12">
          <h2>CrudXPostgreSQLEntity&lt;ID&gt;</h2>
          <p>Base class for PostgreSQL entities with sequence-based ID generation.</p>

          <Card className="my-6">
            <div className="text-sm space-y-2">
              <div><strong>ID Strategy:</strong> GenerationType.SEQUENCE</div>
              <div><strong>Use For:</strong> PostgreSQL</div>
            </div>
          </Card>

          <div className="not-prose">
            <CodeBlock
              code={`@Entity
@Table(name = "products")
public class Product extends CrudXPostgreSQLEntity<Long> {
    private String name;
    private String sku;
    private BigDecimal price;
    private Integer stock;
}`}
              language="java"
            />
          </div>

          <Alert variant="success" title="Performance Optimized">
            PostgreSQL sequences provide better performance for concurrent inserts compared to auto-increment, especially in high-throughput scenarios.
          </Alert>
        </section>

        {/* CrudXMongoEntity */}
        <section id="mongo-entity" className="prose mb-12">
          <h2>CrudXMongoEntity&lt;ID&gt;</h2>
          <p>Base class for MongoDB documents with flexible schema.</p>

          <Card className="my-6">
            <div className="text-sm space-y-2">
              <div><strong>ID Type:</strong> String (ObjectId)</div>
              <div><strong>Use For:</strong> MongoDB</div>
              <div><strong>Schema:</strong> Flexible/Dynamic</div>
            </div>
          </Card>

          <div className="not-prose">
            <CodeBlock
              code={`@Document(collection = "users")
public class User extends CrudXMongoEntity<String> {
    private String username;
    private String email;
    private List<String> roles;
    private Map<String, Object> metadata;
}`}
              language="java"
            />
          </div>

          <Alert variant="info" title="NoSQL Flexibility">
            MongoDB entities support dynamic fields and nested documents. You can store complex data structures without rigid schema constraints.
          </Alert>

          <h3>Common Fields (All Base Classes)</h3>
          <p>All base entity classes provide these fields automatically:</p>
          
          <Card className="my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Field</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 pr-4 font-mono">id</td>
                  <td className="py-2 pr-4 font-mono text-xs">ID (generic)</td>
                  <td className="py-2">Primary key</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 pr-4 font-mono">createdAt</td>
                  <td className="py-2 pr-4 font-mono text-xs">LocalDateTime</td>
                  <td className="py-2">Timestamp when entity was created</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 pr-4 font-mono">updatedAt</td>
                  <td className="py-2 pr-4 font-mono text-xs">LocalDateTime</td>
                  <td className="py-2">Timestamp when entity was last updated</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 pr-4 font-mono">createdBy</td>
                  <td className="py-2 pr-4 font-mono text-xs">String</td>
                  <td className="py-2">User who created the entity</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 pr-4 font-mono">updatedBy</td>
                  <td className="py-2 pr-4 font-mono text-xs">String</td>
                  <td className="py-2">User who last updated the entity</td>
                </tr>
              </tbody>
            </table>
          </Card>
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