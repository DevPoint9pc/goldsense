'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { BOOKING_HREF } from '@/data/navigation';
import {
  goldsenseHighlights,
  storyChapters,
  storyCopy,
  storyFrames,
  storySubjects,
  touchstoneMethods,
  xrfLimits,
  type StoryChapterId,
} from '@/data/home';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const VIEWPORTS_PER_SECOND = 0.75;
/** The story video: 1920×1080, every frame a keyframe so any scroll position seeks instantly. */
const VIDEO_SRC = '/assets/home/home-story.mp4';
const VIDEO_W = 1920;
const VIDEO_H = 1080;
/** The video's first frame, shown until the video can seek. */
const VIDEO_POSTER = '/assets/home/home-story-poster.webp';

const plan = (() => {
  let cursor = 0;
  return storyChapters.map((chapter, index) => {
    const previous = storyChapters[index - 1];
    const play = previous ? Math.max(1.2, (chapter.at - previous.at) * 0.9) : 0;
    const playStart = cursor;
    const shownAt = playStart + play;
    cursor = shownAt + chapter.hold;
    return { ...chapter, play, playStart, shownAt };
  });
})();

const hexToRgb = (hex: string) =>
  [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16));

const lookFor = (chapter: (typeof storyChapters)[number]) => {
  const [bgR, bgG, bgB] = hexToRgb(chapter.background);
  const [toneR, toneG, toneB] = hexToRgb(chapter.frameTone);
  return {
    ...chapter.view,
    mulR: Math.min(1, bgR / toneR),
    mulG: Math.min(1, bgG / toneG),
    mulB: Math.min(1, bgB / toneB),
    addR: Math.max(0, bgR - toneR),
    addG: Math.max(0, bgG - toneG),
    addB: Math.max(0, bgB - toneB),
  };
};

const TOTAL = plan[plan.length - 1].shownAt + plan[plan.length - 1].hold;

const toFrame = (seconds: number) =>
  Math.min(storyFrames.count - 1, Math.round(seconds * storyFrames.fps));

/** The scroll story runs on landscape tablets and up; phones and portrait tablets get MobileStory. */
const STORY_MEDIA = '(min-width: 768px) and (orientation: landscape)';
/** The stage overhangs the screen by this much on every side. */
const STAGE_BLEED = 16;

type View = { x: number; y: number; scale: number; cover: number; zoom: number };

/**
 * Where the video sits on a stage of cw×ch for a chapter view and frame. The video always covers
 * the stage, so no edge or strip of background ever shows.
 */
function layoutVideo(cw: number, ch: number, view: View, index: number) {
  const fitWidth = cw / VIDEO_W;
  const coverScale = Math.max(fitWidth, ch / VIDEO_H);
  const coverBoost = coverScale / fitWidth;
  const designed = fitWidth * view.scale * (1 + (coverBoost - 1) * view.cover);
  // `zoom` enlarges past the cover size (XRF: the device sits lower under its heading).
  const scale = Math.max(designed, coverScale) * view.zoom;
  const w = VIDEO_W * scale;
  const h = VIDEO_H * scale;
  let x = (cw - w) / 2 + view.x * w;
  let y = (ch - h) / 2 + view.y * h;
  // Top-aligned frames crop from the bottom, keeping the device low under the heading.
  y -= y * storyFrames.topAlignWeight(index);
  x = Math.min(0, Math.max(cw - w, x));
  y = Math.min(0, Math.max(ch - h, y));
  return { x, y, w, h, scale };
}

