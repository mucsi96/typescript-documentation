import { JSDocTagInfo } from 'typescript';
import { subSection, listItem, link } from './markdown';

function isLink(
  value?: RegExpExecArray | null | undefined
): value is RegExpExecArray {
  return !!value;
}

function getAddtionalLinks(
  tags: JSDocTagInfo[]
): { href: string; text: string }[] {
  return tags
    .filter(tag => tag.name === 'see')
    .map(tag => /{@link (.*?)\|(.*?)}/.exec(tag.text as string))
    .filter(isLink)
    .map(([, href, text]) => ({ href, text }));
}

export function renderAdditionalLinks(tags: JSDocTagInfo[]): string[] {
  const additionalLinks = getAddtionalLinks(tags);

  if (!additionalLinks.length) {
    return [];
  }

  return [
    subSection('See also'),
    ...additionalLinks.map(({ href, text }) => listItem(link(text, href)))
  ];
}
