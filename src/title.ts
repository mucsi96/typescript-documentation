import slugify from '@sindresorhus/slugify';

export function renderTitle(title: string, slugTitle?: string): string[] {
  return [`## [${title}](#${slugify(slugTitle || title)})`];
}
