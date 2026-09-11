import React from "react";
import type { LucideIcon } from "lucide-react";

interface CmsStatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
  color?: "purple" | "emerald" | "blue" | "amber";
}

export function CmsStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  color = "purple",
}: CmsStatCardProps) {
  const colorMap = {
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`flex size-9 items-center justify-center rounded-xl border ${colorMap[color]}`}
        >
          <Icon className="size-4.5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {trend && <span className="text-xs font-medium text-emerald-600">{trend}</span>}
      </div>
      {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
    </div>
  );
}

interface CmsCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function CmsCard({ title, subtitle, action, children, className = "" }: CmsCardProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs ${className}`}>
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div>
            {title && <h2 className="text-base font-bold text-slate-900">{title}</h2>}
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
