import { STRAPI_URL } from '@/lib/api';

export function strapiMediaUrl(url: string) {
  return /^https?:\/\//.test(url) ? url : `${STRAPI_URL}${url}`;
}
