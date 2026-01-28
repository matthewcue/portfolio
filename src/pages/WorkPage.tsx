import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type * as React from "react";
import PageTransition from "../components/PageTransition";
import WorkHero from "../components/work/WorkHero";
import WorkFilterBar from "../components/work/WorkFilterBar";
import WorkHighlightsSection from "../components/work/WorkHighlightsSection";
import WorkGroupedSection from "../components/work/WorkGroupedSection";
import WorkTimelineSection from "../components/work/WorkTimelineSection";
import WorkCtaSection from "../components/work/WorkCtaSection";
import { useTheme } from "../theme/ThemeProvider";
import { workItems, WorkKind, WorkTrack } from "../content/work";

const WorkPage: React.FC = () => {
  const { accentColor, accentColorSoft } = useTheme();
  const [typeFilter, setTypeFilter] = useState<WorkKind | "all">("all");
  const [trackFilter, setTrackFilter] = useState<WorkTrack | "all">("all");
  const [viewMode, setViewMode] = useState<"grouped" | "timeline">("grouped");

  const filteredItems = useMemo(
    () =>
      workItems.filter((item) => {
        if (typeFilter !== "all" && item.kind !== typeFilter) return false;
        if (trackFilter !== "all" && item.track !== trackFilter) return false;
        return true;
      }),
    [typeFilter, trackFilter]
  );

  const filteredItemsSortedByDate = useMemo(
    () =>
      [...filteredItems].sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.localeCompare(a.date);
      }),
    [filteredItems]
  );

  const pageStyles = {
    "--work-accent": accentColor,
    "--work-accent-soft": accentColorSoft
  } as CSSProperties;

  return (
    <PageTransition>
      <main className="work-page" style={pageStyles}>
        <WorkHero />
        <WorkFilterBar
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          trackFilter={trackFilter}
          onTrackFilterChange={setTrackFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <WorkHighlightsSection items={filteredItems} />
        {viewMode === "grouped" ? (
          <WorkGroupedSection items={filteredItems} />
        ) : (
          <WorkTimelineSection items={filteredItemsSortedByDate} />
        )}
        <WorkCtaSection />
      </main>
    </PageTransition>
  );
};

export default WorkPage;
