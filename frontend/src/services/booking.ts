"use server";

import { randomInt } from "node:crypto";
import { appendToSheet } from "@/lib/google-sheet";
import { contactDetailsSchema, organisationDetailsSchema, requirementDetailsSchema } from "@/lib/validation";
import type { BookingRequest } from "@/lib/booking";

export type BookingResult = { ok: true; inviteCode: string } | { ok: false; detail?: string };

const bookingRequestSchema = contactDetailsSchema
  .and(organisationDetailsSchema)
  .and(requirementDetailsSchema);

const INVITE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function createInviteCode() {
  return Array.from({ length: 6 }, () => INVITE_ALPHABET[randomInt(INVITE_ALPHABET.length)]).join("");
}

function failure(detail: string): BookingResult {
  console.error(`[order] ${detail}`);
  return { ok: false, ...(process.env.NODE_ENV === "development" && { detail }) };
}

/** Saves a completed order request to the "Order Requests" tab and returns its invite code. */
export async function submitBookingRequest(values: BookingRequest): Promise<BookingResult> {
  const parsed = bookingRequestSchema.safeParse(values);
  if (!parsed.success) {
    return failure(`Order failed server validation: ${parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")}`);
  }

  const inviteCode = createInviteCode();
  const result = await appendToSheet("order", { ...parsed.data, inviteCode });
  return result.ok ? { ok: true, inviteCode } : failure(result.detail);
}
