'use client';

import Image from 'next/image';
import { LuPlay, LuX } from 'react-icons/lu';
import { type EventVideo } from '@/types/content';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function VideoCard({ video }: { video: EventVideo }) {
  const thumbnail = (
    <div className="relative aspect-390/220  overflow-hidden rounded-t-md bg-black">
      {video.thumbnail && (
        <Image
          src={video.thumbnail.src}
          alt={video.thumbnail.alt}
          fill
          unoptimized={video.thumbnail.src.startsWith('https://i.vimeocdn.com/')}
          sizes="(min-width: 1024px) 390px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      )}
      <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm">
        <LuPlay
          aria-hidden="true"
          className="ml-1 size-4 fill-gs-ink text-gs-ink"
        />
      </span>
    </div>
  );
  const title = (
    <h3 className="px-4 pt-3 pb-4 text-base leading-6 font-medium tracking-[-0.01em] md:text-lg">
      {video.title}
    </h3>
  );

  if (!video.vimeo) {
    return (
      <article className="group h-full overflow-hidden rounded-md bg-white">
        {thumbnail}
        {title}
      </article>
    );
  }

  return (
    <article className="group h-full overflow-hidden rounded-md bg-white">
      <VideoDialog
        src={video.vimeo.src}
        title={video.title}
        triggerClassName="block w-full cursor-pointer text-left"
        triggerLabel={`Watch: ${video.title}`}
      >
        {thumbnail}
        {title}
      </VideoDialog>
    </article>
  );
}

interface VideoDialogProps {
  /** Vimeo player URL (see `vimeoPlayerSrc`). */
  src: string;
  title: string;
  triggerClassName?: string;
  triggerLabel?: string;
  children: React.ReactNode;
}

/** The one video player popup, used by event videos and other videos on the site. */
export function VideoDialog({
  src,
  title,
  triggerClassName,
  triggerLabel,
  children,
}: VideoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName} aria-label={triggerLabel}>
        {children}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="aspect-video w-[min(100vw-2rem,(100dvh-7rem)*16/9,64rem)] max-w-none gap-0 overflow-visible rounded-lg border-0 bg-black p-0 md:max-w-none"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full rounded-lg border-0"
        />
        <DialogClose className="absolute -top-11 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white text-gs-ink">
          <LuX aria-hidden="true" className="size-5" />
          <span className="sr-only">Close video</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
