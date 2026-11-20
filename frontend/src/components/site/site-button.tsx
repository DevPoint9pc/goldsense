import { cn } from "@/lib/utils";
import { siteButtonVariants, type Variants } from "./site-button-variants";

export function SiteButton({
  className,
  variant,
  size,
  type = "button",
  ...props
}: React.ComponentProps<"button"> & Variants) {
  return <button type={type} className={cn(siteButtonVariants({ variant, size }), className)} {...props} />;
}
