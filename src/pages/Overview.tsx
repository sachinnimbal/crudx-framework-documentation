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
import Alert from "../components/Alert";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";
import TOC from "../components/TOC";
import overviewData from "../data/overview.json";
import CodeBlock from "../components/CodeBlock";
import ScrollSection from "../components/ScrollSection";

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

          <ScrollSection delay={0.1}>
            <h1 className="hero-title mb-4">
              {hero.title}{" "}
              <span className="gradient-text">{hero.highlight}</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/quick-setup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 focus-ring transition-opacity"
              >
                {hero.buttons.getStarted}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/sachinnimbal/crudx-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent focus-ring transition-colors"
              >
                {hero.buttons.viewOnGithub}
              </a>
            </div>
          </ScrollSection>
        </section>

        <section id="key-features" className="mb-12">
          <ScrollSection delay={0.2}>
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
          </ScrollSection>
        </section>

        <section id="quick-example" className="prose mb-12">
          <ScrollSection delay={0.3}>
            <h2>{quickExample.title}</h2>
            <p>{quickExample.intro}</p>
            <div className="not-prose">
              <CodeBlock
                code={quickExample.codeSnippet.code}
                language={quickExample.codeSnippet.language}
                showLineNumbers={false}
              />
            </div>
            <Alert
              variant={quickExample.alert.variant as "success"}
              title={quickExample.alert.title}
              className="my-6"
            >
              {quickExample.alert.text}
            </Alert>
          </ScrollSection>
        </section>

        <section id="next-steps" className="prose mb-12">
          <ScrollSection delay={0.4}>
            <h2>{nextSteps.title}</h2>
            <p>{nextSteps.intro}</p>
            <ul>
              {nextSteps.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path}>{link.label}</Link> - {link.desc}
                </li>
              ))}
            </ul>
          </ScrollSection>
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
