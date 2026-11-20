'use client';

import { LuCalendarDays, LuChevronDown, LuMapPin } from 'react-icons/lu';
import { type GoldSenseEvent } from '@/types/content';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { VideoCard } from './video-card';
import { VideoCountBadge } from './video-count-badge';

export function EventRow({ event }: { event: GoldSenseEvent }) {
  return (
    <AccordionItem value={event.id} asChild>
      <li className="border-b border-gs-line-strong/70 py-6 first:pt-0 last:border-b-0">
        <AccordionTrigger
          className="justify-start gap-4 rounded-none py-0 font-sans text-base font-normal tracking-normal md:gap-5"
          icon={
            <LuChevronDown
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-gs-ink transition-transform duration-200"
              strokeWidth={2}
            />
          }
        >
          <VideoCountBadge
            count={event.videos.length}
            isLatest={event.isLatest}
          />
          <span
            aria-hidden="true"
            className="w-px self-stretch bg-gs-line-strong/70"
          />
          <span className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
            <span className="font-serif text-lg leading-7 font-medium tracking-[-0.015em] text-gs-ink md:text-2xl">
              {event.name}
            </span>
            <span className="flex items-center gap-2 text-xs md:text-sm leading-4 text-gs-body">
              <LuMapPin aria-hidden="true" className="size-4" strokeWidth={2} />
              {event.venue}
            </span>
            <span className="flex items-center gap-2 text-xs md:text-sm leading-4 text-gs-body">
              <LuCalendarDays
                aria-hidden="true"
                className="size-4"
                strokeWidth={2}
              />
              {event.dateLabel}
            </span>
          </span>
        </AccordionTrigger>

        <AccordionContent className="pb-0 text-base">
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6">
            {event.videos.map((video) => (
              <li key={video.id}>
                <VideoCard video={video} />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </li>
    </AccordionItem>
  );
}
