"use client";

import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";
import { DialogDescription } from "@/components/ui/dialog";
import { OrderDialog } from "./order-dialog";
import { ResultDialogActions } from "./result-dialog-actions";
import { ResultSubHeading } from "./result-sub-heading";
import { ResultTitle } from "./result-title";
import { SuccessBadge } from "./success-badge";

export interface SuccessDialogProps {
  open: boolean;
  inviteCode: string;
  email: string;
  mobile: string;
  onClose: () => void;
}

export function SuccessDialog({ open, inviteCode, email, mobile, onClose }: SuccessDialogProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <OrderDialog open={open} onOpenChange={(next) => !next && onClose()}>
      <div className="flex flex-col items-center">
        <SuccessBadge />
        <ResultTitle>You’re on the list</ResultTitle>
        <DialogDescription className="mt-3 max-w-sm text-center text-sm leading-6 text-gs-body">
          Your registration is confirmed. Keep your invite code safe. You’ll need it to continue with your GoldSense™
          booking.
        </DialogDescription>

        <p className="mt-7 text-sm md:text-base leading-4 uppercase text-gs-ink">Your invite code</p>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy invite code ${inviteCode}`}
          className="mt-2 flex h-13 min-w-43 items-center justify-center gap-3 rounded-md border border-dashed border-[#cfcfcf] bg-gs-field px-6 text-lg font-semibold tracking-[0.04em] text-gs-ink hover:bg-white"
        >
          {inviteCode}
          {copied ? (
            <LuCheck aria-hidden="true" className="size-5 text-gs-success" />
          ) : (
            <LuCopy aria-hidden="true" className="size-5" strokeWidth={2} />
          )}
        </button>
        <span role="status" className="sr-only">
          {copied ? "Invite code copied" : ""}
        </span>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm leading-4 uppercase text-gs-ink">Email</dt>
          <dd className="mt-2 text-sm leading-5 break-all text-gs-ink">{email}</dd>
        </div>
        <div>
          <dt className="text-sm leading-4 uppercase text-gs-ink">Mobile</dt>
          <dd className="mt-2 text-sm leading-5 text-gs-ink">{mobile}</dd>
        </div>
      </dl>

      <div className="mt-8">
        <ResultSubHeading>What happens next?</ResultSubHeading>
        <p className="mt-2 text-sm leading-6 text-gs-body">
          Reserve your units by arranging the 25% per-unit advance with our team. The first 10,000 confirmed advances
          secure the introductory price.
        </p>
      </div>

      <ResultDialogActions primaryLabel="Okay, got it" onPrimary={onClose} />
    </OrderDialog>
  );
}
