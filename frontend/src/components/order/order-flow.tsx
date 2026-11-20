"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitBookingRequest } from "@/services/booking";
import {
  sendOtp,
  verifyOtp,
  type ContactDetails,
  type OrganisationDetails,
  type RequirementDetails,
} from "@/lib/booking";
import { ContactStep } from "./contact-step";
import { DetailsStep } from "./details-step";
import { OrderStepper } from "./order-stepper";
import { OtpDialog } from "./otp-dialog";
import { RequirementStep } from "./requirement-step";
import { ErrorDialog } from "./error-dialog";
import { SuccessDialog } from "./success-dialog";

type Step = 1 | 2 | 3;
type Result = { status: "success"; inviteCode: string } | { status: "error" } | null;

function formatPhone(countryCode: string, phone: string) {
  const grouped = phone.length === 10 ? `${phone.slice(0, 5)} ${phone.slice(5)}` : phone;
  return `${countryCode} ${grouped}`;
}

export function OrderFlow() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [reached, setReached] = useState<Step>(1);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const detailsFormRef = useRef<HTMLFormElement>(null);
  const requirementFormRef = useRef<HTMLFormElement>(null);
  /** Step picked in the stepper while moving forward; earlier steps are saved on the way. */
  const targetRef = useRef<Step | null>(null);
  const [contact, setContact] = useState<ContactDetails | null>(null);
  const [organisation, setOrganisation] = useState<OrganisationDetails | null>(null);
  const [requirement, setRequirement] = useState<RequirementDetails | null>(null);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpSession, setOtpSession] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>(null);

  const goTo = (next: Step) => {
    setStep(next);
    setReached((value) => (next > value ? next : value));
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitStep = (target: Step) =>
    ({ 1: contactFormRef, 2: detailsFormRef, 3: requirementFormRef })[target].current?.requestSubmit();

  /** Called once a step's form is valid and saved. */
  const advance = (from: Step) => {
    const next = (from + 1) as Step;
    const target = targetRef.current;
    if (target && target > next) {
      setStep(next);
      submitStep(next);
      return;
    }
    targetRef.current = null;
    goTo(next);
  };

  const selectStep = (target: number) => {
    if (target === step || target > reached) return;
    if (target < step) {
      targetRef.current = null;
      goTo(target as Step);
      return;
    }
    targetRef.current = target as Step;
    submitStep(step);
  };

  const saveContact = (values: ContactDetails) => {
    const verified =
      contact && contact.email === values.email && contact.countryCode === values.countryCode && contact.phone === values.phone;
    if (verified) {
      setContact(values);
      advance(1);
      return;
    }
    void requestOtp(values);
  };

  const requestOtp = async (values: ContactDetails) => {
    setContact(values);
    setSendingOtp(true);
    await sendOtp(values);
    setSendingOtp(false);
    setOtpError(null);
    setOtpSession((value) => value + 1);
    setOtpOpen(true);
  };

  const confirmOtp = async (code: string) => {
    if (!contact) return;
    setVerifying(true);
    const valid = await verifyOtp(contact, code);
    setVerifying(false);
    if (!valid) {
      setOtpError("That code didn’t match. Please check it and try again.");
      return;
    }
    setOtpOpen(false);
    advance(1);
  };

  const submitRequest = async (values: RequirementDetails) => {
    if (!contact || !organisation) return;
    setRequirement(values);
    setSubmitting(true);
    try {
      const saved = await submitBookingRequest({ ...contact, ...organisation, ...values });
      if (saved.ok) {
        setResult({ status: "success", inviteCode: saved.inviteCode });
      } else {
        console.error("[order] Request not saved:", saved.detail ?? "see server logs");
        setResult({ status: "error" });
      }
    } catch (error) {
      console.error("[order] Request failed:", error);
      setResult({ status: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={cardRef} className="scroll-mt-24 rounded-xl border border-[#f1ece7] bg-white p-5 md:p-7">
      <OrderStepper current={step} reached={reached} onSelect={selectStep} />

      {/* Every step stays mounted so going back and forth keeps what was typed. */}
      <div className="mt-5">
        <div hidden={step !== 1}>
          <ContactStep formRef={contactFormRef} submitting={sendingOtp} onSubmit={saveContact} />
        </div>
        {reached >= 2 && (
          <div hidden={step !== 2}>
            <DetailsStep
              formRef={detailsFormRef}
              onSubmit={(values) => {
                setOrganisation(values);
                advance(2);
              }}
            />
          </div>
        )}
        {reached >= 3 && (
          <div hidden={step !== 3}>
            <RequirementStep formRef={requirementFormRef} submitting={submitting} onSubmit={submitRequest} />
          </div>
        )}
      </div>

      {contact && (
        <OtpDialog
          key={otpSession}
          open={otpOpen}
          phoneLabel={formatPhone(contact.countryCode, contact.phone)}
          verifying={verifying}
          error={otpError}
          onVerify={confirmOtp}
          onResend={() => {
            setOtpError(null);
            void sendOtp(contact);
          }}
          onChangeNumber={() => {
            targetRef.current = null;
            setOtpOpen(false);
          }}
        />
      )}

      {contact && result?.status === "success" && (
        <SuccessDialog
          open
          inviteCode={result.inviteCode}
          email={contact.email}
          mobile={formatPhone(contact.countryCode, contact.phone)}
          onClose={() => {
            setResult(null);
            router.push("/product");
          }}
        />
      )}

      <ErrorDialog
        open={result?.status === "error"}
        onOpenChange={(open) => !open && setResult(null)}
        onRetry={() => {
          setResult(null);
          if (requirement) void submitRequest(requirement);
        }}
      />
    </div>
  );
}
