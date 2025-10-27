import Breadcrumbs from "../components/Breadcrumbs";
import Badge from "../components/Badge";
import Pagination from "../components/Pagination";
import TOC from "../components/TOC";
import CodeBlock from "../components/CodeBlock";
import Alert from "../components/Alert";
import ScrollSection from "../components/ScrollSection";
import Tabs from "../components/Tabs";
import quickSetupData from "../data/quick-setup.json";

export default function QuickSetup() {
  const { page, tableOfContents, sections, pagination } = quickSetupData;

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <section id="quick-setup">
          <Breadcrumbs items={page.breadcrumbs} className="mb-6" />
          <ScrollSection delay={0.1}>
            <Badge
              variant={
                page.badge.variant as
                  | "default"
                  | "success"
                  | "warning"
                  | "error"
                  | "info"
              }
              className="mb-4"
            >
              {page.badge.text}
            </Badge>

            <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
              {page.title}
            </h1>
            <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
              {page.description}
            </p>
          </ScrollSection>
        </section>

        {sections.map((section, sectionIdx) => (
          <section key={section.id} id={section.id} className="prose mb-12">
            <ScrollSection delay={0.2 + sectionIdx * 0.1}>
              <h2>{section.title}</h2>
              <p>{section.description}</p>

              {section.tabs && (
                <div className="not-prose">
                  <Tabs
                    tabs={section.tabs.map((tab) => ({
                      id: tab.id,
                      label: tab.label,
                      content: (
                        <CodeBlock
                          code={tab.code}
                          language={tab.language}
                          showLineNumbers={false}
                        />
                      ),
                    }))}
                  />
                </div>
              )}

              {section.example && (
                <div className="not-prose">
                  <CodeBlock
                    code={section.example.code}
                    language={section.example.language}
                    showLineNumbers={false}
                  />
                </div>
              )}

              {section.alert && (
                <Alert
                  variant={
                    section.alert.variant as
                      | "success"
                      | "info"
                      | "warning"
                      | "error"
                  }
                  title={section.alert.title}
                  className="my-6"
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: section.alert.content }}
                  />
                </Alert>
              )}
            </ScrollSection>
          </section>
        ))}

        <Pagination prev={pagination.previous} next={pagination.next} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tableOfContents} />
        </div>
      </aside>
    </div>
  );
}
