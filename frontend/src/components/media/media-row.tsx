import Image from "next/image";
import { LuArrowRight, LuCalendarDays, LuTimer } from "react-icons/lu";
import { type MediaItem } from "@/types/content";
import { formatDate, formatReadingTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { siteButtonVariants } from "@/components/site/site-button-variants";

export function MediaRow({ item, actionLabel }: { item: MediaItem; actionLabel: string }) {
  const actionClass = cn(
    siteButtonVariants({ variant: "secondary", size: "sm" }),
    "h-9 shrink-0 gap-1 rounded-md px-4 text-xs font-normal",
  );
  const actionContent = (
    <>
      {actionLabel}
      <LuArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
    </>
  );

  return (
    <li className="flex items-center gap-4 rounded-sm border border-[#f1ebe5] bg-white p-1 pr-4 md:gap-4 md:pr-4">
      <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[#f8f4ef] md:size-22">
        <Image
          src={item.logo.src}
          alt={item.logo.alt}
          width={item.logo.width}
          height={item.logo.height}
          className="max-h-[74%] w-auto max-w-4/5 object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base leading-6 font-medium tracking-[-0.01em] md:text-lg">{item.title}</h2>
        <p className="mt-2 flex items-center gap-7 text-xs leading-4 text-gs-body">
          <span className="flex items-center gap-2">
            <LuCalendarDays aria-hidden="true" className="size-4" strokeWidth={2} />
            <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          </span>
          {item.readingTimeMinutes && (
            <span className="flex items-center gap-2">
              <LuTimer aria-hidden="true" className="size-4" strokeWidth={2} />
              {formatReadingTime(item.readingTimeMinutes)}
            </span>
          )}
        </p>
      </div>
      {item.url ? (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={actionClass}>
          {actionContent}
          <span className="sr-only">: {item.title} (opens in a new tab)</span>
        </a>
      ) : (
        <span className={cn(actionClass, "hidden cursor-default md:inline-flex")} title="Link to be added">
          {actionContent}
        </span>
      )}
    </li>
  );
}
