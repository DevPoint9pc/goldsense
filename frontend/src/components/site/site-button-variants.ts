import { cva, type VariantProps } from "class-variance-authority";

export const siteButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-sans font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-gs-ink text-white hover:bg-gs-ink-hover",
        secondary: "bg-gs-soft text-gs-ink hover:bg-gs-line-strong",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type Variants = VariantProps<typeof siteButtonVariants>;
