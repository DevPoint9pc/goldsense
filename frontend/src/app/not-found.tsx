import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Button asChild variant="outline">
        <Link href="/">Go home</Link>
      </Button>
    </section>
  );
}
