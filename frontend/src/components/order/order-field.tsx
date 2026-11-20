import { FormField, fieldSkin } from "@/components/forms/form-field";
import { cn } from "@/lib/utils";

export const orderFieldClass = cn(fieldSkin, "h-12 text-sm md:text-sm");

export function OrderField(props: Omit<React.ComponentProps<typeof FormField>, "labelClassName">) {
  return <FormField {...props} labelClassName="text-sm" />;
}
