import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Symbol, Type } from 'typescript';
import { renderType } from './type';
import { Context } from './context';
import { inlineCode, listItem, subSection, heading } from './markdown';

function renderEnumerationItems(type: Type, context: Context): string[] {
  if (!type.isUnion()) {
    return [];
  }

  return [
    subSection('Possible values'),
    ...type.types.map(type => listItem(inlineCode(renderType(type, context))))
  ];
}

export function renderEnumeration(
  symbol: Symbol,
  type: Type,
  context: Context
): string[] {
  return [
    heading(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    ...renderEnumerationItems(type, context),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags())
  ];
}
