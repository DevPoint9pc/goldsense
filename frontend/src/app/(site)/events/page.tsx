import type { Metadata } from "next";
import { EventList } from "@/components/events/event-list";
import { FaqSection } from "@/components/site/faq-section";
import { PageIntro } from "@/components/site/page-intro";
import { getEvents } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Events & Experiences",
  description:
    "Explore the events, exhibitions and industry moments where GoldSense™ has been showcased, experienced and discussed.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <section className="container-site pt-16 md:pt-24">
        <PageIntro
          title="Events & Experiences"
          description="Explore the events, exhibitions and industry moments where GoldSense™ has been showcased, experienced and discussed."
        />
        <div className="mt-14 md:mt-24">
          {events.length ? (
            <EventList events={events} />
          ) : (
            <p className="text-base text-gs-body">No events yet. Check back soon.</p>
          )}
        </div>
      </section>
      <FaqSection />
    </>
  );
}
