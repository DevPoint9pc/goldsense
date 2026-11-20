import Image from 'next/image';
import { deviceComponents } from '@/data/product';
import { SectionIntro } from '@/components/site/section-intro';

export function DeviceComponents() {
  return (
    <section aria-labelledby="device-heading">
      <SectionIntro
        id="device-heading"
        eyebrow="Features"
        title={
          <>
            More than a device.
            <br />
            Intelligence in your hands
          </>
        }
        description="GoldSense™ combines dual assessment, AI-powered analysis and digital reporting in one compact, portable system."
      />
      <ol className="mt-10 md:mt-13">
        {deviceComponents.map((item, index) => (
          <li
            key={item.title}
            className="group relative border-b border-gs-line py-7 transition-colors duration-300 ease-out last:border-b-0 hover:bg-white/90"
          >
            <div className="transition-transform duration-300 ease-out group-hover:translate-x-5 md:pr-[calc(3%+15.5rem)]">
              <h3 className="flex gap-2 text-lg md:text-2xl leading-6 font-medium tracking-[-0.01em]">
                <span className="w-6 shrink-0">{index + 1}.</span> {item.title}
              </h3>
              <p className="mt-2 pl-8 text-sm md:text-base leading-5 text-gs-body">
                {item.description}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-[3%] z-10 hidden aspect-4/3 w-56 -translate-x-10 -translate-y-1/2 -rotate-12 overflow-hidden rounded-xl opacity-0 transition-[opacity,translate,rotate] duration-300 ease-out group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100 md:block"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
