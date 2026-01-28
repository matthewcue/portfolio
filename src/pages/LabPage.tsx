import { useMemo, useState } from "react";
import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import LabEntryList from "../components/LabEntryList";
import labEntries, { LabCategory } from "../content/labEntries";

const categories: ("all" | LabCategory)[] = [
  "all",
  "networking",
  "security",
  "os",
  "automation",
  "cloud",
  "other"
];

const LabPage = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | LabCategory>("all");

  const filteredEntries = useMemo(() => {
    return labEntries.filter((entry) =>
      activeCategory === "all" ? true : entry.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <PageTransition>
      <Section
        title="Homelab & security experiments"
        description="Short experiments to practice networking, security, and automation."
      >
        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>
        <LabEntryList entries={filteredEntries} />
      </Section>
    </PageTransition>
  );
};

export default LabPage;
