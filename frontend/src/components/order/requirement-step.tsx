"use client";

import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cleanInput, digitsOnly, fieldA11y } from "@/components/forms/form-field";
import { SiteButton } from "@/components/site/site-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { associations, businessNatures, unitOptions } from "@/data/order";
import { requirementDetailsSchema, type RequirementDetails } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { OrderField, orderFieldClass } from "./order-field";
import { OrderSectionTitle } from "./order-section-title";
import { OrderSelect } from "./order-select";
import { OrderStepIntro } from "./order-step-intro";

interface RequirementStepProps {
  defaultValues?: Partial<RequirementDetails>;
  submitting: boolean;
  formRef?: React.Ref<HTMLFormElement>;
  onSubmit: (values: RequirementDetails) => void;
}

export function RequirementStep({ defaultValues, submitting, formRef, onSubmit }: RequirementStepProps) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RequirementDetails>({
    mode: "onTouched",
    resolver: zodResolver(requirementDetailsSchema),
    defaultValues: { natureOfBusiness: "", association: "", unitsRequired: "", message: "", ...defaultValues },
  });

  const stepStores = (delta: number) => {
    const next = Math.max(1, (Number(getValues("storeCount")) || 0) + delta);
    setValue("storeCount", String(next), { shouldValidate: true, shouldTouch: true });
  };

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)}>
      <OrderStepIntro
        title="Tell us about your requirement"
        description="Help us understand your business and what you need from GoldSense™."
      />

      <section className="mt-8" aria-label="Business details">
        <OrderSectionTitle>Business Details</OrderSectionTitle>
        <div className="mt-3 grid gap-x-4 gap-y-4 md:grid-cols-2">
          <OrderSelect
            control={control}
            name="natureOfBusiness"
            label="Nature of business"
            placeholder="Select nature of business"
            options={businessNatures}
            error={errors.natureOfBusiness}
          />

          <OrderField label="Number of stores / branches" error={errors.storeCount}>
            {({ inputId, errorId }) => (
              <div className="relative">
                <Input
                  id={inputId}
                  inputMode="numeric"
                  placeholder="e.g. 12"
                  className={cn(orderFieldClass, "pr-11")}
                  {...fieldA11y(errors.storeCount, errorId)}
                  {...cleanInput(register("storeCount"), digitsOnly(6))}
                />
                <div className="absolute top-1/2 right-3 flex -translate-y-1/2 flex-col text-gs-ink">
                  <button type="button" aria-label="Increase stores" onClick={() => stepStores(1)} className="-mb-1">
                    <LuChevronUp aria-hidden="true" className="size-4" strokeWidth={2} />
                  </button>
                  <button type="button" aria-label="Decrease stores" onClick={() => stepStores(-1)}>
                    <LuChevronDown aria-hidden="true" className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}
          </OrderField>

          <OrderField label="How do you currently test gold?" error={errors.currentTestingMethod}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                placeholder="e.g. XRF at the head office"
                className={orderFieldClass}
                {...fieldA11y(errors.currentTestingMethod, errorId)}
                {...register("currentTestingMethod")}
              />
            )}
          </OrderField>
        </div>
      </section>

      <hr className="mt-4 border-gs-line" />

      <section className="mt-5" aria-label="Association details">
        <OrderSectionTitle>Association Details</OrderSectionTitle>
        <div className="mt-3 grid gap-x-4 gap-y-4 md:grid-cols-2">
          <OrderSelect
            control={control}
            name="association"
            label="Association membership"
            placeholder="Select an association"
            options={associations}
            error={errors.association}
          />
          <OrderField label="Membership number" error={errors.membershipNumber}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                placeholder="Enter membership number"
                className={orderFieldClass}
                {...fieldA11y(errors.membershipNumber, errorId)}
                {...register("membershipNumber")}
              />
            )}
          </OrderField>
          <OrderSelect
            control={control}
            name="unitsRequired"
            label="Units required"
            placeholder="Select number of units"
            options={unitOptions}
            error={errors.unitsRequired}
            indicator="updown"
          />
          <OrderField label="Message" required={false} error={errors.message} className="md:col-span-2">
            {({ inputId, errorId }) => (
              <Textarea
                id={inputId}
                placeholder="Tell us more about your requirement..."
                className={cn(orderFieldClass, "field-sizing-fixed h-38 resize-none py-3")}
                {...fieldA11y(errors.message, errorId, false)}
                {...register("message")}
              />
            )}
          </OrderField>
        </div>
      </section>

      <SiteButton type="submit" disabled={submitting} className="mt-7 h-12 w-full rounded-lg text-base">
        {submitting ? "Submitting…" : "Submit Request"}
      </SiteButton>
    </form>
  );
}
