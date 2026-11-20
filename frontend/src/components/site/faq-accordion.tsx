'use client';

import { LuPlus, LuX } from 'react-icons/lu';
import type { FaqItem } from '@/types/content';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenId?: string | null;
  className?: string;
}

export function FaqAccordion({
  items,
  defaultOpenId,
  className,
}: FaqAccordionProps) {
  const initialOpenId =
    defaultOpenId === undefined ? items[0]?.id : defaultOpenId;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={initialOpenId ?? undefined}
      asChild
      className=" w-full"
    >
      <ul className={cn('flex flex-col gap-2', className)}>
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} asChild>
            <li className="rounded-lg border-b-0 bg-white">
              <AccordionTrigger
                className="group items-center gap-6 rounded-lg px-6 py-5 text-lg leading-6 font-medium tracking-[-0.01em] text-gs-ink data-[state=open]:pb-4 md:text-xl"
                icon={
                  <>
                    <LuPlus
                      aria-hidden="true"
                      className="size-5 shrink-0 group-data-[state=open]:hidden"
                      strokeWidth={2}
                    />
                    <LuX
                      aria-hidden="true"
                      className="hidden size-5 shrink-0 group-data-[state=open]:block"
                      strokeWidth={2}
                    />
                  </>
                }
              >
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-sm md:text-base leading-5 text-gs-ink">
                {item.answer}
              </AccordionContent>
            </li>
          </AccordionItem>
        ))}
      </ul>
    </Accordion>
  );
}
