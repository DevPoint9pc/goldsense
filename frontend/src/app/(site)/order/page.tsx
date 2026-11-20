import type { Metadata } from "next";
import { OrderFlow } from "@/components/order/order-flow";
import { GlowHero } from "@/components/site/glow-hero";

export const metadata: Metadata = {
  title: "Get your GoldSense™ invite",
  description:
    "Register to receive your GoldSense™ invite code and get access to the next stage of the booking process.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <GlowHero
      title="Get your GoldSense™ invite"
      description="Register now to receive your invite code and get access to the next stage of the booking process."
    >
      <OrderFlow />
    </GlowHero>
  );
}
