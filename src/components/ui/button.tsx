// src\components\ui\button.tsx
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

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

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1677c8] text-white hover:bg-[#1267ad] border border-[#1677c8]",
  secondary:
    "bg-white text-[#1677c8] hover:bg-blue-50 border border-[#1677c8]",
  outline:
    "bg-white text-slate-700 hover:bg-slate-50 border border-slate-300",
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    ...rest
  } = props;

  const classes = cn(
    "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition",
    styles[variant],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
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