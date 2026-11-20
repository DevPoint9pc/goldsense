import type { ContactDetails, OrganisationDetails, RequirementDetails } from "@/lib/validation";

export type { ContactDetails, OrganisationDetails, RequirementDetails };

export type BookingRequest = ContactDetails & OrganisationDetails & RequirementDetails;

export interface BookingConfirmation {
  inviteCode: string;
}

type PhoneNumber = Pick<ContactDetails, "countryCode" | "phone">;

export const sendOtp: (phone: PhoneNumber) => Promise<void> = async () => {};

export const verifyOtp: (phone: PhoneNumber, code: string) => Promise<boolean> = async (_phone, code) =>
  /^\d{6}$/.test(code);

export const fetchCompanyName: (gstNumber: string) => Promise<string | null> = async () => null;
