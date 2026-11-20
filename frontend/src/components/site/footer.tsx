import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { HOME_HREF, footerColumns, socialLinks } from '@/data/navigation';
import { Logo } from './logo';
import { FooterItem } from './footer-item';

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
};

export default function Footer() {
  return (
    <footer className="bg-white pb-16 pt-20 md:pb-22">
      <div className="container-footer">
        <div className="flex flex-col items-center text-center">
          <Link href={HOME_HREF} aria-label="GoldSense™ home">
            <Logo className="w-42" />
          </Link>
          <p className="mt-5 text-sm md:text-base leading-5 text-gs-ink">
            The 1st Karat Check of Gold. An AI digital karatometer by IGM -
            India Gold Metaverse.
          </p>
          <Image
            src="/assets/brand/igm-logo-tagline.png"
            alt="IGM - India Gold Metaverse, Gold is Technology"
            width={193}
            height={96}
            className="mt-6 h-auto w-25"
          />
        </div>

        <div className="mt-20 grid grid-cols-[1fr_auto] gap-x-6 gap-y-10 md:mt-28 md:grid-cols-4 md:gap-x-0">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="font-sans text-sm uppercase leading-4 tracking-normal text-[#6b6b6b]">
                {column.title}
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterItem
                      link={link}
                      className="text-sm leading-5 wrap-anywhere text-black"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start gap-6 md:mt-30 md:grid md:grid-cols-[1fr_auto] md:items-center">
          <ul className="flex items-center gap-5">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.network];
              const icon = (
                <Icon aria-hidden="true" className="size-5 text-[#1a1a1a]" />
              );
              return (
                <li key={social.network}>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {icon}
                    </a>
                  ) : (
                    <span role="img" aria-label={social.label}>
                      {icon}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="text-sm  uppercase text-[#6b6b6b] md:text-right">
            © 2026 IGM · India Gold Metaverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
