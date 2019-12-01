import { renderTitle } from './title';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';
import { Symbol, Type, TypeChecker } from 'typescript';
import { renderType } from './type';

function renderEnumerationItems(type: Type, typeChecker: TypeChecker): string[] {
  if (!type.isUnion()) {
    return [];
  }

  return [
    ...renderSubSection('Possible values'),
    ...type.types.map(type => `- \`${renderType(type, typeChecker)}\``)
  ];
}

export function renderEnumeration(symbol: Symbol, type: Type, typeChecker: TypeChecker): string[] {
  return [
    ...renderTitle(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(typeChecker)),
    ...renderEnumerationItems(type, typeChecker),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags()),
    ''
  ];
}
