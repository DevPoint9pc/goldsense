"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export function OrderDialog({ open, onOpenChange, className, children }: OrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-xl border-[#f1ece7] bg-white p-6 shadow-2xl shadow-gs-ink/20 md:max-w-xl md:p-8",
          className,
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
