import { MediaType } from '@prisma/client';

export function Slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // Remove everything except letters, numbers, and spaces
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-'); // Collapse multiple dashes
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