export function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const placeholderRef = useRef<HTMLImageElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const goToChapterRef = useRef<((index: number) => void) | null>(null);
  // Phones get the static MobileStory instead, so skip loading frames there.
  const isDesktop = useMediaQuery(STORY_MEDIA);

  useGSAP(
    () => {
      if (!isDesktop) return;
      const stage = stageRef.current;
      const video = videoRef.current;
      if (!stage || !video) return;

      // Scrolling seeks the video. Seeks are chained: while one is in flight only the latest
      // requested time is kept, so a fast scroll never queues up a backlog of stale seeks.
      const state = { frame: 0, ...lookFor(storyChapters[0]) };
      let drawnKey = '';
      let tint = '';
      let lift = '';
      let pendingTime: number | null = null;
      let ready = false;
      let cancelled = false;
      let objectUrl = '';

      const seek = (time: number) => {
        if (!ready) return;
        if (video.seeking) {
          pendingTime = time;
          return;
        }
        if (Math.abs(video.currentTime - time) > 0.001)
          video.currentTime = time;
      };
      const onSeeked = () => {
        if (pendingTime === null) return;
        const time = pendingTime;
        pendingTime = null;
        seek(time);
      };
      video.addEventListener('seeked', onSeeked);

      const paint = (force = false) => {
        const index = Math.round(state.frame);
        // Aim for the middle of the frame so rounding never lands on its neighbour.
        seek((index + 0.5) / storyFrames.fps);

        const key = [
          index,
          state.x * 1000,
          state.y * 1000,
          state.scale * 1000,
          state.zoom * 1000,
          state.cover * 1000,
        ]
          .map(Math.round)
          .join('|');
        if (key !== drawnKey || force) {
          drawnKey = key;
          const { x, y, scale } = layoutVideo(stage.clientWidth, stage.clientHeight, state, index);
          // A GPU transform only: the video is never resized or re-laid out while scrolling.
          video.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }

        const nextTint = `rgb(${Math.round(state.mulR * 255)} ${Math.round(state.mulG * 255)} ${Math.round(state.mulB * 255)})`;
        if (nextTint !== tint && tintRef.current) {
          tintRef.current.style.backgroundColor = nextTint;
          tint = nextTint;
        }
        const nextLift = `rgb(${Math.round(state.addR)} ${Math.round(state.addG)} ${Math.round(state.addB)})`;
        if (nextLift !== lift && liftRef.current) {
          liftRef.current.style.backgroundColor = nextLift;
          lift = nextLift;
        }
      };

      // Text groups are placed around each chapter's subject (device, bangle) as it lands on this
      // screen: `above` groups end a gap above it, `below` groups start a gap below it, and `left` /
      // `right` columns stay clear of its sides. A group that cannot fit shrinks instead of overlapping.
      const placeText = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const u = Math.min(vw / 1440, vh / 900);
        const boxW = 1440 * u;
        const boxH = 900 * u;
        const boxLeft = (vw - boxW) / 2;
        const boxTop = (vh - boxH) / 2;
        const navClear = 84 - boxTop;
        const floor = vh - 20 - boxTop;
        const margin = 40;
        for (const chapter of storyChapters) {
          const subject = storySubjects[chapter.id];
          const element = root.current?.querySelector<HTMLElement>(
            `[data-chapter="${chapter.id}"]`,
          );
          if (!subject || !element) continue;
          const v = layoutVideo(
            stage.clientWidth,
            stage.clientHeight,
            chapter.view,
            toFrame(chapter.at),
          );
          const [l, t, r, b] = subject;
          const offsetX = STAGE_BLEED + boxLeft;
          const offsetY = STAGE_BLEED + boxTop;
          const box = {
            left: v.x + l * v.w - offsetX,
            top: v.y + t * v.h - offsetY,
            right: v.x + r * v.w - offsetX,
            bottom: v.y + b * v.h - offsetY,
          };
          element.querySelectorAll<HTMLElement>('[data-place]').forEach((group) => {
            group.style.scale = '';
            group.style.left = '';
            const gap = Number(group.dataset.gap ?? 24) * u;
            const height = group.offsetHeight;
            const width = group.offsetWidth;
            let fit = 1;
            switch (group.dataset.place) {
              case 'above': {
                const edge = box.top - gap;
                fit = (edge - navClear) / height;
                group.style.top = 'auto';
                group.style.bottom = `${boxH - edge}px`;
                group.style.transformOrigin = 'center bottom';
                break;
              }
              case 'below': {
                const edge = box.bottom + gap;
                fit = (floor - edge) / height;
                group.style.top = `${edge}px`;
                group.style.bottom = 'auto';
                group.style.transformOrigin = 'center top';
                break;
              }
              case 'left': {
                // Slide outwards (into any side margin on wide screens), then shrink if still needed.
                const end = box.left - gap;
                const start = Math.max(
                  margin - boxLeft,
                  Math.min(group.offsetLeft, end - width),
                );
                fit = (end - start) / width;
                group.style.left = `${start}px`;
                group.style.transformOrigin = 'left top';
                break;
              }
              case 'right': {
                const start = Math.max(group.offsetLeft, box.right + gap);
                const limit = vw - margin - boxLeft;
                const left = Math.min(start, Math.max(box.right + gap, limit - width));
                fit = (limit - left) / width;
                group.style.left = `${left}px`;
                group.style.transformOrigin = 'left top';
                break;
              }
            }
            if (fit < 1) group.style.scale = `${Math.max(0.5, fit)}`;
          });
        }
      };

      const resize = () => {
        paint(true);
        placeText();
      };
      resize();
      document.fonts?.ready.then(() => {
        if (!cancelled) placeText();
      });
      window.addEventListener('resize', resize);

      // Load the whole file up front: seeking inside a fully local video never waits on the network.
      fetch(VIDEO_SRC)
        .then((response) => response.blob())
        .then((blob) => {
          if (cancelled) return;
          objectUrl = URL.createObjectURL(blob);
          video.src = objectUrl;
          video.addEventListener(
            'loadeddata',
            () => {
              if (cancelled) return;
              ready = true;
              paint(true);
              video.addEventListener(
                'seeked',
                () => {
                  if (placeholderRef.current)
                    placeholderRef.current.style.opacity = '0';
                },
                { once: true },
              );
              // The first frame may already be showing without a seek.
              if (Math.round(state.frame) === 0 && placeholderRef.current) {
                placeholderRef.current.style.opacity = '0';
              }
            },
            { once: true },
          );
        })
        .catch(() => undefined);

      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? true
            : 0.6,
        },
        onUpdate() {
          paint();
        },
      });

      plan.forEach((chapter, index) => {
        const element = q(`[data-chapter="${chapter.id}"]`)[0];
        if (index > 0) {
          const previous = q(`[data-chapter="${plan[index - 1].id}"]`)[0];
          tl.to(
            state,
            {
              frame: toFrame(chapter.at),
              ...lookFor(chapter),
              duration: chapter.play,
            },
            chapter.playStart,
          );
          tl.to(
            previous,
            { autoAlpha: 0, y: -32, duration: 0.5, ease: 'power1.in' },
            chapter.playStart,
          );
          tl.fromTo(
            element,
            { autoAlpha: 0, y: 0 },
            { autoAlpha: 1, duration: 0.2, immediateRender: false },
            chapter.shownAt - 0.7,
          );
          tl.fromTo(
            element.querySelectorAll('[data-reveal]'),
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.07,
              ease: 'power2.out',
            },
            chapter.shownAt - 0.7,
          );
        }
        tl.addLabel(chapter.id, chapter.shownAt);
      });
      tl.set({}, {}, TOTAL);
      timelineRef.current = tl;

      // One scroll gesture = one chapter. Inside the story, a wheel flick, swipe or arrow key moves
      // to the next (or previous) chapter and plays its video and text animation through; input
      // during the move, and the trackpad momentum that trails it, is swallowed so a single flick
      // never skips a chapter. Past the last chapter the page scrolls on normally (to the FAQ).
      const trigger = tl.scrollTrigger!;
      const labels = plan.map((chapter) => chapter.shownAt);
      const lastIndex = labels.length - 1;
      const scrollFor = (time: number) =>
        Math.round(trigger.start + (trigger.end - trigger.start) * (time / tl.duration()));
      const timeNow = () =>
        ((window.scrollY - trigger.start) / (trigger.end - trigger.start)) * tl.duration();
      const inStory = () =>
        window.scrollY >= trigger.start - 2 && window.scrollY <= trigger.end + 2;

      let moving = false;
      let lastInput = 0;
      let quietTimer = 0;
      const releaseWhenQuiet = () => {
        window.clearTimeout(quietTimer);
        const wait = 220 - (performance.now() - lastInput);
        if (wait > 0) quietTimer = window.setTimeout(releaseWhenQuiet, wait);
        else moving = false;
      };

      const goToChapter = (index: number) => {
        const target = Math.max(0, Math.min(lastIndex, index));
        const from = timeNow();
        const distance = Math.abs(labels[target] - from);
        moving = true;
        // CSS smooth scrolling would fight the per-frame scroll updates of this tween.
        document.documentElement.style.scrollBehavior = 'auto';
        gsap.to(window, {
          scrollTo: { y: scrollFor(labels[target]) + 1, autoKill: false },
          // Roughly real-time video playback between chapters, kept within a comfortable range.
          duration: gsap.utils.clamp(1, 2.4, distance * 0.6),
          ease: 'power2.inOut',
          overwrite: true,
          onComplete: () => {
            document.documentElement.style.scrollBehavior = '';
            releaseWhenQuiet();
          },
        });
      };

      /** Handles one gesture; returns true when the story consumed it. */
      const step = (direction: 1 | -1) => {
        const now = timeNow();
        if (direction > 0) {
          const next = labels.findIndex((time) => time > now + 0.05);
          if (next === -1) return false; // past the last chapter: scroll on to the FAQ
          goToChapter(next);
        } else {
          let previous = -1;
          labels.forEach((time, index) => {
            if (time < now - 0.05) previous = index;
          });
          if (previous === -1) return false; // at the top of the page
          goToChapter(previous);
        }
        return true;
      };

      const onWheel = (event: WheelEvent) => {
        if (!inStory() || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
        lastInput = performance.now();
        if (moving) {
          event.preventDefault();
          return;
        }
        if (Math.abs(event.deltaY) < 4) return;
        if (step(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
      };

      let touchY: number | null = null;
      const onTouchStart = (event: TouchEvent) => {
        touchY = event.touches[0]?.clientY ?? null;
      };
      const onTouchMove = (event: TouchEvent) => {
        if (touchY === null || !inStory()) return;
        const dy = touchY - (event.touches[0]?.clientY ?? touchY);
        lastInput = performance.now();
        if (moving) {
          event.preventDefault();
          return;
        }
        if (Math.abs(dy) < 30) {
          // Hold the page still until the swipe is long enough to count, unless it leaves the story.
          const direction = dy >= 0 ? 1 : -1;
          const now = timeNow();
          const leaving =
            direction > 0 ? now >= labels[lastIndex] - 0.05 : now <= labels[0] + 0.05;
          if (!leaving) event.preventDefault();
          return;
        }
        if (step(dy > 0 ? 1 : -1)) {
          event.preventDefault();
          touchY = null;
        }
      };

      const keyDirection: Record<string, 1 | -1> = {
        ArrowDown: 1,
        PageDown: 1,
        ArrowUp: -1,
        PageUp: -1,
      };
      const onKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement | null;
        if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
        let direction = keyDirection[event.key];
        if (event.key === ' ') direction = event.shiftKey ? -1 : 1;
        if (!direction || !inStory()) return;
        if (moving || step(direction)) event.preventDefault();
      };

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reducedMotion) {
        goToChapterRef.current = goToChapter;
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('keydown', onKeyDown);
      }

      return () => {
        cancelled = true;
        window.clearTimeout(quietTimer);
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('keydown', onKeyDown);
        document.documentElement.style.scrollBehavior = '';
        goToChapterRef.current = null;
        window.removeEventListener('resize', resize);
        video.removeEventListener('seeked', onSeeked);
        video.removeAttribute('src');
        video.load();
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        timelineRef.current = null;
      };
    },
    { scope: root, dependencies: [isDesktop], revertOnUpdate: true },
  );

  const goTo = (id: StoryChapterId) => {
    const index = plan.findIndex((chapter) => chapter.id === id);
    if (goToChapterRef.current) {
      goToChapterRef.current(index);
      return;
    }
    // Reduced motion (or not set up yet): jump straight there.
    const tl = timelineRef.current;
    const trigger = tl?.scrollTrigger;
    if (!tl || !trigger) return;
    const progress = tl.labels[id] / tl.duration();
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress + 1 });
  };

  return (
    <section
      ref={root}
      aria-label="Why gold testing needs to go deeper"
      className="relative -mt-18 hidden story:block"
      style={
        {
          height: `${(TOTAL * VIEWPORTS_PER_SECOND + 1) * 100}svh`,
          '--u': 'min(calc(100vw / 1440), calc(100svh / 900))',
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-[#EBD7C2]">
        <div
          ref={stageRef}
          className="absolute -inset-4 isolate overflow-hidden"
        >
          {/* Phones never show this section, so only tablets and up fetch the first frame. */}
          <picture>
            <source media="(min-width: 768px) and (orientation: landscape)" srcSet={VIDEO_POSTER} />
            <img
              ref={placeholderRef}
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              alt=""
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover transition-opacity duration-300"
            />
          </picture>
          <video
            ref={videoRef}
            aria-hidden="true"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            width={VIDEO_W}
            height={VIDEO_H}
            className="absolute top-0 left-0 max-w-none origin-top-left will-change-transform"
            style={{ width: VIDEO_W, height: VIDEO_H }}
          />
          <div
            ref={tintRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-white mix-blend-multiply"
          />
          <div
            ref={liftRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black mix-blend-plus-lighter"
          />
        </div>

        <div className="absolute inset-0">
          <HeroChapter onNext={() => goTo('touchstone')} />
          <TouchstoneChapter />
          <XrfChapter />
          <BeyondChapter />
          <DeeperChapter />
          <GoldsenseChapter />
        </div>
      </div>
    </section>
  );
}

function Chapter({
  id,
  className,
  children,
}: {
  id: StoryChapterId;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-chapter={id}
      className={cn(
        'container-wide absolute inset-0 flex flex-col pt-24 pb-8 story:story-box story:block',
        id !== 'hero' && 'invisible opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

function FeatureItem({
  title,
  description,
  place,
  className,
}: {
  title: string;
  description: string;
  /** Keeps the item clear of the chapter subject (see placeText). */
  place?: 'left' | 'right';
  className?: string;
}) {
  return (
    <li
      data-reveal
      data-place={place}
      className={cn(
        'group border-l border-gs-ink pl-3 story:u-pl-12',
        className,
      )}
    >
      <p className="font-serif font-medium text-sm leading-5 text-gs-ink story:u-text-20 story:u-leading-28">
        {title}
      </p>
      <p className="mt-0.5 text-xs leading-4 text-gs-ink/60 transition-colors group-hover:text-gs-ink story:u-text-14 story:u-leading-16">
        {description}
      </p>
    </li>
  );
}

function HeroChapter({ onNext }: { onNext: () => void }) {
  return (
    <Chapter id="hero" className="items-center justify-between">
      <div className="story:hidden" />
      <h1 className="text-center text-5xl leading-[1.05] font-medium story:absolute story:inset-x-0 story:u-top-324 story:u-text-80 story:u-leading-80">
        Testing Gold
        <br />
        Should Not
        <br />
        Damage Gold
      </h1>
      <button
        type="button"
        onClick={onNext}
        className="flex cursor-pointer items-center gap-2 rounded-full bg-gs-ink px-4 py-2 text-xs tracking-[2px] text-white uppercase transition-colors hover:bg-gs-ink-hover story:absolute story:left-1/2 story:u-top-824 story:-translate-x-1/2"
      >
        Scroll
      </button>
    </Chapter>
  );
}

const touchstoneTops = ['story:u-top-515', 'story:u-top-623', 'story:u-top-727'];

function TouchstoneChapter() {
  return (
    <Chapter id="touchstone" className="justify-between">
      <div className="story:contents">
        <h2
          data-reveal
          className="text-2xl tracking-tighter leading-[1.2] font-medium story:absolute story:u-top-100 story:u-left-100 story:u-text-40 story:u-leading-56 story:whitespace-nowrap"
        >
          With traditional <br className="hidden story:block" />
          Touchstone testing, the <br className="hidden story:block" />
          <span className="marker-highlight">gold surface gets scraped</span>
        </h2>
        <p
          data-reveal
          className="mt-3 text-xs leading-5 text-gs-ink story:absolute story:mt-0 story:u-top-281 story:u-left-100 story:u-w-470 story:u-text-16 story:u-leading-22"
        >
          {storyCopy.touchstone.body}
        </p>
      </div>
      <div className="story:contents">
        <ul className="grid grid-cols-3 gap-3 story:contents">
          {touchstoneMethods.map((method, index) => (
            <FeatureItem
              key={method.title}
              {...method}
              className={cn('absolute u-left-100 u-w-200', touchstoneTops[index])}
            />
          ))}
        </ul>
        <p
          data-reveal
          className="hidden font-medium tracking-tighter font-serif text-gs-ink story:absolute story:block story:u-top-719 story:u-left-924 story:u-w-470 story:u-text-28 story:u-leading-40"
        >
          {storyCopy.touchstone.closing}
        </p>
      </div>
    </Chapter>
  );
}

// The section only renders on landscape tablets and up, so these chapters use plain classes.
// Groups marked `data-place` are positioned around the chapter's subject at runtime (placeText).

const xrfTops = ['u-top-354', 'u-top-441', 'u-top-528', 'u-top-615', 'u-top-702'];

function XrfChapter() {
  return (
    <Chapter id="xrf">
      <div
        data-place="above"
        data-gap="12"
        className="absolute inset-x-0 flex flex-col items-center text-center u-gap-12"
      >
        <h2 data-reveal className="font-medium u-text-72 u-leading-85">
          Then came the XRF karatometer
        </h2>
        <p data-reveal className="text-gs-ink u-text-16 u-leading-22">
          {storyCopy.xrf.subtitle}
        </p>
      </div>
      <ul className="contents">
        {xrfLimits.map((item, index) => (
          <FeatureItem
            key={item.title}
            {...item}
            place="left"
            className={cn('absolute u-left-100 u-w-280', xrfTops[index])}
          />
        ))}
      </ul>
      <div
        data-place="right"
        className="absolute flex flex-col text-gs-ink u-top-354 u-left-1050 u-w-290 u-gap-10 u-text-16 u-leading-22"
      >
        {storyCopy.xrf.notes.map((note) => (
          <p key={note} data-reveal>
            {note}
          </p>
        ))}
      </div>
      <p
        data-reveal
        data-place="right"
        className="absolute font-serif font-medium tracking-tighter text-gs-ink u-top-684 u-left-1050 u-w-290 u-text-26 u-leading-37"
      >
        {storyCopy.xrf.closing}
      </p>
    </Chapter>
  );
}

function BeyondChapter() {
  return (
    <Chapter id="beyond" className="text-center">
      <div
        data-place="above"
        className="absolute inset-x-0 flex flex-col items-center u-gap-13"
      >
        <h2 data-reveal className="font-medium u-text-52 u-leading-62">
          But what lies beyond the surface?
        </h2>
        <p data-reveal className="text-balance text-gs-ink u-w-700 u-text-16 u-leading-22">
          {storyCopy.beyond.body}
        </p>
      </div>
      <div
        data-place="below"
        className="absolute inset-x-0 flex flex-col items-center u-gap-14"
      >
        <p
          data-reveal
          className="font-serif font-medium text-gs-ink u-text-32 u-leading-36"
        >
          Surface-Level ≠ Complete Purity Insight
        </p>
        <p data-reveal className="text-gs-ink/80 u-text-16 u-leading-22">
          {storyCopy.beyond.note}
        </p>
      </div>
    </Chapter>
  );
}

function DeeperChapter() {
  return (
    <Chapter id="deeper" className="text-center">
      <div data-place="above" className="absolute inset-x-0">
        <h2 data-reveal className="font-medium u-text-52 u-leading-62">
          What if we could look deeper?
        </h2>
      </div>
      <div
        data-place="below"
        className="absolute inset-x-0 flex flex-col items-center u-gap-12"
      >
        <p
          data-reveal
          className="font-serif font-medium text-gs-ink u-text-32 u-leading-36"
        >
          {storyCopy.deeper.caption}
        </p>
        <p data-reveal className="text-gs-ink/80 u-text-16 u-leading-22">
          {storyCopy.deeper.note}
        </p>
        <p
          data-reveal
          className="font-serif font-medium text-balance text-gs-ink u-mt-48 u-w-1100 u-text-32 u-leading-36"
        >
          {storyCopy.deeper.closing}
        </p>
      </div>
    </Chapter>
  );
}

function GoldsenseChapter() {
  return (
    <Chapter id="goldsense" className="text-center">
      <div
        data-place="above"
        className="absolute inset-x-0 flex flex-col items-center u-gap-17"
      >
        <h2 data-reveal className="font-medium u-text-72 u-leading-85">
          Presenting Goldsense™
        </h2>
        <p
          data-reveal
          className="font-serif font-medium text-gs-ink u-text-24 u-leading-30"
        >
          {storyCopy.goldsense.tagline}
        </p>
      </div>
      <div
        data-place="below"
        className="absolute inset-x-0 flex flex-col items-center"
      >
        <p data-reveal className="text-balance text-gs-ink u-w-620 u-text-16 u-leading-22">
          {storyCopy.goldsense.body}
        </p>
        <div data-reveal className="flex justify-center u-mt-22 u-gap-16">
          <Link
            href={BOOKING_HREF}
            className="flex items-center justify-center rounded-full border border-transparent [background:linear-gradient(270deg,#FED98D_0%,#E3A352_100%)_padding-box,linear-gradient(90deg,#B57018_0%,#E0B358_100%)_border-box] font-medium text-gs-ink transition-opacity hover:opacity-85 u-h-42 u-w-140 u-text-14"
          >
            Order Now
          </Link>
          <Link
            href="/product"
            className="flex items-center justify-center rounded-full border border-[#3B2E27] text-gs-ink u-h-42 u-w-140 u-text-14"
          >
            Know More
          </Link>
        </div>
        <ul className="grid grid-cols-3 text-left u-mt-48 u-w-1200 u-gap-40">
          {goldsenseHighlights.map((item) => (
            <FeatureItem key={item.title} {...item} />
          ))}
        </ul>
      </div>
    </Chapter>
  );
}
