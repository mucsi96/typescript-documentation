import { renderSubSection } from './subSection';
import { Symbol } from 'typescript';

function isLink(value?: RegExpExecArray | null | undefined): value is RegExpExecArray {
  return !!value;
}

function getAddtionalLinks(symbol: Symbol): { href: string; text: string }[] {
  return symbol
    .getJsDocTags()
    .filter(tag => tag.name === 'see')
    .map(tag => /{@link (.*?)\|(.*?)}/.exec(tag.text || ''))
    .filter(isLink)
    .map(([, href, text]) => ({ href, text }));
}

export function renderAdditionalLinks(symbol: Symbol): string[] {
  const additionalLinks = getAddtionalLinks(symbol);

  if (!additionalLinks.length) {
    return [];
  }

  return [
    ...renderSubSection('See also'),
    ...additionalLinks.map(({ href, text }) => `- [${text}](${href})`)
  ];
}
