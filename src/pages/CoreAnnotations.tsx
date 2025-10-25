import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import Alert from '../components/Alert';

const tocItems = [
  { id: 'crudx-annotation', title: '@CrudX', level: 2 },
  { id: 'unique-constraints', title: '@CrudXUniqueConstraints', level: 2 },
  { id: 'unique-constraint', title: '@CrudXUniqueConstraint', level: 2 },
  { id: 'immutable', title: '@CrudXImmutable', level: 2 },
];

export default function CoreAnnotations() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Core Concepts', path: '/overview' }, { label: 'Core Annotations' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">Core Concept</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Core Annotations</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Learn the essential annotations for building CrudX applications.</p>
        </div>

        {/* @CrudX */}
        <section id="crudx-annotation" className="prose mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="!mb-0">@CrudX</h2>
            <Badge variant="info">Since v1.0.0</Badge>
          </div>
          <p>Enables CrudX framework functionality in your Spring Boot application.</p>
          
          <Card className="my-6">
            <div className="text-sm">
              <strong>Target:</strong> Application Class
            </div>
          </Card>

          <div className="not-prose">
            <CodeBlock
              code={`@SpringBootApplication
@CrudX
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}`}
              language="java"
            />
          </div>

          <h3>What it does:</h3>
          <ul>
            <li>Automatically scans for CrudX controllers</li>
            <li>Registers service beans for detected entities</li>
            <li>Configures database connections</li>
            <li>Enables auto-repository generation</li>
            <li>Initializes performance monitoring</li>
          </ul>
        </section>

        {/* @CrudXUniqueConstraints */}
        <section id="unique-constraints" className="prose mb-12">
          <h2>@CrudXUniqueConstraints</h2>
          <p>Container annotation for defining multiple unique constraints on an entity.</p>

          <Card className="my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Attribute</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Required</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 pr-4 font-mono">value</td>
                  <td className="py-2 pr-4 font-mono text-xs">@CrudXUniqueConstraint[]</td>
                  <td className="py-2 pr-4">Yes</td>
                  <td className="py-2">Array of unique constraint definitions</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <div className="not-prose">
            <CodeBlock
              code={`@Entity
@CrudXUniqueConstraints({
    @CrudXUniqueConstraint(
        fields = {"email"},
        message = "Email already registered"
    ),
    @CrudXUniqueConstraint(
        fields = {"username"},
        message = "Username already taken"
    ),
    @CrudXUniqueConstraint(
        fields = {"phoneNumber"},
        message = "Phone number already registered"
    )
})
public class User extends CrudXMySQLEntity<Long> {
    private String email;
    private String username;
    private String phoneNumber;
}`}
              language="java"
            />
          </div>

          <h3>What it does:</h3>
          <ul>
            <li>Groups multiple unique constraints on a single entity</li>
            <li>Validates each constraint independently during create/update operations</li>
            <li>Returns specific error messages for each violated constraint</li>
            <li>Prevents duplicate entries across multiple field combinations</li>
            <li>Automatically generates database-level unique indexes</li>
          </ul>
        </section>

        {/* @CrudXUniqueConstraint */}
        <section id="unique-constraint" className="prose mb-12">
          <h2>@CrudXUniqueConstraint</h2>
          <p>Defines a unique constraint on one or more fields.</p>

          <Card className="my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Attribute</th>
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Required</th>
                  <th className="text-left py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 pr-4 font-mono">fields</td>
                  <td className="py-2 pr-4 font-mono text-xs">String[]</td>
                  <td className="py-2 pr-4">Yes</td>
                  <td className="py-2">Field names that must be unique</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 pr-4 font-mono">name</td>
                  <td className="py-2 pr-4 font-mono text-xs">String</td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2">Constraint name (optional)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-2 pr-4 font-mono">message</td>
                  <td className="py-2 pr-4 font-mono text-xs">String</td>
                  <td className="py-2 pr-4">No</td>
                  <td className="py-2">Custom error message</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <div className="not-prose">
            <CodeBlock
              code={`@Entity
@CrudXUniqueConstraint(
    fields = {"email"},
    message = "Email address already exists"
)
public class User extends CrudXMySQLEntity<Long> {
    private String email;
}`}
              language="java"
            />
          </div>

          <h3>What it does:</h3>
          <ul>
            <li>Enforces uniqueness on specified field(s) at application level</li>
            <li>Validates before insert/update operations to prevent duplicates</li>
            <li>Supports single or composite field uniqueness</li>
            <li>Returns custom error message when constraint is violated</li>
            <li>Creates corresponding database unique index automatically</li>
          </ul>
        </section>

        {/* @CrudXImmutable */}
        <section id="immutable" className="prose mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="!mb-0">@CrudXImmutable</h2>
            <Badge variant="success">New in v1.0.1</Badge>
          </div>
          <p>Marks a field as immutable - cannot be updated after entity creation.</p>

          <div className="not-prose">
            <CodeBlock
              code={`@Entity
public class Employee extends CrudXMySQLEntity<Long> {
    @CrudXImmutable(message = "Employee code cannot be changed")
    private String employeeCode;
    
    @CrudXImmutable(message = "Hire date is permanent")
    private LocalDate hireDate;
    
    private String name; // Can be updated
}`}
              language="java"
            />
          </div>

          <Alert variant="info" title="Validation Behavior" className="my-6">
            Automatically enforced on PATCH operations • Throws IllegalArgumentException if update attempted • Works alongside Bean Validation annotations • Zero configuration required
          </Alert>
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