"use client";

import { type GoldSenseEvent } from "@/types/content";
import { Accordion } from "@/components/ui/accordion";
import { EventRow } from "./event-row";

export function EventList({ events }: { events: GoldSenseEvent[] }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={events[0] ? [events[0].id] : []}
      asChild
    >
      <ul>
        {events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </ul>
    </Accordion>
  );
}
