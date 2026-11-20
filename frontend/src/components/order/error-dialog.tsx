"use client";

import { LuTriangleAlert } from "react-icons/lu";
import { DialogDescription } from "@/components/ui/dialog";
import { possibleSubmissionIssues } from "@/data/order";
import { OrderDialog } from "./order-dialog";
import { ResultDialogActions } from "./result-dialog-actions";
import { ResultSubHeading } from "./result-sub-heading";
import { ResultTitle } from "./result-title";

export interface ErrorDialogProps {
  open: boolean;
  onRetry: () => void;
  onOpenChange: (open: boolean) => void;
}

export function ErrorDialog({ open, onRetry, onOpenChange }: ErrorDialogProps) {
  return (
    <OrderDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col items-center">
        <LuTriangleAlert aria-hidden="true" className="size-17 fill-[#ff5a5a] text-white" strokeWidth={2} />
        <ResultTitle>Something went wrong</ResultTitle>
        <DialogDescription className="mt-3 max-w-sm text-center text-sm leading-6 text-gs-body">
          Something went wrong while submitting your details. Please try again or contact our team if the issue
          continues.
        </DialogDescription>
      </div>

      <div className="mt-8">
        <ResultSubHeading>Possible Issues</ResultSubHeading>
        <ul className="mt-3 flex flex-col gap-2 text-sm leading-5 text-gs-body">
          {possibleSubmissionIssues.map((issue) => (
            <li key={issue} className="flex gap-3 pl-2">
              <span aria-hidden="true">·</span>
              {issue}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <ResultSubHeading>What can you do?</ResultSubHeading>
        <p className="mt-2 text-sm leading-6 text-gs-body">
          Try submitting your request again after reviewing your details. If you’re still unable to continue, our team
          is here to help you move forward.
        </p>
      </div>

      <ResultDialogActions primaryLabel="Try Again" onPrimary={onRetry} />
    </OrderDialog>
  );
}
