"use client";

import { SiteButton } from "@/components/site/site-button";
import { ButtonLink } from "@/components/site/button-link";

export function ResultDialogActions({ primaryLabel, onPrimary }: { primaryLabel: string; onPrimary: () => void }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      <ButtonLink href="/contact-us" variant="secondary" className="h-12 rounded-lg text-base font-normal">
        Need help
      </ButtonLink>
      <SiteButton onClick={onPrimary} className="h-12 rounded-lg text-base">
        {primaryLabel}
      </SiteButton>
    </div>
  );
}
