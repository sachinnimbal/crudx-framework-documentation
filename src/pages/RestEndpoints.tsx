import Badge from "../components/Badge";
import EndpointsTable from "../components/EndpointsTable";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";
import TOC from "../components/TOC";
import endpoints from "../data/endpoints.json";

const tocItems = [
  { id: "available-endpoints", title: "Available Endpoints", level: 2 },
];

export default function RestEndpoints() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: "Core Concepts", path: "/overview" },
            { label: "REST Endpoints" },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <Badge variant="info" className="mb-4">
            API Reference
          </Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">
            REST Endpoints
          </h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">
            Build powerful RESTful APIs with our intuitive endpoint system.
          </p>
        </div>

        {/* Available Endpoints */}
        <section id="available-endpoints" className="prose mb-12">
          <h2>Available Endpoints</h2>
          <p>
            Here's a comprehensive list of available API endpoints. Click on any
            endpoint to see example requests and responses:
          </p>

          <div className="not-prose my-6">
            <EndpointsTable endpoints={endpoints} />
          </div>
        </section>

        <Pagination prev={{ title: "Base Entities", path: "/base-entities" }} />
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
