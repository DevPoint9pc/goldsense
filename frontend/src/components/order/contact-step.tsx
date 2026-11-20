"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { fieldA11y } from "@/components/forms/form-field";
import { PhoneInput } from "@/components/forms/phone-field";
import { SiteButton } from "@/components/site/site-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactDetailsSchema, type ContactDetails } from "@/lib/validation";
import { OrderField, orderFieldClass } from "./order-field";
import { OrderStepIntro } from "./order-step-intro";

const checkboxClass =
  "size-4 rounded-xs border-gs-field-line bg-gs-field shadow-none data-[state=checked]:border-gs-ink data-[state=checked]:bg-gs-ink aria-invalid:border-gs-error [&_svg]:size-3";

interface ContactStepProps {
  defaultValues?: Partial<ContactDetails>;
  submitting: boolean;
  formRef?: React.Ref<HTMLFormElement>;
  onSubmit: (values: ContactDetails) => void;
}

export function ContactStep({ defaultValues, submitting, formRef, onSubmit }: ContactStepProps) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ContactDetails>({
    mode: "onTouched",
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: { countryCode: "+91", acceptsUpdates: false, acceptsTerms: false, ...defaultValues },
  });

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)}>
      <OrderStepIntro
        title="Let’s get started"
        description="Enter your contact details to begin your GoldSense™ enquiry."
      />

      <div className="mt-8 flex flex-col gap-4">
        <OrderField label="Email address" error={errors.email}>
          {({ inputId, errorId }) => (
            <Input
              id={inputId}
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              className={orderFieldClass}
              {...fieldA11y(errors.email, errorId)}
              {...register("email")}
            />
          )}
        </OrderField>

        <OrderField label="Phone number" error={errors.phone}>
          {({ inputId, errorId }) => (
            <PhoneInput
              control={control}
              codeName="countryCode"
              phone={register("phone")}
              inputId={inputId}
              errorId={errorId}
              error={errors.phone}
              onCodeChange={() => {
                if (getValues("phone")) void trigger("phone");
              }}
            />
          )}
        </OrderField>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="acceptsUpdates"
            render={({ field }) => (
              <Checkbox
                id="order-updates"
                ref={field.ref}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                className={checkboxClass}
              />
            )}
          />
          <Label htmlFor="order-updates" className="text-sm leading-5 font-normal text-gs-ink">
            I agree to receive booking updates via WhatsApp, call and email
          </Label>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="acceptsTerms"
              render={({ field }) => (
                <Checkbox
                  id="order-terms"
                  ref={field.ref}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  onBlur={field.onBlur}
                  aria-invalid={errors.acceptsTerms ? true : undefined}
                  aria-describedby={errors.acceptsTerms ? "order-terms-error" : undefined}
                  className={checkboxClass}
                />
              )}
            />
            <span className="text-sm leading-5 text-gs-ink">
              <Label htmlFor="order-terms" className="inline font-normal">
                I have read and agree to the
              </Label>{" "}
              <Link
                href="/terms-and-conditions"
                target="_blank"
                className="underline underline-offset-2 hover:text-gs-gold"
              >
                Terms &amp; Conditions
              </Link>
            </span>
          </div>
          {errors.acceptsTerms && (
            <p id="order-terms-error" className="mt-1 pl-6 text-xs leading-4 text-gs-error">
              {errors.acceptsTerms.message}
            </p>
          )}
        </div>
      </div>

      <SiteButton type="submit" disabled={submitting} className="mt-7 h-12 w-full rounded-lg text-base">
        Verify &amp; Continue
      </SiteButton>
    </form>
  );
}
