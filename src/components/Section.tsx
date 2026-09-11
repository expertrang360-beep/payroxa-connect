import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "soft" | "navy";
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-5 py-16 sm:py-20",
        tone === "soft" && "bg-muted/60",
        tone === "navy" && "gradient-navy text-navy-foreground",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "default",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "default" | "navy";
  align?: "center" | "left";
}) {
  const navy = tone === "navy";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.18em]",
            navy ? "text-lavender-strong" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-base", navy ? "text-navy-foreground/75" : "text-muted-foreground")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default Section;
