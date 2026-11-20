'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  cleanInput,
  digitsOnly,
  fieldA11y,
  upperAlphanumeric,
} from '@/components/forms/form-field';
import { SiteButton } from '@/components/site/site-button';
import { Input } from '@/components/ui/input';
import { designations, organisationTypes } from '@/data/order';
import { fetchCompanyName } from '@/lib/booking';
import {
  organisationDetailsSchema,
  type OrganisationDetails,
} from '@/lib/validation';
import { cn } from '@/lib/utils';
import { OrderField, orderFieldClass } from './order-field';
import { OrderSectionTitle } from './order-section-title';
import { OrderSelect } from './order-select';
import { OrderStepIntro } from './order-step-intro';

interface DetailsStepProps {
  defaultValues?: Partial<OrganisationDetails>;
  formRef?: React.Ref<HTMLFormElement>;
  onSubmit: (values: OrganisationDetails) => void;
}

export function DetailsStep({
  defaultValues,
  formRef,
  onSubmit,
}: DetailsStepProps) {
  const [lookupMessage, setLookupMessage] = useState<string | null>(null);
  const [lookingUp, setLookingUp] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<OrganisationDetails>({
    mode: 'onTouched',
    resolver: zodResolver(organisationDetailsSchema),
    defaultValues: {
      designation: '',
      organisationType: '',
      gstNumber: '',
      ...defaultValues,
    },
  });

  const lookupCompany = async () => {
    if (!(await trigger('gstNumber')) || !getValues('gstNumber')) {
      setLookupMessage('Enter a valid GST number to fetch the company name.');
      return;
    }
    setLookingUp(true);
    const name = await fetchCompanyName(getValues('gstNumber'));
    setLookingUp(false);
    if (name) {
      setValue('organisationName', name, { shouldValidate: true });
      setLookupMessage(null);
    } else {
      setLookupMessage(
        'We couldn’t fetch the company name. Please enter it below.',
      );
    }
  };

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit(onSubmit)}>
      <OrderStepIntro
        title="Your number is verified"
        description="Now, tell us a little about yourself and your organisation."
      />

      <section className="mt-8" aria-label="Your details">
        <OrderSectionTitle>Your Details</OrderSectionTitle>
        <div className="mt-3 grid gap-x-4 gap-y-4 md:grid-cols-2">
          <OrderField label="Full name" error={errors.fullName}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                autoComplete="name"
                placeholder="Enter your full name"
                className={orderFieldClass}
                {...fieldA11y(errors.fullName, errorId)}
                {...register('fullName')}
              />
            )}
          </OrderField>
          <OrderSelect
            control={control}
            name="designation"
            label="Designation"
            placeholder="Select your designation"
            options={designations}
            error={errors.designation}
            indicator="none"
          />
        </div>
      </section>

      <hr className="mt-4 border-gs-line" />

      <section className="mt-5" aria-label="Organisation details">
        <OrderSectionTitle>Organisation Details</OrderSectionTitle>
        <div className="mt-3 grid gap-x-4 gap-y-4 md:grid-cols-2">
          <OrderField
            label="GST number"
            required={false}
            error={errors.gstNumber}
            className="md:col-span-2"
          >
            {({ inputId, errorId }) => (
              <>
                <div className="relative">
                  <Input
                    id={inputId}
                    placeholder="Enter your GST number"
                    className={cn(
                      orderFieldClass,
                      'pr-44 uppercase placeholder:normal-case',
                    )}
                    {...fieldA11y(errors.gstNumber, errorId, false)}
                    {...cleanInput(register('gstNumber'), upperAlphanumeric(15))}
                  />
                  <button
                    type="button"
                    onClick={lookupCompany}
                    disabled={lookingUp}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-gs-ink hover:text-gs-gold disabled:opacity-60"
                  >
                    {lookingUp ? 'Fetching…' : 'Fetch company name'}
                  </button>
                </div>
                {lookupMessage && (
                  <p
                    role="status"
                    className="mt-1 text-xs leading-4 text-gs-muted"
                  >
                    {lookupMessage}
                  </p>
                )}
              </>
            )}
          </OrderField>

          <OrderField label="Organisation name" error={errors.organisationName}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                autoComplete="organization"
                placeholder="Enter your organisation name"
                className={orderFieldClass}
                {...fieldA11y(errors.organisationName, errorId)}
                {...register('organisationName')}
              />
            )}
          </OrderField>
          <OrderSelect
            control={control}
            name="organisationType"
            label="Organisation type"
            placeholder="Select organisation type"
            options={organisationTypes}
            error={errors.organisationType}
          />

          <OrderField label="Company PAN No." error={errors.panNumber}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                placeholder="e.g. ABCDE1234F"
                className={cn(
                  orderFieldClass,
                  'uppercase placeholder:normal-case',
                )}
                {...fieldA11y(errors.panNumber, errorId)}
                {...cleanInput(register('panNumber'), upperAlphanumeric(10))}
              />
            )}
          </OrderField>
          <OrderField label="City / District" error={errors.city}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                autoComplete="address-level2"
                placeholder="Enter your city or district"
                className={orderFieldClass}
                {...fieldA11y(errors.city, errorId)}
                {...register('city')}
              />
            )}
          </OrderField>

          <OrderField label="PIN code" error={errors.pinCode}>
            {({ inputId, errorId }) => (
              <Input
                id={inputId}
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="Enter your PIN code"
                className={orderFieldClass}
                {...fieldA11y(errors.pinCode, errorId)}
                {...cleanInput(register('pinCode'), digitsOnly(6))}
              />
            )}
          </OrderField>
        </div>
      </section>

      <SiteButton
        type="submit"
        className="mt-7 h-12 w-full rounded-lg text-base"
      >
        Submit &amp; Continue
      </SiteButton>
    </form>
  );
}
