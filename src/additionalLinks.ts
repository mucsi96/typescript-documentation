import { renderSubSection } from './subSection';
import { JSDocTagInfo } from 'typescript';

function isLink(value?: RegExpExecArray | null | undefined): value is RegExpExecArray {
  return !!value;
}

function getAddtionalLinks(tags: JSDocTagInfo[]): { href: string; text: string }[] {
  return tags
    .filter(tag => tag.name === 'see')
    .map(tag => /{@link (.*?)\|(.*?)}/.exec(tag.text || ''))
    .filter(isLink)
    .map(([, href, text]) => ({ href, text }));
}

export function renderAdditionalLinks(tags: JSDocTagInfo[]): string[] {
  const additionalLinks = getAddtionalLinks(tags);

  if (!additionalLinks.length) {
    return [];
  }

  return [
    ...renderSubSection('See also'),
    ...additionalLinks.map(({ href, text }) => `- [${text}](${href})`)
  ];
}
