'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll';
import { LuMenu, LuX } from 'react-icons/lu';
import {
  BOOKING_HREF,
  HOME_HREF,
  contactNav,
  primaryNav,
} from '@/data/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { ButtonLink } from './button-link';
import { MobileMenu } from './mobile-menu';
import { NavText } from './nav-text';
import { isActive } from './nav-utils';
import { ResourcesMenu } from './resources-menu';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const scrolledAway = useHideOnScroll();
  const hidden = scrolledAway && !mobileOpen && !focusWithin;

  return (
    <header
      onFocus={(event) =>
        setFocusWithin(event.target.matches(':focus-visible'))
      }
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setFocusWithin(false);
      }}
      className={cn(
        'sticky top-0 z-40 px-4 pt-3 transition-transform duration-300 ease-out motion-reduce:transition-none',
        hidden && '-translate-y-full',
      )}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center rounded-xl border border-[#f1ece7] bg-white/80 backdrop-blur-xl p-1 pl-4">
          <Link
            href={HOME_HREF}
            aria-label="GoldSense™ home"
            className="shrink-0 text-2xl"
          >
            <Logo priority className="w-28 md:w-40" />
          </Link>

          <nav
            aria-label="Main"
            className="ml-18 hidden items-center gap-6 lg:flex"
          >
            {primaryNav.map((link) => {
              const current = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? 'page' : undefined}
                  className="text-base text-gs-body transition-colors hover:text-gs-ink"
                >
                  <NavText active={current}>{link.label}</NavText>
                </Link>
              );
            })}
            <ResourcesMenu pathname={pathname} />
          </nav>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <Link
              href={contactNav.href}
              aria-current={
                isActive(pathname, contactNav.href) ? 'page' : undefined
              }
              className="text-base text-gs-body transition-colors hover:text-gs-ink"
            >
              <NavText active={isActive(pathname, contactNav.href)}>
                {contactNav.label}
              </NavText>
            </Link>
            <ButtonLink href={BOOKING_HREF} className="w-fit rounded-xl">
              Register Now
            </ButtonLink>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex size-10 items-center justify-center rounded-lg text-gs-ink lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? (
              <LuX className="size-5" />
            ) : (
              <LuMenu className="size-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <MobileMenu
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
