import CodeBlock from '../components/CodeBlock';
import Badge from '../components/Badge';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import Tabs from '../components/Tabs';
import Alert from '../components/Alert';

const tocItems = [
  { id: 'add-dependencies', title: 'Add Dependencies', level: 2 },
  { id: 'enable-crudx', title: 'Enable CrudX', level: 2 },
  { id: 'configure-database', title: 'Configure Database', level: 2 },
  { id: 'create-entity', title: 'Create Your Entity', level: 2 },
  { id: 'create-controller', title: 'Create Controller', level: 2 },
];

export default function QuickSetup() {
  const dependencyTabs = [
    {
      id: 'gradle',
      label: 'Gradle (build.gradle)',
      content: (
        <CodeBlock
          code={`dependencies {
    implementation 'io.github.sachinnimbal:crudx-starter:1.0.1'
    // Choose your database
    runtimeOnly 'com.mysql:mysql-connector-j'
    // OR runtimeOnly 'org.postgresql:postgresql'
    // OR implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
}`}
          language="groovy"
          showLineNumbers={false}
        />
      ),
    },
    {
      id: 'maven',
      label: 'Maven (pom.xml)',
      content: (
        <CodeBlock
          code={`<dependency>
    <groupId>io.github.sachinnimbal</groupId>
    <artifactId>crudx-starter</artifactId>
    <version>1.0.1</version>
</dependency>
<!-- Add database driver -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>`}
          language="xml"
          showLineNumbers={false}
        />
      ),
    },
  ];

  const dbConfigTabs = [
    {
      id: 'mysql',
      label: 'MySQL',
      content: (
        <CodeBlock
          code={`spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect`}
          language="yaml"
          showLineNumbers={false}
        />
      ),
    },
    {
      id: 'postgresql',
      label: 'PostgreSQL',
      content: (
        <CodeBlock
          code={`spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: password
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect`}
          language="yaml"
          showLineNumbers={false}
        />
      ),
    },
    {
      id: 'mongodb',
      label: 'MongoDB',
      content: (
        <CodeBlock
          code={`spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/mydb
      database: mydb`}
          language="yaml"
          showLineNumbers={false}
        />
      ),
    },
  ];

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Getting Started', path: '/overview' }, { label: 'Quick Setup' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="success" className="mb-4">5-Minute Setup</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Quick Setup</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Get started with CrudX in under 5 minutes - 5 steps to your first API</p>
        </div>

        <section id="add-dependencies" className="prose mb-12">
          <h2>1. Add Dependencies</h2>
          <p>Add CrudX to your project using Gradle or Maven:</p>
          <div className="not-prose">
            <Tabs tabs={dependencyTabs} />
          </div>
        </section>

        <section id="enable-crudx" className="prose mb-12">
          <h2>2. Enable CrudX</h2>
          <p>Add <code>@CrudX</code> annotation to your Spring Boot application class:</p>
          <div className="not-prose">
            <CodeBlock
              code={`@SpringBootApplication
@CrudX // 👈 Add this annotation
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}`}
              language="java"
              showLineNumbers={false}
            />
          </div>
          <Alert variant="info" title="What happens behind the scenes">
            Scans for CrudX controllers and entities • Auto-generates repositories and services • Configures database connections • Enables REST endpoint generation
          </Alert>
        </section>

        <section id="configure-database" className="prose mb-12">
          <h2>3. Configure Database</h2>
          <p>Add database configuration to <code>application.yml</code> or <code>application.properties</code>:</p>
          <div className="not-prose">
            <Tabs tabs={dbConfigTabs} />
          </div>
        </section>

        <section id="create-entity" className="prose mb-12">
          <h2>4. Create Your Entity</h2>
          <p>Extend the appropriate CrudX base class for your database:</p>
          <div className="not-prose">
            <CodeBlock
              code={`import io.github.sachinnimbal.crudx.entity.CrudXMySQLEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employees")
@Data
public class Employee extends CrudXMySQLEntity<Long> {
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String department;
    private Double salary;
}`}
              language="java"
              showLineNumbers={false}
            />
          </div>
          <Alert variant="success" title="Choose the right base class">
            <strong>CrudXMySQLEntity&lt;ID&gt;</strong> - For MySQL/MariaDB<br/>
            <strong>CrudXPostgreSQLEntity&lt;ID&gt;</strong> - For PostgreSQL<br/>
            <strong>CrudXMongoEntity&lt;ID&gt;</strong> - For MongoDB
          </Alert>
        </section>

        <section id="create-controller" className="prose mb-12">
          <h2>5. Create Controller</h2>
          <p>Extend CrudXController - that's it! No additional code needed:</p>
          <div className="not-prose">
            <CodeBlock
              code={`import io.github.sachinnimbal.crudx.controller.CrudXController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController extends CrudXController<Employee, Long> {
    // That's it! 11 REST endpoints are auto-generated:
    // POST   /api/employees          - Create single
    // POST   /api/employees/batch    - Create batch
    // GET    /api/employees          - Get all
    // GET    /api/employees/paged    - Get paginated
    // GET    /api/employees/{id}     - Get by ID
    // PATCH  /api/employees/{id}     - Partial update
    // DELETE /api/employees/{id}     - Delete by ID
    // DELETE /api/employees/batch    - Delete batch
    // GET    /api/employees/count    - Count all
    // GET    /api/employees/exists/{id} - Check existence
    
    // Add custom endpoints or lifecycle hooks here (optional)
}`}
              language="java"
              showLineNumbers={false}
            />
          </div>
          <Alert variant="success" title="You're All Set!">
            Your API is now ready! Start your application and test the endpoints:<br/><br/>
            <code>http://localhost:8080/api/employees</code><br/>
            <code>http://localhost:8080/swagger-ui/index.html</code> - Swagger UI
          </Alert>
        </section>

        <Pagination prev={{ title: 'Overview', path: '/overview' }} next={{ title: 'Core Annotations', path: '/core-annotations' }} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}