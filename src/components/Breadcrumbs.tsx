import React from 'react';
import {Link} from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({
  items,
  tone = 'on-light',
}: {
  items: BreadcrumbItem[];
  tone?: 'on-light' | 'on-dark';
}) {
  const isDark = tone === 'on-dark';
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs ${isDark ? 'text-[#E8E5D9]/70' : 'text-[#303431]/65'}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={`transition-colors ${
                    isDark ? 'hover:text-[#FFE3A3]' : 'hover:text-[#123F3A]'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? isDark
                        ? 'font-medium text-[#FFE3A3]'
                        : 'font-medium text-[#123F3A]'
                      : ''
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
