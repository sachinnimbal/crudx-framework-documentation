import { motion } from "framer-motion";
import {
  BoltIcon,
  ShieldCheckIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CircleStackIcon,
  ChartBarIcon,
  RectangleStackIcon,
  LockClosedIcon,
  ListBulletIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  GlobeAltIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Alert from "../components/Alert";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";
import TOC from "../components/TOC";
import overviewData from "../data/overview.json";
import CodeBlock from "../components/CodeBlock";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  BoltIcon,
  ShieldCheckIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CircleStackIcon,
  ChartBarIcon,
  RectangleStackIcon,
  LockClosedIcon,
  ListBulletIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  GlobeAltIcon,
  BookOpenIcon,
};

export default function Overview() {
  const {
    breadcrumbs,
    version,
    hero,
    features,
    quickExample,
    nextSteps,
    pagination,
    toc,
  } = overviewData;

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <section id="overview">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Badge variant="info" className="mb-4">
              Current {version}
            </Badge>
            <h1 className="hero-title mb-4">
              {hero.title}{" "}
              <span className="gradient-text">{hero.highlight}</span>
            </h1>
            <p className="hero-subtitle max-w-3xl">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/quick-setup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 focus-ring transition-opacity"
              >
                {hero.buttons.getStarted}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/sachinnimbal/crudx-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent focus-ring transition-colors"
              >
                {hero.buttons.viewOnGithub}
              </a>
            </div>
          </motion.div>
        </section>

        <section id="key-features" className="mb-12">
          <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] font-semibold tracking-tight mb-6">
            {features.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.items.map((item, idx) => {
              const Icon = iconMap[item.icon];
              return (
                <Card key={idx} hover>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="quick-example" className="prose mb-12">
          <h2>{quickExample.title}</h2>
          <p>{quickExample.intro}</p>
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
          <Alert variant={quickExample.alert.variant as "success"} title={quickExample.alert.title} className="my-6">
            {quickExample.alert.text}
          </Alert>
        </section>

        <section id="next-steps" className="prose mb-12">
          <h2>{nextSteps.title}</h2>
          <p>{nextSteps.intro}</p>
          <ul>
            {nextSteps.links.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path}>{link.label}</Link> - {link.desc}
              </li>
            ))}
          </ul>
        </section>

        <Pagination next={pagination.next} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={toc} />
        </div>
      </aside>
    </div>
  );
}