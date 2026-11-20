'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { LuBookOpen, LuCalendarCheck, LuChevronDown, LuNewspaper } from 'react-icons/lu';
import { resourcesNav } from '@/data/navigation';
import { type NavGroupItem } from '@/types/content';
import { cn } from '@/lib/utils';
import { NavText } from './nav-text';
import { isActive } from './nav-utils';

const resourceIcons: Record<NavGroupItem['icon'], typeof LuBookOpen> = {
  blogs: LuBookOpen,
  events: LuCalendarCheck,
  media: LuNewspaper,
};

export function ResourcesMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const active = resourcesNav.some((item) => isActive(pathname, item.href));

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-1 text-base text-gs-body transition-colors hover:text-gs-ink"
      >
        <NavText active={active}>Resources</NavText>
        <LuChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 transition-transform duration-200',
            open && 'rotate-180',
          )}
          strokeWidth={2}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 w-sm translate-x-[-42%] pt-2"
      >
        <ul className="rounded-2xl border border-[#ececec] bg-white px-4 py-3 shadow-lg shadow-gs-ink/6">
          {resourcesNav.map((item) => {
            const Icon = resourceIcons[item.icon];
            const current = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? 'page' : undefined}
                  className="group flex gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-gs-cream"
                >
                  <Icon
                    aria-hidden="true"
                    className="mt-1 size-6 text-gs-ink"
                    strokeWidth={2}
                  />
                  <span className="flex flex-col gap-2">
                    <span className="text-base leading-5 text-gs-ink">
                      <NavText active={current}>{item.label}</NavText>
                    </span>
                    <span className="text-base leading-5 text-gs-ink">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
