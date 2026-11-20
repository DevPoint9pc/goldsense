"use client";

import { useEffect, useRef, useState } from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SiteButton } from "@/components/site/site-button";
import { OTP_LENGTH, OTP_RESEND_SECONDS } from "@/data/order";
import { cn } from "@/lib/utils";
import { OrderDialog } from "./order-dialog";

interface OtpDialogProps {
  open: boolean;
  phoneLabel: string;
  verifying: boolean;
  error: string | null;
  onVerify: (code: string) => void;
  onResend: () => void;
  onChangeNumber: () => void;
}

const emptyCode = () => Array<string>(OTP_LENGTH).fill("");

export function OtpDialog({ open, phoneLabel, verifying, error, onVerify, onResend, onChangeNumber }: OtpDialogProps) {
  const [digits, setDigits] = useState(emptyCode);
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);
  const [touched, setTouched] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!open || secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [open, secondsLeft]);

  const code = digits.join("");
  const complete = code.length === OTP_LENGTH;

  const fill = (start: number, value: string) => {
    const chars = value.replace(/\D/g, "").slice(0, OTP_LENGTH - start).split("");
    if (chars.length === 0) return;
    setDigits((current) => {
      const next = [...current];
      chars.forEach((char, offset) => (next[start + offset] = char));
      return next;
    });
    inputs.current[Math.min(start + chars.length, OTP_LENGTH - 1)]?.focus();
  };

  const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      setDigits((current) => current.map((digit, i) => (i === index - 1 ? "" : digit)));
    }
    if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const resend = () => {
    setDigits(emptyCode());
    setSecondsLeft(OTP_RESEND_SECONDS);
    onResend();
    inputs.current[0]?.focus();
  };

  const showIncomplete = touched && !complete;
  const message = showIncomplete ? `Please enter the ${OTP_LENGTH}-digit code.` : error;

  return (
    <OrderDialog open={open} onOpenChange={(next) => !next && onChangeNumber()} className="md:max-w-md">
      <form
        noValidate
        className="flex flex-col items-center text-center"
        onSubmit={(event) => {
          event.preventDefault();
          setTouched(true);
          if (complete) onVerify(code);
        }}
      >
        <DialogTitle className="font-serif text-xl leading-7 font-normal tracking-[-0.015em] text-gs-ink">
          OTP Verification
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm leading-5 text-gs-ink">
          Enter the {OTP_LENGTH} digit OTP sent to your phone number
        </DialogDescription>
        <p className="mt-3 flex items-center gap-3 text-sm leading-5 font-medium text-gs-ink">
          {phoneLabel}
          <button type="button" onClick={onChangeNumber} className="font-normal underline underline-offset-4 hover:text-gs-gold">
            Change number
          </button>
        </p>

        <fieldset className="mt-18 w-full">
          <legend className="sr-only">One-time password</legend>
          <div className="flex justify-between gap-2">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={OTP_LENGTH}
                value={digit}
                autoFocus={index === 0}
                aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                aria-invalid={message ? true : undefined}
                aria-describedby={message ? "otp-error" : undefined}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  if (!value) {
                    setDigits((current) => current.map((d, i) => (i === index ? "" : d)));
                  } else {
                    fill(index, value.length <= 2 ? value.slice(-1) : value);
                  }
                }}
                onPaste={(event) => {
                  event.preventDefault();
                  fill(index, event.clipboardData.getData("text"));
                }}
                onKeyDown={(event) => onKeyDown(index, event)}
                onFocus={(event) => event.target.select()}
                className={cn(
                  "size-12 min-w-0 flex-1 rounded-lg border bg-gs-field text-center font-serif text-xl text-gs-ink outline-none transition-colors focus:border-gs-gold focus:bg-white md:size-15 md:flex-none",
                  message ? "border-gs-error" : "border-gs-field-line",
                )}
              />
            ))}
          </div>
        </fieldset>

        {message && (
          <p id="otp-error" role="alert" className="mt-2 text-xs leading-4 text-gs-error">
            {message}
          </p>
        )}

        <p className="mt-8 text-sm leading-5 text-gs-muted">
          Didn’t receive any code?{" "}
          <button
            type="button"
            onClick={resend}
            disabled={secondsLeft > 0}
            className="ml-1 text-gs-ink underline underline-offset-4 disabled:cursor-default enabled:hover:text-gs-gold"
          >
            {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend code"}
          </button>
        </p>

        <SiteButton type="submit" disabled={verifying} className="mt-15 h-12 w-full rounded-lg text-base">
          {verifying ? "Verifying…" : "Verify Number"}
        </SiteButton>
      </form>
    </OrderDialog>
  );
}
