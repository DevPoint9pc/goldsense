"use client";

import { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import type { FaqCategory, FaqItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { FaqAccordion } from "./faq-accordion";

interface FaqBrowserProps {
  items: FaqItem[];
  categories: { value: FaqCategory | "all"; label: string }[];
}

export function FaqBrowser({ items, categories }: FaqBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "all">("all");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        (!term || `${item.question} ${item.answer}`.toLowerCase().includes(term)),
    );
  }, [items, query, category]);

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-sm text-sm md:text-base leading-5 text-gs-body">
          Find clear answers about GoldSense™, from how the technology works to testing depth, setup, reports and
          support.
        </p>
        <label className="relative block w-full md:w-2xs">
          <span className="sr-only">Search FAQs by keyword</span>
          <LuSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gs-muted"
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by keyword..."
            className="h-11 w-full rounded-md border border-[#f1ebe5] bg-white pl-10 pr-4 text-xs text-gs-ink outline-none placeholder:text-gs-muted focus-visible:ring-2 focus-visible:ring-gs-gold"
          />
        </label>
      </div>

      <div role="group" aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2 md:mt-9">
        {categories.map((option) => {
          const active = option.value === category;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(option.value)}
              className={cn(
                "h-9 rounded-md px-4 text-xs transition-colors",
                active ? "bg-gs-ink text-white" : "bg-white text-gs-ink hover:bg-gs-sand",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {filtered.length > 0 ? (
          <FaqAccordion key={`${category}-${query}`} items={filtered} className="[&_li]:rounded-xl" />
        ) : (
          <p role="status" className="rounded-lg bg-white px-6 py-6 text-sm md:text-base text-gs-muted">
            No questions match your search.
          </p>
        )}
      </div>
    </>
  );
}
