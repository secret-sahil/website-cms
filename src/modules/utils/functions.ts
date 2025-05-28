import { MediaType } from '@prisma/client';

export function Slugify(input: string): string {
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return `${slug}-${randomSuffix}`;
}

export function getMediaType(mimetype: string): MediaType {
  if (mimetype.startsWith('image/')) {
    if (mimetype === 'image/gif') return MediaType.gif;
    return MediaType.image;
  }
  if (mimetype.startsWith('video/')) return MediaType.video;
  if (mimetype.startsWith('audio/')) return MediaType.audio;
  if (mimetype === 'application/pdf') return MediaType.pdf;
  return MediaType.other;
}

export function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}
