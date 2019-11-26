import slugify from '@sindresorhus/slugify';

export function renderHeading(title: string, slugTitle?: string, level = 1): string[] {
  return [`${Array(level).fill('#')} [${title}](#${slugify(slugTitle || title)})`];
}
