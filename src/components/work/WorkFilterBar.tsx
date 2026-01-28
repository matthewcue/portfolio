import Container from "../Container";
import { useCursor } from "../../cursor/CursorContext";
import { WorkKind, WorkTrack } from "../../content/work";

interface WorkFilterBarProps {
  typeFilter: WorkKind | "all";
  onTypeFilterChange: (value: WorkKind | "all") => void;
  trackFilter: WorkTrack | "all";
  onTrackFilterChange: (value: WorkTrack | "all") => void;
  viewMode: "grouped" | "timeline";
  onViewModeChange: (value: "grouped" | "timeline") => void;
}

const typeOptions: { label: string; value: WorkKind | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Projects", value: "project" },
  { label: "Lab", value: "lab" }
];

const trackOptions: { label: string; value: WorkTrack | "all" }[] = [
  { label: "All tracks", value: "all" },
  { label: "Support & Systems", value: "support" },
  { label: "Systems & OS", value: "systems" },
  { label: "Networking", value: "networking" },
  { label: "Automation & Scripts", value: "automation" },
  { label: "Cloud & Security", value: "cloud" },
  { label: "Other", value: "other" }
];

const viewOptions: { label: string; value: "grouped" | "timeline" }[] = [
  { label: "Grouped", value: "grouped" },
  { label: "Timeline", value: "timeline" }
];

const WorkFilterBar = ({
  typeFilter,
  onTypeFilterChange,
  trackFilter,
  onTrackFilterChange,
  viewMode,
  onViewModeChange
}: WorkFilterBarProps) => {
  const { setInteractive } = useCursor();

  return (
    <section className="work-filter-bar" aria-labelledby="work-filter-title">
      <Container>
        <div className="work-filter-bar__inner">
          <h2 id="work-filter-title" className="sr-only">
            Filter applied work
          </h2>

          <div className="work-filter-row">
            <div className="work-filter-segment" role="group" aria-label="Filter by type">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`work-filter-button ${
                    typeFilter === option.value ? "is-active" : ""
                  }`.trim()}
                  onClick={() => onTypeFilterChange(option.value)}
                  onPointerEnter={() => setInteractive(true)}
                  onPointerLeave={() => setInteractive(false)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="work-filter-view" role="group" aria-label="Toggle view">
              <span className="work-filter-view__label">View:</span>
              {viewOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`work-filter-button ${
                    viewMode === option.value ? "is-active" : ""
                  }`.trim()}
                  onClick={() => onViewModeChange(option.value)}
                  onPointerEnter={() => setInteractive(true)}
                  onPointerLeave={() => setInteractive(false)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="work-filter-chips" role="group" aria-label="Filter by track">
            {trackOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`work-filter-chip ${
                  trackFilter === option.value ? "is-active" : ""
                }`.trim()}
                onClick={() => onTrackFilterChange(option.value)}
                onPointerEnter={() => setInteractive(true)}
                onPointerLeave={() => setInteractive(false)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WorkFilterBar;
