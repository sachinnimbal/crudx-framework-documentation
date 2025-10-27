import Breadcrumbs from "../components/Breadcrumbs";
import Badge from "../components/Badge";
import Pagination from "../components/Pagination";
import TOC from "../components/TOC";
import CodeBlock from "../components/CodeBlock";
import Card from "../components/Card";
import Alert from "../components/Alert";
import ScrollSection from "../components/ScrollSection";
import annotationsData from "../data/annotations.json";

export default function Annotations() {
  const { page, tableOfContents, sections, pagination } = annotationsData;

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={page.breadcrumbs} className="mb-6" />

        {sections.map((section, sectionIdx) => (
          <section
            key={section.id}
            id={section.id}          
          >
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
                <Badge
                  variant={section.version.includes("New") ? "success" : "info"}
                >
                  {section.version}
                </Badge>
              </div>

              <p>{section.description}</p>

              {section.target && (
                <Card className="my-6">
                  <div className="text-sm">
                    <strong>Target:</strong> {section.target}
                  </div>
                </Card>
              )}

              {section.attributes && (
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
                      {section.attributes.map((attr, idx) => (
                        <tr
                          key={idx}
                          className={idx > 0 ? "border-t border-border" : ""}
                        >
                          <td className="py-2 pr-4 font-mono">{attr.name}</td>
                          <td className="py-2 pr-4 font-mono text-xs">
                            {attr.type}
                          </td>
                          <td className="py-2 pr-4">
                            {attr.required ? "Yes" : "No"}
                          </td>
                          <td className="py-2">{attr.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

              {section.examples && (
                <div className="space-y-6">
                  {section.examples.map((example, idx) => (
                    <div key={idx}>
                      <h3>{example.title}</h3>
                      <div className="not-prose">
                        <CodeBlock
                          code={example.code}
                          language={example.language}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.enums && (
                <div className="space-y-4 my-6">
                  {section.enums.map((enumDef, idx) => (
                    <Card key={idx}>
                      <h4 className="text-sm font-semibold mb-3">
                        {enumDef.name}
                      </h4>
                      <div className="space-y-2">
                        {enumDef.values.map((value, vIdx) => (
                          <div key={vIdx} className="text-sm">
                            <span className="font-mono font-medium">
                              {value.name}
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              - {value.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {section.features && (
                <div className="prose">
                  <h3>What it does:</h3>
                  <ul>
                    {section.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
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
