import Breadcrumbs from "../components/Breadcrumbs";
import Badge from "../components/Badge";
import Pagination from "../components/Pagination";
import TOC from "../components/TOC";
import CodeBlock from "../components/CodeBlock";
import Card from "../components/Card";
import Alert from "../components/Alert";
import ScrollSection from "../components/ScrollSection";
import baseEntitiesData from "../data/base-entities.json";

export default function BaseEntities() {
  const { page, tableOfContents, sections, pagination } = baseEntitiesData;

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={page.breadcrumbs} className="mb-6" />

        {sections.map((section, sectionIdx) => (
          <section key={section.id} id={section.id}>
            <ScrollSection delay={0.1 + sectionIdx * 0.1}>
              {sectionIdx === 0 && (
                <div className="mb-8">
                  <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
                    {page.title}
                  </h1>
                  <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
                    {page.description}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <h2 className="!mb-0">{section.title}</h2>
                <Badge variant="info">{section.version}</Badge>
              </div>

              <p>{section.description}</p>

              {section.target && (
                <Card className="my-6">
                  <div className="text-sm">
                    <strong>Target:</strong> {section.target}
                  </div>
                </Card>
              )}

              {section.metadata && (
                <Card className="my-6">
                  <div className="text-sm space-y-2">
                    {Object.entries(section.metadata).map(([key, value]) => (
                      <div key={key}>
                        <strong>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          :
                        </strong>{" "}
                        {value}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {section.example && (
                <div className="not-prose">
                  <CodeBlock
                    code={section.example.code}
                    language={section.example.language}
                  />
                </div>
              )}

              {section.alert && (
                <Alert
                  variant={section.alert.variant as "info"}
                  title={section.alert.title}
                  className="my-6"
                >
                  {section.alert.content}
                </Alert>
              )}

              {section.commonFields && (
                <>
                  <h3>{section.commonFields.title}</h3>
                  <p>{section.commonFields.description}</p>

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
                        {section.commonFields.fields.map((field, idx) => (
                          <tr
                            key={idx}
                            className={idx > 0 ? "border-t border-border" : ""}
                          >
                            <td className="py-2 pr-4 font-mono">
                              {field.name}
                            </td>
                            <td className="py-2 pr-4 font-mono text-xs">
                              {field.type}
                            </td>
                            <td className="py-2">{field.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </>
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
