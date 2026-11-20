import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteButtonVariants, type Variants } from "./site-button-variants";

export function ButtonLink({
  href,
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Link> & Variants) {
  return <Link href={href} className={cn(siteButtonVariants({ variant, size }), className)} {...props} />;
}
