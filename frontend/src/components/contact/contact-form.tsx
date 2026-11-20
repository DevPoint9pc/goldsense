"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { interestOptions, organisationTypes } from "@/data/contact";
import { submitContactEnquiry } from "@/services/contact";
import { contactEnquirySchema, type ContactEnquiry } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { SiteButton } from "@/components/site/site-button";
import { OrderDialog } from "@/components/order/order-dialog";
import { ResultTitle } from "@/components/order/result-title";
import { SuccessBadge } from "@/components/order/success-badge";
import { DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { contactFieldClass, ContactField } from "./contact-field";
import { PhoneInput } from "@/components/forms/phone-field";

export type ContactFormValues = ContactEnquiry;

const INVALID_MESSAGE = "Please check your details and try again.";
const FAILED_MESSAGE =
  "We couldn't send your message. Please try again, or email us at goldsense@igmindia.com.";

export function ContactForm() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onTouched",
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: { countryCode: "+91", organisationType: "", interest: "", consent: false },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    try {
      const result = await submitContactEnquiry(values);
      if (result.ok) {
        setSubmittedName(values.fullName.trim().split(" ")[0]);
        reset();
        return;
      }
      console.error("[contact] Enquiry not saved:", result.detail ?? result.error);
      setSubmitError(result.error === "invalid" ? INVALID_MESSAGE : FAILED_MESSAGE);
    } catch (error) {
      console.error("[contact] Enquiry request failed:", error);
      setSubmitError(FAILED_MESSAGE);
    }
  };

  const selectFields = [
    {
      name: "organisationType" as const,
      label: "Organisation type",
      placeholder: "Select organisation type",
      options: organisationTypes,
    },
    {
      name: "interest" as const,
      label: "I'm interested in",
      placeholder: "Select an option",
      options: interestOptions,
    },
  ];

  return (
    <div id="contact-form" className="scroll-mt-24 rounded-lg bg-white px-5 py-6 md:p-7">
      <h2 className="text-xl leading-7 font-medium tracking-[-0.01em] md:text-2xl">Send Us a Message</h2>

      <OrderDialog open={submittedName !== null} onOpenChange={(open) => !open && setSubmittedName(null)}>
        <div className="flex flex-col items-center">
          <SuccessBadge />
          <ResultTitle>Thank you{submittedName ? `, ${submittedName}` : ""}</ResultTitle>
          <DialogDescription className="mt-3 max-w-sm text-center text-sm leading-6 text-gs-body">
            We&apos;ve received your message and our team will get back to you soon.
          </DialogDescription>
        </div>
        <SiteButton onClick={() => setSubmittedName(null)} className="mt-8 h-12 w-full rounded-lg text-base">
          Okay, got it
        </SiteButton>
      </OrderDialog>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
          <ContactField label="Full name" error={errors.fullName}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className={cn(contactFieldClass, "h-12")}
                {...fieldA11y(errors.fullName, errorId)}
                {...register("fullName")}
              />
            )}
          </ContactField>
          <ContactField label="Email address" error={errors.email}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className={cn(contactFieldClass, "h-12")}
                {...fieldA11y(errors.email, errorId)}
                {...register("email")}
              />
            )}
          </ContactField>
          <ContactField label="Phone number" error={errors.phone}>
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
          </ContactField>
          <ContactField label="Organisation name" error={errors.organisation}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                type="text"
                autoComplete="organization"
                placeholder="Enter your organisation name"
                className={cn(contactFieldClass, "h-12")}
                {...fieldA11y(errors.organisation, errorId)}
                {...register("organisation")}
              />
            )}
          </ContactField>

          {selectFields.map((field) => (
            <ContactField key={field.name} label={field.label} error={errors[field.name]}>
              {({ inputId, errorId }) => (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger
                        id={inputId}
                        ref={ref}
                        onBlur={onBlur}
                        {...fieldA11y(errors[field.name], errorId)}
                        className={cn(contactFieldClass, selectTriggerSkin, "data-[size=default]:h-12")}
                      >
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className={selectContentSkin}
                      >
                        {field.options.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className={cn(selectItemSkin, "text-sm")}
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
            </ContactField>
          ))}

          <ContactField label="Message" error={errors.message} className="md:col-span-2">
            {({ inputId, errorId }) => (
              <Textarea
                id={inputId}
                rows={5}
                placeholder="Tell us how we can help"
                className={cn(contactFieldClass, "field-sizing-fixed h-35 resize-none py-3")}
                {...fieldA11y(errors.message, errorId)}
                {...register("message")}
              />
            )}
          </ContactField>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <Controller
            control={control}
            name="consent"
            render={({ field: { value, onChange, onBlur, ref } }) => (
              <Checkbox
                id="contact-consent"
                ref={ref}
                checked={value}
                onCheckedChange={(checked) => onChange(checked === true)}
                onBlur={onBlur}
                className="mt-px size-4 rounded-xs border-gs-field-line bg-gs-field shadow-none data-[state=checked]:border-gs-ink data-[state=checked]:bg-gs-ink [&_svg]:size-3"
              />
            )}
          />
          <Label htmlFor="contact-consent" className="text-xs leading-4 font-normal text-gs-ink">
            I agree to receive updates from GoldSense™ via WhatsApp, call and email.
          </Label>
        </div>

        {submitError && (
          <p role="alert" className="mt-5 text-sm leading-5 text-gs-error">
            {submitError}
          </p>
        )}

        <SiteButton type="submit" disabled={isSubmitting} className="mt-6 h-12 w-full rounded-lg text-sm">
          {isSubmitting ? "Sending..." : "Send Message"}
        </SiteButton>
      </form>
    </div>
  );
}
