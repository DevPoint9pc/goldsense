import { howItWorksVideo } from '@/data/product';
import { vimeoPlayerSrc } from '@/lib/vimeo';
import { cn } from '@/lib/utils';
import { siteButtonVariants } from '@/components/site/site-button-variants';
import { VideoDialog } from '@/components/events/video-card';
import { SectionIntro } from '@/components/site/section-intro';
import { FaCirclePlay } from 'react-icons/fa6';

const videoSrc = vimeoPlayerSrc(howItWorksVideo.url);

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading">
      <SectionIntro
        id="how-it-works-heading"
        title="How it works"
        description={
          <span className="text-gs-ink/70">
            GoldSense™ analyses the sample and generates the result through the
            GoldSense app.
          </span>
        }
      />
      <p className="mt-6 max-w-2xl text-sm leading-5 text-gs-body md:text-base">
        View the purity and measurement details directly on your smartphone,
        with the complete result available digitally for easy access. Save the
        report for your records or share it as required, making every assessment
        easier to document, review, and communicate.
      </p>
      {videoSrc && (
        <VideoDialog
          src={videoSrc}
          title={howItWorksVideo.title}
          triggerClassName={cn(
            siteButtonVariants({ variant: 'secondary' }),
            'mt-8 h-12 cursor-pointer gap-3 px-5 text-sm font-normal md:text-base',
          )}
        >
          Watch How it works
          <FaCirclePlay aria-hidden="true" className="ml-px size-5 fill-black" />
        </VideoDialog>
      )}
    </section>
  );
}
