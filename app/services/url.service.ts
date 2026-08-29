

import unique from 'base62-random';

export function generateShortCode(): string {
  return unique(6);
}