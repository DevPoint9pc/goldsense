"use client";

import { LuChevronsUpDown } from "react-icons/lu";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  fieldA11y,
  selectContentSkin,
  selectItemSkin,
  selectTriggerSkin,
} from "@/components/forms/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { orderFieldClass, OrderField } from "./order-field";

export interface OrderSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  options: string[];
  error?: FieldError;
  indicator?: "chevron" | "updown" | "none";
  className?: string;
}

export function OrderSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  error,
  indicator = "chevron",
  className,
}: OrderSelectProps<T>) {
  return (
    <OrderField label={label} error={error} className={className}>
      {({ inputId, errorId }) => (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id={inputId}
                ref={field.ref}
                onBlur={field.onBlur}
                {...fieldA11y(error, errorId)}
                className={cn(
                  orderFieldClass,
                  selectTriggerSkin,
                  "data-[size=default]:h-12",
                  indicator !== "chevron" && "[&>svg:last-child]:hidden",
                )}
              >
                <SelectValue placeholder={placeholder} />
                {indicator === "updown" && (
                  <LuChevronsUpDown aria-hidden="true" className="ml-auto size-5 text-gs-ink" strokeWidth={2} />
                )}
              </SelectTrigger>
              <SelectContent position="popper" className={selectContentSkin}>
                {options.map((option) => (
                  <SelectItem key={option} value={option} className={cn(selectItemSkin, "text-sm")}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
    </OrderField>
  );
}
