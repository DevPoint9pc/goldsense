const EASE_FRAMES = 18;

/** 1 inside any of the frame ranges, easing to 0 over EASE_FRAMES either side. */
function edgeWeight(index: number, ranges: [number, number][]) {
  return Math.max(
    ...ranges.map(([start, end]) => {
      const distance = index < start ? start - index : index > end ? index - end : 0;
      return Math.max(0, 1 - distance / EASE_FRAMES);
    }),
  );
}

export const storyFrames = {
  count: 348,
  fps: 30000 / 1001,
  /**
   * Frames where the video shows its top edge, so the device sits as low on screen as it can
   * while the video still fills it (leaving room for the heading above). Eases off either side.
   */
  topAlignWeight: (index: number) =>
    edgeWeight(index, [
      [132, 227],
      [290, 302],
    ]),
};

/** Copy shared by the desktop scroll story and the mobile layout. */
export const storyCopy = {
  touchstone: {
    body: 'Gold is rubbed against a touchstone, leaving a streak of the metal on its surface. This process scrapes the gold. Nitric acid is then applied to the streak to assess the reaction.',
    closing: 'Repeated testing means repeated gold loss, adding up over time.',
  },
  xrf: {
    subtitle: 'A modern way to test gold',
    notes: [
      'Readings are limited to 20 microns (0.02 mm), thinner than a strand of hair, and may not reveal variations beneath the surface.',
      'It takes around 30 minutes to warm up and requires recalibration before each test.',
    ],
    closing: 'The testing still stops at the surface but with a machine',
  },
  beyond: {
    body: 'Since surface-level testing reaches only 20 microns (0.02 mm), it may not reveal plating, hollow sections, soldered areas, or composite-metal construction beneath the surface.',
    note: 'The limitations are clear. It is time to look beyond the surface',
  },
  deeper: {
    caption: 'Up to 14,000 microns (14 mm) of assessment',
    note: '7,000 microns (7 mm) from each side',
    closing: 'This assesses gold purity across multiple layers, from surface to sub-surface',
  },
  goldsense: {
    tagline: 'The 1st Karat Check of Gold',
    body: 'A first-of-its-kind portable, AI-powered scientific digital karatometer designed to take gold verification beyond the surface. It delivers fast, instant digital reports to your smartphone that you can save and share.',
  },
};

/** Images for the phone layout, where the scroll animation is replaced by stacked sections. */
export const mobileImages = {
  hero: { src: '/assets/home/mobile/hero.webp', width: 841, height: 1870 },
  touchstone: { src: '/assets/home/mobile/touchstone.webp', width: 841, height: 782 },
  xrf: { src: '/assets/home/mobile/xrf.webp', width: 824, height: 761 },
  beyond: { src: '/assets/home/mobile/beyond.webp', width: 819, height: 199 },
  deeper: { src: '/assets/home/mobile/deeper.webp', width: 819, height: 199 },
  goldsense: { src: '/assets/home/mobile/goldsense.webp', width: 1400, height: 319 },
};

export const storyChapters = [
  {
    id: 'hero',
    label: 'Introduction',
    at: 0,
    hold: 1,
    view: { x: 0, y: 0, scale: 1, cover: 1, zoom: 1 },
    background: '#EBD7C2',
    frameTone: '#EBD7C2',
  },
  {
    id: 'touchstone',
    label: 'Touchstone',
    at: 1.9,
    hold: 1.6,
    view: { x: 0, y: -0.04, scale: 1, cover: 0, zoom: 1 },
    background: '#E1C5AA',
    frameTone: '#F0D1B3',
  },
  {
    id: 'xrf',
    label: 'XRF karatometer',
    at: 5.6,
    hold: 1.6,
    view: { x: 0, y: 0.07, scale: 1, cover: 0, zoom: 1.12 },
    background: '#E8D5BF',
    frameTone: '#E5D3BA',
  },
  {
    id: 'beyond',
    label: 'Beyond the surface',
    at: 8,
    hold: 1.3,
    view: { x: 0, y: -0.03, scale: 1.2, cover: 0, zoom: 1 },
    background: '#EBD7C2',
    frameTone: '#EEDAC1',
  },
  {
    id: 'deeper',
    label: 'Look deeper',
    at: 9.2,
    hold: 1.3,
    view: { x: 0, y: -0.04, scale: 1.2, cover: 0, zoom: 1 },
    background: '#EBD7C2',
    frameTone: '#E8D5BE',
  },
  {
    id: 'goldsense',
    label: 'GoldSense™',
    at: 11.55,
    hold: 1.2,
    view: { x: 0, y: 0, scale: 1, cover: 0, zoom: 1 },
    background: '#EBD7C2',
    frameTone: '#E7D4BD',
  },
] as const;

export type StoryChapterId = (typeof storyChapters)[number]['id'];

/**
 * Where each chapter's subject sits in the video at that chapter's frame, as fractions of the
 * frame: [left, top, right, bottom]. Measured from home-story.mp4 (including the measurement
 * brackets around the bangle). The chapter text is placed around these so it never overlaps.
 */
export const storySubjects: Partial<
  Record<StoryChapterId, readonly [number, number, number, number]>
> = {
  xrf: [0.335, 0.267, 0.662, 1],
  beyond: [0.29, 0.433, 0.742, 0.596],
  deeper: [0.285, 0.419, 0.735, 0.604],
  goldsense: [0.2, 0.385, 0.817, 0.637],
};

export const touchstoneMethods = [
  { title: 'Streak', description: 'Leaves a visible mark on the gold ornament' },
  { title: 'Scrape', description: 'Removes a small amount of gold with every test' },
  { title: 'Nitric Acid', description: 'The reaction only reveals what the streak exposes' },
];

export const xrfLimits = [
  { title: '20 MICRONS', description: 'Surface-Limited Analysis' },
  { title: 'AC + UPS + Inverter', description: 'Supporting Infrastructure' },
  { title: 'Minimum 15–20 KG', description: 'Bulky, Immobile Setup' },
  { title: 'X-RAY Fluorescence', description: 'Radiation License Required' },
  { title: 'Equipment Handling', description: 'Requires Trained Personnel' },
];

export const goldsenseHighlights = [
  { title: 'Non-destructive testing', description: 'Surface & sub-surface purity' },
  { title: 'Non-radioactive', description: 'No specialised training & No licence required' },
  { title: 'Assess up to 14 mm', description: 'Two-sided assessment: 7 mm + 7 mm' },
];
