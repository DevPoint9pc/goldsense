"use client";

import { useId } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const fieldSkin =
  "rounded-md border-gs-field-line bg-gs-field px-4 text-gs-ink shadow-none placeholder:text-gs-subtle focus-visible:border-gs-gold focus-visible:bg-white focus-visible:ring-0 aria-invalid:border-gs-error aria-invalid:ring-0";

export const selectTriggerSkin =
  "w-full pr-4 data-[placeholder]:text-gs-subtle [&_svg:not([class*='text-'])]:text-gs-ink [&>svg]:size-5 [&>svg]:opacity-100";

export const selectContentSkin = "rounded-md border-gs-field-line bg-white shadow-lg shadow-gs-ink/8";
export const selectItemSkin = "py-2 text-gs-ink focus:bg-gs-cream focus:text-gs-ink";

/** Keeps only digits, up to `max` of them. */
export const digitsOnly =
  (max = Infinity) =>
  (value: string) =>
    value.replace(/\D/g, "").slice(0, max);

/** Upper-cases and keeps only letters and digits, up to `max` of them. */
export const upperAlphanumeric =
  (max = Infinity) =>
  (value: string) =>
    value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, max);

/** Cleans what the user types (or pastes) before react-hook-form stores it. */
export function cleanInput<T extends UseFormRegisterReturn>(registration: T, clean: (value: string) => string): T {
  return {
    ...registration,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = clean(event.target.value);
      if (next !== event.target.value) event.target.value = next;
      return registration.onChange(event);
    },
  };
}

export function fieldA11y(error: FieldError | undefined, errorId: string, required = true) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": required || undefined,
  };
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  labelClassName?: string;
  children: (ids: { inputId: string; errorId: string }) => React.ReactNode;
}

export function FormField({ label, required = true, error, className, labelClassName, children }: FormFieldProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div className={cn("flex flex-col", className)}>
      <Label htmlFor={inputId} className={cn("mb-2 gap-0 leading-4 font-normal text-gs-ink", labelClassName)}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </Label>
      {children({ inputId, errorId })}
      {error && (
        <p id={errorId} className="mt-1 text-xs leading-4 text-gs-error">
          {error.message}
        </p>
      )}
    </div>
  );
}
