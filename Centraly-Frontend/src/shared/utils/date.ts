export function formatDate(dateString: string | Date | undefined): string {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function toUtcStartOfDayISOString(dateString: string): string {
  const localDate = new Date(dateString);
  localDate.setHours(0, 0, 0, 0);
  return localDate.toISOString();
}

export function toUtcEndOfDayISOString(dateString: string): string {
  const localDate = new Date(dateString);
  localDate.setHours(23, 59, 59, 999);
  return localDate.toISOString();
}
