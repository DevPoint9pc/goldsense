import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/assets/brand/goldsense-logo.svg"
      alt="GoldSense™"
      width={142}
      height={24}
      priority={priority}
      className={cn('h-auto w-40', className)}
    />
  );
}
