import { cn } from "@/lib/utils";
import { FormField, fieldSkin } from "@/components/forms/form-field";

export const contactFieldClass = cn(fieldSkin, "text-sm md:text-sm");

export function ContactField(props: Omit<React.ComponentProps<typeof FormField>, "labelClassName">) {
  return <FormField {...props} labelClassName="mb-3 text-sm" />;
}
