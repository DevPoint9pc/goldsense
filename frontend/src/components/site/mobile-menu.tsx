'use client';

import Link from 'next/link';
import {
  BOOKING_HREF,
  contactNav,
  primaryNav,
  resourcesNav,
} from '@/data/navigation';
import { ButtonLink } from './button-link';
import { NavText } from './nav-text';
import { isActive } from './nav-utils';

export function MobileMenu({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  const links = [...primaryNav, ...resourcesNav, contactNav];
  return (
    <nav
      aria-label="Mobile"
      className="mt-2 rounded-xl border border-[#ececec] bg-white/80 p-3 backdrop-blur-xl shadow-lg shadow-gs-ink/6 lg:hidden"
    >
      <ul className="flex flex-col">
        {links.map((link) => {
          const current = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                aria-current={current ? 'page' : undefined}
                className="block rounded-lg px-3 py-3 text-base text-gs-ink hover:bg-gs-cream"
              >
                <NavText active={current}>{link.label}</NavText>
              </Link>
            </li>
          );
        })}
      </ul>
      <ButtonLink
        href={BOOKING_HREF}
        onClick={onNavigate}
        className="mt-2 w-full"
      >
        Register Now
      </ButtonLink>
    </nav>
  );
}
