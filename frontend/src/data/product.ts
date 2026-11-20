export const unitsAvailableLabel = '8,950 / 10,000 units available';

export const productGallery = [
  {
    src: '/assets/product/product-gallery-device-on-stand-with-probe.webp',
    alt: 'GoldSense™ device propped on a white stand with its probe and cable',
  },
  {
    src: '/assets/product/product-gallery-device-top-view-desk.webp',
    alt: 'GoldSense™ device and probe seen from above on a wooden desk',
  },
  {
    src: '/assets/product/product-gallery-device-front.webp',
    alt: 'Front of the GoldSense™ device showing its metal testing plate',
  },
  {
    src: '/assets/product/product-gallery-device-back.webp',
    alt: 'Copper back panel of the GoldSense™ device marked IGM Patented and Proprietary Product',
  },
  {
    src: '/assets/product/product-gallery-device-on-stone-surface.webp',
    alt: 'GoldSense™ device with its probe and 3.5 mm cable on a stone surface',
  },
];

export const productHighlights = [
  { icon: 'depth', title: '7 mm', description: 'Reads 7 mm per side' },
  {
    icon: 'non-destructive',
    title: 'Non-destructive',
    description: 'No rubbing, filing or cutting',
  },
  {
    icon: 'radiation-free',
    title: 'Radiation-free',
    description: 'No X-ray radiation',
  },
  {
    icon: 'ai',
    title: 'AI-powered',
    description: 'Intelligent article recognition',
  },
  {
    icon: 'reports',
    title: 'Digital reports',
    description: 'Save and share results',
  },
] as const;

export const deviceComponents = [
  {
    title: 'GoldSense™ Device',
    description: 'The core unit for placing and assessing the gold article.',
    image: '/assets/features/feature-1-device.webp',
  },
  {
    title: 'Metal Plate',
    description: 'Provides the testing surface for the gold article.',
    image: '/assets/features/feature-2-metal-plate.webp',
  },
  {
    title: 'AUX Port',
    description: 'Connects the probe cable to the device.',
    image: '/assets/features/feature-3-aux-port.webp',
  },
  {
    title: 'Probe Cable',
    description: 'Connects the probe to the GoldSense™ device.',
    image: '/assets/features/feature-4-probe-cable.webp',
  },
  {
    title: 'Probe A',
    description: 'Assesses the surface of the gold article.',
    image: '/assets/features/feature-5-probe-a.webp',
  },
  {
    title: 'Probe B',
    description: 'Assesses material beneath the surface.',
    image: '/assets/features/feature-6-probe-b.webp',
  },
  {
    title: 'GoldSense™ App',
    description:
      'Recognises the article, guides the assessment and displays purity and measurement details.',
    image: '/assets/features/feature-7-app.webp',
  },
  {
    title: 'Bluetooth Connectivity',
    description: 'Connects the GoldSense™ device to the smartphone app.',
    image: '/assets/features/feature-8-bluetooth-connectivity.webp',
  },
  {
    title: 'AI Recognition',
    description: 'AI-powered article recognition within the GoldSense™ app.',
    image: '/assets/features/feature-9-ai-recognition.webp',
  },
];

export const probeAssessments = [
  {
    probe: 'Probe A',
    title: 'Surface Assessment',
    description: 'Assesses the gold at the surface level.',
    image: {
      src: '/assets/product/product-probe-surface-assessment.png',
      alt: 'Probe A assessing the surface layer of a gold band',
    },
  },
  {
    probe: 'Probe B',
    title: 'Depth Assessment',
    description: 'Assesses the gold beneath the surface.',
    image: {
      src: '/assets/product/product-probe-depth-assessment.png',
      alt: 'Probe B assessing the material beneath the surface of a gold band',
    },
  },
];

export const comparisonRows = [
  {
    label: 'Assessment depth',
    goldsense: 'Up to 7 mm per side, up to 14 mm composite material',
    xrf: 'Surface-level analysis',
  },
  {
    label: 'Assessment',
    goldsense: 'Surface + depth',
    xrf: 'X-ray fluorescence',
  },
  {
    label: 'Radiation',
    goldsense: 'Radiation-free',
    xrf: 'Uses an X-ray radiation source',
  },
  {
    label: 'Portability',
    goldsense: 'Compact and portable',
    xrf: 'Typically bulky, bench-mounted',
  },
  {
    label: 'Connectivity',
    goldsense: 'Smartphone connected',
    xrf: 'Integrated machine interface',
  },
  {
    label: 'Digital reports',
    goldsense: 'Save and share digitally',
    xrf: 'Machine-dependent',
  },
  {
    label: 'On-site verification',
    goldsense: 'Designed for point-of-assessment testing',
    xrf: 'Typically operated from a dedicated testing area',
  },
];

export const workflowSteps = [
  {
    title: 'Get Ready',
    description:
      'Connect the probe securely, switch on GoldSense™, and pair the device with the GoldSense™ app via Bluetooth to begin the assessment.',
  },
  {
    title: 'Identify',
    description:
      'Place the gold article securely on the metal plate and capture its image. AI recognises the article and guides you through the assessment process.',
  },
  {
    title: 'Assess',
    description:
      'Use Probe A for surface assessment and Probe B for deeper assessment. Maintain steady, complete contact at both points until the reading is captured.',
  },
  {
    title: 'Get Results',
    description:
      'Once the assessment is complete, GoldSense™ analyses the sample and displays purity and measurement details directly on your connected smartphone.',
  },
  {
    title: 'Report',
    description:
      'Name the assessment, then save the digital report for future reference or share it instantly with relevant stakeholders through your preferred channel.',
  },
];

export const reportFeatures = [
  {
    icon: 'test-id',
    title: 'Test ID & Timestamp',
    description: 'Every assessment is recorded with a unique test ID and date.',
  },
  {
    icon: 'surface-purity',
    title: 'Surface Purity',
    description:
      'View the measured karat value and verified purity percentage at the surface.',
  },
  {
    icon: 'overall-purity',
    title: 'Overall Purity',
    description:
      'See the overall karat value and verified purity percentage from the assessment.',
  },
  {
    icon: 'share',
    title: 'Shareable Report',
    description: 'Share the certificate instantly via WhatsApp, email or PDF.',
  },
] as const;

export const reservationSteps = [
  {
    title: 'Register',
    description:
      'Share your email, mobile number and basic details to begin your booking process.',
  },
  {
    title: 'Get Invite Code',
    description:
      'Receive your invite code after verification to proceed with your booking.',
  },
  {
    title: 'Confirm',
    description:
      'Arrange the 25% advance with our team to confirm your allocation.',
  },
  {
    title: 'Delivery',
    description:
      'Your confirmed booking enters the dispatch queue for insured delivery.',
  },
];

export const howItWorksVideo = {
  url: 'https://vimeo.com/1242790609',
  title: 'GoldSense Demo English',
};

export const comparisonPdfPath =
  '/uploads/Comparison_between_Gold_Sense_and_XRF_Karatometer_3d9298e202.pdf';
