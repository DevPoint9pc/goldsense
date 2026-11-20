"use client";

import { useId, useState } from "react";
import { type MediaItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { MediaRow } from "./media-row";

interface MediaTab {
  id: string;
  label: string;
  actionLabel: string;
  items: MediaItem[];
}

export function MediaTabs({ tabs }: { tabs: MediaTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const baseId = useId();

  const focusTab = (index: number) => {
    const tab = tabs[(index + tabs.length) % tabs.length];
    setActiveId(tab.id);
    document.getElementById(`${baseId}-${tab.id}-tab`)?.focus();
  };

  return (
    <>
      <div className="flex justify-center">
        <div role="tablist" aria-label="Media type" className="inline-flex gap-1 rounded-md bg-white p-1">
          {tabs.map((tab, index) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                id={`${baseId}-${tab.id}-tab`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-${tab.id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") focusTab(index + 1);
                  if (event.key === "ArrowLeft") focusTab(index - 1);
                }}
                className={cn(
                  "h-9 rounded-sm px-3 text-sm transition-colors",
                  selected ? "bg-gs-ink text-white" : "text-gs-ink hover:bg-gs-cream",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-${tab.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-${tab.id}-tab`}
          hidden={tab.id !== activeId}
          className="mt-9"
        >
          {tab.items.length ? (
            <ul className="flex flex-col gap-4">
              {tab.items.map((item) => (
                <MediaRow key={item.id} item={item} actionLabel={tab.actionLabel} />
              ))}
            </ul>
          ) : (
            <p className="text-center text-base text-gs-body">Nothing here yet. Check back soon.</p>
          )}
        </div>
      ))}
    </>
  );
}
