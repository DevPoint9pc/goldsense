import Link from "next/link";
import { type FooterLink } from "@/data/navigation";

export function FooterItem({ link, className }: { link: FooterLink; className: string }) {
  if (!link.href) return <span className={className}>{link.label}</span>;
  const external = link.href.startsWith("http");
  return (
    <Link
      href={link.href}
      className={`${className} transition-colors hover:text-gs-gold`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
    </Link>
  );
}
