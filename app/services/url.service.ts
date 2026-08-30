import unique from 'base62-random';
import { createUrl } from '../repositories/url.repositories';

export async function shortenUrl(originalUrl:string) {
  const shortCode =  unique(6);

  const url = await createUrl(originalUrl , shortCode)

  return url
}