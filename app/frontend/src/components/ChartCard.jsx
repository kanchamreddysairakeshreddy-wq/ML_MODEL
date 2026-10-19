import React from "react";

// Reusable card that wraps any chart with a consistent header + optional stat.
// Constrains canvas height so Chart.js maintainAspectRatio: false does not expand indefinitely.
export default function ChartCard({
  title,
  subtitle,
  stat,
  statLabel,
  children,
  className = "",
  height = "h-72",
}) {
  return (
    <div className={`card flex flex-col min-w-0 ${className}`}>
      <div className="flex items-start justify-between mb-4 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">{subtitle}</p>
          )}
        </div>
        {stat !== undefined && (
          <div className="text-right ml-4 flex-shrink-0">
            <div className="text-2xl font-bold text-white">
              {stat}
              {statLabel || ""}
            </div>
            {typeof statLabel === "string" && (
              <span className="text-xs text-slate-400">{statLabel}</span>
            )}
          </div>
        )}
      </div>
      <div className={`relative w-full ${height} min-h-[220px] max-h-[380px]`}>
        {children}
      </div>
    </div>
  );
}
