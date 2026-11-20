"use client";

import { Controller, type Control, type FieldError, type FieldPath, type FieldValues } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import { countryCodes } from "@/data/order";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cleanInput, digitsOnly, fieldA11y, selectContentSkin, selectItemSkin } from "./form-field";

interface PhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  /** Form field holding the country code, e.g. "+91". */
  codeName: FieldPath<T>;
  /** `register("phone")` for the number itself. */
  phone: UseFormRegisterReturn;
  inputId: string;
  errorId: string;
  error?: FieldError;
  /** Called after the country code changes, e.g. to re-validate the number. */
  onCodeChange?: () => void;
}

/** Country code dropdown and mobile number in one field, shared by the contact and order forms. */
export function PhoneInput<T extends FieldValues>({
  control,
  codeName,
  phone,
  inputId,
  errorId,
  error,
  onCodeChange,
}: PhoneInputProps<T>) {
  return (
    <div
      className={cn(
        "flex h-12 items-center rounded-md border bg-gs-field transition-colors focus-within:border-gs-gold focus-within:bg-white",
        error ? "border-gs-error" : "border-gs-field-line",
      )}
    >
      <Controller
        control={control}
        name={codeName}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              onCodeChange?.();
            }}
          >
            <SelectTrigger
              aria-label="Country code"
              className="h-full gap-2 rounded-none border-0 bg-transparent pr-3 pl-4 text-sm text-gs-ink shadow-none focus-visible:ring-0 data-[size=default]:h-full [&_svg:not([class*='text-'])]:text-gs-ink [&>svg]:size-5 [&>svg]:opacity-100"
            >
              <SelectValue>{field.value}</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper" className={selectContentSkin}>
              {countryCodes.map((code) => (
                <SelectItem key={code.value} value={code.value} className={cn(selectItemSkin, "text-sm")}>
                  {code.label} <span className="text-gs-muted">{code.country}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <span aria-hidden="true" className="h-5 w-px bg-gs-line-strong" />
      <Input
        id={inputId}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="Enter your mobile number"
        className="h-full rounded-none border-0 bg-transparent px-2 text-sm text-gs-ink shadow-none placeholder:text-gs-subtle focus-visible:ring-0 md:text-sm"
        {...fieldA11y(error, errorId)}
        {...cleanInput(phone, digitsOnly(14))}
      />
    </div>
  );
}
