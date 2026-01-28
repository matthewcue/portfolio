import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const Section = ({ title, description, children }: SectionProps) => (
  <section className="section">
    {title && (
      <header className="section-header">
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </header>
    )}
    <div className="section-body">{children}</div>
  </section>
);

export default Section;
