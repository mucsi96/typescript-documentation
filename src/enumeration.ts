import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';
import { Symbol, Type } from 'typescript';
import { renderType } from './type';
import { Context } from './context';

function renderEnumerationItems(type: Type, context: Context): string[] {
  if (!type.isUnion()) {
    return [];
  }

  return [
    ...renderSubSection('Possible values'),
    ...type.types.map(type => `- ${renderType(type, context)}`)
  ];
}

export function renderEnumeration(symbol: Symbol, type: Type, context: Context): string[] {
  return [
    ...renderTitle(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    ...renderEnumerationItems(type, context),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags()),
    ''
  ];
}
