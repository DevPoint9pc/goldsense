import { z } from "zod";
import { interestOptions, organisationTypes as contactOrganisationTypes } from "@/data/contact";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const INDIAN_MOBILE_PATTERN = /^[6-9][0-9]{9}$/;
export const PHONE_PATTERN = /^[0-9]{6,14}$/;
export const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
export const GST_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
export const PIN_CODE_PATTERN = /^[1-9][0-9]{5}$/;

const required = (message: string) => z.string().trim().min(1, message);

const email = required("Please enter your email address.").regex(EMAIL_PATTERN, "Please enter a valid email address.");

const choice = (options: readonly string[], message: string) =>
  z.string().refine((value) => options.includes(value), message);

const accepted = (message: string) => z.boolean().refine((value) => value, message);

/** +91 numbers must be a 10-digit Indian mobile; other country codes take 6–14 digits. */
function checkPhone({ countryCode, phone }: { countryCode: string; phone: string }, ctx: z.RefinementCtx) {
  if (!phone) return;
  const india = countryCode === "+91";
  if (!(india ? INDIAN_MOBILE_PATTERN : PHONE_PATTERN).test(phone)) {
    ctx.addIssue({
      code: "custom",
      path: ["phone"],
      message: india ? "Please enter a valid 10-digit mobile number." : "Please enter a valid mobile number (6–14 digits).",
    });
  }
}

/* Contact us */

export const contactEnquirySchema = z
  .object({
  fullName: required("Please enter your full name.")
    .min(2, "Name must be at least 2 characters.")
    .max(200, "Name must be 200 characters or fewer."),
  email,
  countryCode: required("Please select a country code."),
  phone: required("Please enter your mobile number."),
  organisation: required("Please enter your organisation name.").max(200, "Must be 200 characters or fewer."),
  organisationType: choice(contactOrganisationTypes, "Please select an organisation type."),
  interest: choice(interestOptions, "Please select what you're interested in."),
  message: required("Please tell us how we can help.")
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
  consent: z.boolean(),
  })
  .superRefine(checkPhone);

export type ContactEnquiry = z.infer<typeof contactEnquirySchema>;

/* Order: step 1 */

export const contactDetailsSchema = z
  .object({
    email,
    countryCode: required("Please select a country code."),
    phone: required("Please enter your mobile number."),
    acceptsUpdates: z.boolean(),
    acceptsTerms: accepted("Please accept the Terms & Conditions to continue."),
  })
  .superRefine(checkPhone);

export type ContactDetails = z.infer<typeof contactDetailsSchema>;

/* Order: step 2 */

export const organisationDetailsSchema = z.object({
  fullName: required("Please enter your full name.").min(2, "Name must be at least 2 characters."),
  designation: required("Please select your designation."),
  gstNumber: z
    .string()
    .trim()
    .refine((value) => !value || GST_PATTERN.test(value), "Please enter a valid 15-character GST number."),
  organisationName: required("Please enter your organisation name."),
  organisationType: required("Please select an organisation type."),
  panNumber: required("Please enter the company PAN number.").regex(
    PAN_PATTERN,
    "Please enter a valid PAN (e.g. ABCDE1234F).",
  ),
  city: required("Please enter your city or district."),
  pinCode: required("Please enter your PIN code.").regex(PIN_CODE_PATTERN, "Please enter a valid 6-digit PIN code."),
});

export type OrganisationDetails = z.infer<typeof organisationDetailsSchema>;

/* Order: step 3 */

export const requirementDetailsSchema = z.object({
  natureOfBusiness: required("Please select the nature of your business."),
  storeCount: required("Please enter the number of stores or branches.").regex(
    /^[1-9][0-9]*$/,
    "Please enter a whole number of 1 or more.",
  ),
  currentTestingMethod: required("Please tell us how you test gold today."),
  association: required("Please select an association."),
  membershipNumber: required("Please enter your membership number."),
  unitsRequired: required("Please select the number of units."),
  message: z.string().trim().max(5000, "Message must be 5000 characters or fewer."),
});

export type RequirementDetails = z.infer<typeof requirementDetailsSchema>;
