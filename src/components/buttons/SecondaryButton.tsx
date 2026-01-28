import React from "react";
import { Link } from "react-router-dom";
import { useCursor } from "../../cursor/CursorContext";
import { useTheme } from "../../theme/ThemeProvider";

type ButtonBaseProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "leading" | "trailing";
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

export type SecondaryButtonProps = LinkProps | AnchorProps | NativeButtonProps;

// SecondaryButton is a link-style CTA with an animated underline.
const SecondaryButton = ({
  children,
  icon,
  iconPosition = "trailing",
  className,
  onClick,
  type = "button",
  ...rest
}: SecondaryButtonProps) => {
  const { setInteractive } = useCursor();
  const { accentColor, accentColorStrong } = useTheme();

  const sharedProps = {
    className: ["secondary-button", className].filter(Boolean).join(" "),
    onPointerEnter: () => setInteractive(true),
    onPointerLeave: () => setInteractive(false),
    onClick,
    style: {
      "--secondary-color": accentColor,
      "--secondary-color-strong": accentColorStrong
    } as React.CSSProperties
  };

  const leadingIcon = icon && iconPosition === "leading";
  const trailingIcon = icon && iconPosition === "trailing";

  const content = (
    <>
      {leadingIcon && <span className="button-icon">{icon}</span>}
      <span className="secondary-button__label">{children}</span>
      {trailingIcon && <span className="button-icon">{icon}</span>}
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

export default SecondaryButton;
