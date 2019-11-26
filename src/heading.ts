import slugify from '@sindresorhus/slugify';

export function renderHeading(title: string, level = 1): string[] {
  return [`${Array(level).fill('#')} [${title}](#${slugify(title)})`];
}
