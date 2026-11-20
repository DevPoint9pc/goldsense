import type { FaqCategory, FaqItem } from '@/types/content';

export const faqCategories: { value: FaqCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'product', label: 'Product' },
  { value: 'testing-accuracy', label: 'Testing & Accuracy' },
  { value: 'device-setup', label: 'Device & Setup' },
  { value: 'app-reports', label: 'App & Reports' },
  { value: 'booking-pricing', label: 'Booking & Pricing' },
  { value: 'support', label: 'Support' },
];

export const faqs: FaqItem[] = [
  {
    id: 'what-is-goldsense',
    question: 'What is GoldSense™?',
    answer:
      "GoldSense™ is IGM's AI Digital Karatometer - a handheld, non-destructive gold purity tester that probes 7 mm deep (14 mm across both sides) and turns every reading into an AI-certified digital purity report, shareable on WhatsApp and email.",
    category: 'product',
  },
  {
    id: 'test-without-melting',
    question: 'How does GoldSense™ test gold without melting or scraping it?',
    answer:
      'GoldSense™ uses AI-powered technology to assess gold purity without melting, scraping or damaging the gold article, providing a digital purity report.',
    category: 'testing-accuracy',
  },
  {
    id: 'detect-plated-fake',
    question: 'Can GoldSense™ detect gold-plated or fake jewellery?',
    answer:
      'GoldSense™ assesses surface and sub-surface composition to help identify gold plating, hollow structures, soldering and composite metals.',
    category: 'testing-accuracy',
  },
  {
    id: 'is-it-safe',
    question: 'Is GoldSense™ safe? Does it emit radiation?',
    answer:
      'GoldSense™ uses non-destructive testing technology without a radiation source, making it suitable for everyday use across jewellery stores and testing centres.',
    category: 'product',
  },
  {
    id: 'vs-xrf',
    question: 'GoldSense™ vs an XRF karatometer: which is better?',
    answer:
      'GoldSense™ is a portable device that weighs approximately 500 g and assesses up to 14 mm of composite depth through two assessments of 7 mm + 7 mm each, unlike conventional XRF devices that primarily test the surface.',
    category: 'testing-accuracy',
  },
  {
    id: 'vs-touchstone',
    question: 'How is GoldSense™ different from touchstone testing?',
    answer:
      'Unlike touchstone testing, which relies on surface-level assessment, GoldSense™ uses AI-powered technology to analyse surface and sub-surface composition without damaging the gold article.',
    category: 'testing-accuracy',
  },
  {
    id: 'how-does-it-work',
    question: 'How does GoldSense™ work?',
    answer:
      'GoldSense™ combines specialised probes and AI-powered analysis to assess gold composition at different depths and generate a digital purity report through its connected app.',
    category: 'product',
  },
  {
    id: 'is-non-destructive',
    question: 'Is GoldSense™ non-destructive?',
    answer:
      'Yes, GoldSense™ is non-destructive. It assesses gold purity without melting, scraping or damaging the jewellery or gold article being tested.',
    category: 'testing-accuracy',
  },
  {
    id: 'what-it-measures',
    question: 'What does GoldSense™ measure?',
    answer:
      'GoldSense™ assesses gold purity and composition, including surface and sub-surface variations that may indicate plating, soldering, hollow structures or composite metals.',
    category: 'app-reports',
  },
  {
    id: 'beneath-surface',
    question: 'Can GoldSense™ detect what lies beneath the surface?',
    answer:
      'Yes, GoldSense™ assesses up to 14 mm of composite depth through two assessments of 7 mm each, helping identify variations beneath the surface.',
    category: 'testing-accuracy',
  },
  {
    id: 'whats-included',
    question: 'What comes with GoldSense™?',
    answer:
      'The GoldSense™ kit includes the device, sleeve, probe cable, Probe A, Probe B and a USB-C cable for setup and operation.',
    category: 'device-setup',
  },
  {
    id: 'requires-smartphone',
    question: 'Does GoldSense™ require a smartphone?',
    answer:
      'Yes, GoldSense™ connects to a smartphone through its app and Bluetooth, enabling users to conduct assessments and save, share and access digital purity reports.',
    category: 'device-setup',
  },
  {
    id: 'requires-infrastructure',
    question: 'Does GoldSense™ require specialised infrastructure?',
    answer:
      'No, GoldSense™ is designed for use across jewellery stores, banks, NBFCs and gold-loan counters without specialised infrastructure or climate-controlled conditions.',
    category: 'device-setup',
  },
];

export const featuredFaqs = faqs.slice(0, 6);
