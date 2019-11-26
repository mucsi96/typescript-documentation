import { Reflection } from 'typedoc';
import { renderSubSection } from './subSection';

function isLink(value?: RegExpExecArray | null | undefined): value is RegExpExecArray {
  return !!value;
}

function getAddtionalLinks(reflection: Reflection): { href: string; text: string }[] {
  if (!reflection.comment || !reflection.comment.tags) {
    return [];
  }

  return reflection.comment.tags
    .filter(tag => tag.tagName === 'see')
    .map(tag => /{@link (.*?)\|(.*?)}/.exec(tag.text))
    .filter(isLink)
    .map(([, href, text]) => ({ href, text }));
}

export function renderAdditionalLinks(reflection: Reflection): string[] {
  const additionalLinks = getAddtionalLinks(reflection);

  if (!additionalLinks.length) {
    return [];
  }

  return [
    ...renderSubSection('See also'),
    ...additionalLinks.map(({ href, text }) => `- [${text}](${href})`)
  ];
}
