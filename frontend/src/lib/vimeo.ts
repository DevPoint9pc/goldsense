const VIMEO_URL = /^https?:\/\/(?:www\.|player\.)?vimeo\.com\/(?:.*?\/)?(\d+)(?:\/([0-9a-f]+))?/i;

export interface VimeoVideo {
  src: string;
  thumbnail: string | null;
}

interface VimeoOEmbed {
  thumbnail_url?: string;
}

export function vimeoPlayerSrc(url: string) {
  const match = url.trim().match(VIMEO_URL);
  if (!match) return null;
  const [, id, pathHash] = match;
  const hash = pathHash ?? new URL(url.trim()).searchParams.get("h");
  const params = new URLSearchParams({
    ...(hash && { h: hash }),
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
    autoplay: "1",
  });
  return `https://player.vimeo.com/video/${id}?${params}`;
}

export async function getVimeoVideo(url: string): Promise<VimeoVideo | null> {
  const src = vimeoPlayerSrc(url);
  if (!src) return null;
  try {
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url.trim())}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`oEmbed ${res.status}`);
    const data = (await res.json()) as VimeoOEmbed;
    return {
      src,
      thumbnail: data.thumbnail_url?.replace(/_\d+x\d+(?=\?|$)/, "_1280") ?? null,
    };
  } catch {
    return { src, thumbnail: null };
  }
}
