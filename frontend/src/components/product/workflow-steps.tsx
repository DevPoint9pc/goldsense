import { workflowSteps } from '@/data/product';
import { SectionIntro } from '@/components/site/section-intro';

export function WorkflowSteps() {
  return (
    <section aria-labelledby="workflow-heading">
      <SectionIntro
        id="workflow-heading"
        eyebrow="How it works"
        title="From gold to digital proof"
        description="A simple assessment workflow turns a physical gold test into a documented digital result."
      />
      <ol className="mt-6 md:mt-9">
        {workflowSteps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-6 border-b border-gs-line py-7"
          >
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded bg-gs-sand text-xs font-medium text-gs-ink"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg leading-6 font-medium tracking-[-0.01em] md:text-2xl">
                {step.title}
              </h3>
              <p className="max-w-2xl text-sm leading-5 text-gs-body md:text-base">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
