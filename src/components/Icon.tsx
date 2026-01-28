import React from "react";

interface IconProps {
  children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  className?: string;
  size?: number;
}

// Icon standardizes Heroicons sizing + aria attributes for consistent usage.
const Icon = ({ children, className, size = 20 }: IconProps) => {
  const mergedClassName = [children.props.className, className].filter(Boolean).join(" ");

  return React.cloneElement(children, {
    className: mergedClassName || undefined,
    "aria-hidden": true,
    focusable: false,
    style: {
      width: size,
      height: size,
      ...children.props.style
    }
  });
};

export default Icon;
