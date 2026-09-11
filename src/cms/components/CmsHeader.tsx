import React from "react";

interface CmsHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export function CmsHeader({ title, description, badge, actions }: CmsHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          {badge && (
            <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}
