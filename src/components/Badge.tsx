interface BadgeProps {
  label: string;
  tone?: "neutral" | "accent" | "success" | "warning";
}

const Badge = ({ label, tone = "neutral" }: BadgeProps) => (
  <span className={`badge badge-${tone}`}>{label}</span>
);

export default Badge;
