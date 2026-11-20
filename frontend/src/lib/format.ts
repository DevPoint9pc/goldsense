const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatDateRange(start: string, end?: string | null) {
  if (!end || end === start) return formatDate(start);
  const from = new Date(start);
  const to = new Date(end);
  const sameYear = from.getUTCFullYear() === to.getUTCFullYear();
  if (sameYear && from.getUTCMonth() === to.getUTCMonth()) {
    return `${from.getUTCDate()}–${formatDate(end)}`;
  }
  const fromLabel = sameYear ? `${from.getUTCDate()} ${MONTHS[from.getUTCMonth()]}` : formatDate(start);
  return `${fromLabel} – ${formatDate(end)}`;
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}
