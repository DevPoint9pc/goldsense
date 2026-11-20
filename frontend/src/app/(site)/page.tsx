import type { Metadata } from "next";
import { MobileStory } from "@/components/home/mobile-story";
import { ScrollStory } from "@/components/home/scroll-story";
import { FaqSection } from "@/components/site/faq-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <MobileStory />
      <ScrollStory />
      <FaqSection className="bg-[#EDDCCA] story:bg-[#EBD7C2]" />
    </>
  );
}
