"use client";

import { FaFacebookSquare, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const networks = [
  { label: "Share on X", Icon: FaXTwitter, href: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
  { label: "Share on LinkedIn", Icon: FaLinkedin, href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
  { label: "Share on WhatsApp", Icon: FaWhatsapp, href: (url: string, title: string) => `https://wa.me/?text=${title}%20${url}` },
  { label: "Share on Facebook", Icon: FaFacebookSquare, href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}` },
];

export function BlogShareLinks({ title }: { title: string }) {
  const share = (build: (url: string, title: string) => string) => {
    const url = encodeURIComponent(window.location.href);
    window.open(build(url, encodeURIComponent(title)), "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <p className="text-xs leading-4 text-gs-muted">Share this blog</p>
      <ul className="mt-3 flex items-center gap-4">
        {networks.map(({ label, Icon, href }) => (
          <li key={label}>
            <button
              type="button"
              aria-label={label}
              onClick={() => share(href)}
              className="flex text-gs-ink transition-colors hover:text-gs-gold"
            >
              <Icon aria-hidden="true" className="size-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
