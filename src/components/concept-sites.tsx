import { CONCEPTS } from "@/lib/concepts";
import { UI } from "@/lib/l10n";
import { ConceptCard, ContentSection } from "@/components/page-kit";

// Complete example sites, shown above the single-feature demos on /examples.
export function ConceptSites() {
  return (
    <ContentSection title={UI.conceptTitle} intro={UI.conceptLead}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CONCEPTS.map((c) => (
          <ConceptCard key={c.slug} concept={c} />
        ))}
      </div>
    </ContentSection>
  );
}
