"use server";

import { appendToSheet } from "@/lib/google-sheet";
import { contactEnquirySchema, type ContactEnquiry } from "@/lib/validation";

export type ContactEnquiryResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "failed"; detail?: string };

function failure(detail: string): ContactEnquiryResult {
  console.error(`[contact] ${detail}`);
  return {
    ok: false,
    error: "failed",
    ...(process.env.NODE_ENV === "development" && { detail }),
  };
}

export async function submitContactEnquiry(values: ContactEnquiry): Promise<ContactEnquiryResult> {
  const parsed = contactEnquirySchema.safeParse(values);
  if (!parsed.success) {
    console.error("[contact] Enquiry failed server validation:", parsed.error.issues.map((issue) => issue.path.join(".")));
    return { ok: false, error: "invalid" };
  }
  const enquiry: ContactEnquiry = parsed.data;

  const result = await appendToSheet("contact", {
    fullName: enquiry.fullName,
    email: enquiry.email,
    phone: `${enquiry.countryCode} ${enquiry.phone}`,
    organisation: enquiry.organisation,
    organisationType: enquiry.organisationType,
    interestedIn: enquiry.interest,
    message: enquiry.message,
    consent: enquiry.consent,
  });
  return result.ok ? { ok: true } : failure(result.detail);
}
