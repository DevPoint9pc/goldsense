export { organisationTypes } from "./contact";

export const countryCodes = [
  { value: "+91", label: "+91", country: "India" },
  { value: "+971", label: "+971", country: "United Arab Emirates" },
  { value: "+65", label: "+65", country: "Singapore" },
  { value: "+44", label: "+44", country: "United Kingdom" },
  { value: "+1", label: "+1", country: "United States / Canada" },
];

export const designations = [
  "Owner / Proprietor",
  "Partner",
  "Director",
  "Manager",
  "Purchase / Procurement",
  "Other",
];

export const businessNatures = [
  "Jewellery retail",
  "Jewellery manufacturing",
  "Bullion trading",
  "Gold loans / lending",
  "Assaying & hallmarking",
  "Other",
];

export const associations = ["GJEPC", "GJC", "IBJA", "Other", "None"];

export const unitOptions = ["1", "2", "3", "4", "5", "6–10", "11–25", "More than 25"];

export const OTP_LENGTH = 6;
export const OTP_RESEND_SECONDS = 25;

export const possibleSubmissionIssues = [
  "Poor or interrupted internet connection",
  "Request timed out",
  "Temporary server issue",
  "Session expired",
  "Too many submission attempts",
];
