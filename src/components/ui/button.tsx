// src\components\ui\button.tsx

import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const styles: Record<ButtonVariant, string> = {
  primary: "bg-[#1677c8] text-white hover:bg-[#1267ad] border border-[#1677c8]",
  secondary: "bg-white text-[#1677c8] hover:bg-blue-50 border border-[#1677c8]",
  outline: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-300",
};

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary", ...rest } = props;

  const classes = cn(
    "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition",
    styles[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = rest as Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "href"
    > & {
      href: string;
    };

    return (
      <Link href={props.href} {...linkProps} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
}
