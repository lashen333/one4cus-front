// src\components\shared\section-heading.tsx
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  title: string;
  className?: string;
};

export function SectionHeading({
  title,
  className,
}: SectionHeadingProps) {
  return (
    <h2 className={cn("text-center text-4xl font-bold tracking-tight text-slate-900", className)}>
      {title}
    </h2>
  );
}