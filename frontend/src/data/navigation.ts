import type { NavGroupItem, NavLink } from '@/types/content';

export const HOME_HREF = '/';
export const BOOKING_HREF = '/order';

export const primaryNav: NavLink[] = [
  { label: 'Product', href: '/product' },
  { label: 'About Us', href: '/about' },
];

export const resourcesNav: NavGroupItem[] = [
  {
    label: 'Blogs',
    href: '/blogs',
    description: 'Insights shaping the future of gold',
    icon: 'blogs',
  },
  {
    label: 'Events',
    href: '/events',
    description: 'Moments from the GoldSense™ journey',
    icon: 'events',
  },
  {
    label: 'Media',
    href: '/media',
    description: 'GoldSense™ in news and conversations',
    icon: 'media',
  },
];

export const contactNav: NavLink = { label: 'Contact Us', href: '/contact-us' };

export interface FooterLink {
  label: string;
  href: string | null;
}

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Product', href: '/product' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blogs', href: '/blogs' },
      { label: 'In the news', href: '/media' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-and-conditions' },
      { label: 'Track Order', href: null },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '+91 73040 31000', href: 'tel:+917304031000' },
      {
        label: 'goldsense@igmindia.com',
        href: 'mailto:goldsense@igmindia.com',
      },
      { label: 'igmindia.com', href: 'https://igmindia.com' },
    ],
  },
];

export const socialLinks: {
  label: string;
  network: 'facebook' | 'instagram' | 'x' | 'linkedin' | 'youtube';
  href: string | null;
}[] = [
  {
    label: 'Facebook',
    network: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=61593426105328',
  },
  {
    label: 'Instagram',
    network: 'instagram',
    href: 'https://www.instagram.com/goldsense_official/',
  },
  { label: 'X', network: 'x', href: 'https://x.com/goldsense_' },
  {
    label: 'LinkedIn',
    network: 'linkedin',
    href: 'https://www.linkedin.com/company/goldsense/',
  },
  {
    label: 'YouTube',
    network: 'youtube',
    href: 'https://www.youtube.com/@GoldSenseofficial/',
  },
];
