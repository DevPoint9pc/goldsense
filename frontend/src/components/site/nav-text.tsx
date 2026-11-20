import { cn } from '@/lib/utils';

export function NavText({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={cn('px-px', active && 'marker-highlight')}>
      {children}
    </span>
  );
}
