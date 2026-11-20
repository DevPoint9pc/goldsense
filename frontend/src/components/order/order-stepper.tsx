import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface OrderStepperProps {
  current: number;
  /** Highest step the user has unlocked; steps up to it can be clicked. */
  reached: number;
  total?: number;
  onSelect: (step: number) => void;
}

export function OrderStepper({ current, reached, total = 3, onSelect }: OrderStepperProps) {
  return (
    <ol aria-label={`Step ${current} of ${total}`} className="flex items-center">
      {Array.from({ length: total }, (_, index) => {
        const step = index + 1;
        const done = step <= current;
        const selectable = step <= reached && step !== current;
        return (
          <Fragment key={step}>
            {index > 0 && <li aria-hidden="true" className={cn("h-1 flex-1", done ? "bg-[#f8e3cc]" : "bg-[#ececec]")} />}
            <li className="shrink-0">
              <button
                type="button"
                disabled={!selectable}
                aria-current={step === current ? "step" : undefined}
                onClick={() => onSelect(step)}
                className={cn(
                  "flex size-11 items-center justify-center rounded font-serif text-base text-gs-ink transition-colors",
                  done ? "bg-[#f8e3cc]" : "bg-[#efefef]",
                  selectable ? "cursor-pointer hover:bg-[#f3d4b1]" : "cursor-default",
                )}
              >
                <span className="sr-only">{selectable ? "Go to step " : "Step "}</span>
                {String(step).padStart(2, "0")}
              </button>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
