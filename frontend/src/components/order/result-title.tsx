import { DialogTitle } from "@/components/ui/dialog";

export function ResultTitle({ children }: { children: React.ReactNode }) {
  return (
    <DialogTitle className="mt-3 text-center font-serif text-3xl leading-[1.15] font-normal tracking-[-0.03em] text-gs-ink md:text-4xl">
      {children}
    </DialogTitle>
  );
}
