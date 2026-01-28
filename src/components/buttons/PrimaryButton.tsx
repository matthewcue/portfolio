import React from "react";
import { Link } from "react-router-dom";
import { useCursor } from "../../cursor/CursorContext";
import { useTheme } from "../../theme/ThemeProvider";

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type ButtonBaseProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "md" | "lg";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
};

type LinkProps = ButtonBaseProps & {
  to: string;
  href?: never;
};

type AnchorProps = ButtonBaseProps & {
  href: string;
  to?: never;
};

type NativeButtonProps = ButtonBaseProps & {
  to?: undefined;
  href?: undefined;
};

export type PrimaryButtonProps = LinkProps | AnchorProps | NativeButtonProps;

// PrimaryButton renders a "liquid glass" CTA using the accent color tokens.
const PrimaryButton = ({
  children,
  icon,
  size = "md",
  className,
  onClick,
  type = "button",
  ...rest
}: PrimaryButtonProps) => {
  const { setInteractive } = useCursor();
  const { accentColor } = useTheme();

  const background = `linear-gradient(180deg, ${hexToRgba(accentColor, 0.95)}, ${hexToRgba(
    accentColor,
    0.75
  )})`;
  const hoverBackground = `linear-gradient(180deg, ${hexToRgba(accentColor, 1)}, ${hexToRgba(
    accentColor,
    0.85
  )})`;

  const sharedProps = {
    className: ["primary-button", size === "lg" ? "primary-button--lg" : "", className]
      .filter(Boolean)
      .join(" "),
    onPointerEnter: () => setInteractive(true),
    onPointerLeave: () => setInteractive(false),
    onClick,
    style: {
      "--primary-bg": background,
      "--primary-bg-hover": hoverBackground,
      "--primary-border": hexToRgba(accentColor, 0.7),
      "--primary-glow": hexToRgba(accentColor, 0.25),
      "--primary-ring": hexToRgba(accentColor, 0.45)
    } as React.CSSProperties
  };

  const content = (
    <>
      <span className="button-label">{children}</span>
      {icon && <span className="button-icon">{icon}</span>}
    </>
  );

  if ("to" in rest) {
    return (
      <Link to={rest.to} {...sharedProps}>
        {content}
      </Link>
    );
  }

  if ("href" in rest) {
    return (
      <a href={rest.href} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} {...sharedProps}>
      {content}
    </button>
  );
};

export default PrimaryButton;
