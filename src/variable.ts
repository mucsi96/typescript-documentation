import { renderTitle } from './title';
import { renderType } from './type';
import { renderSubSection } from './subSection';
import { TypeChecker, Symbol, Type } from 'typescript';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';

export function renderVariable(symbol: Symbol, type: Type, typeChecker: TypeChecker): string[] {
  return [
    ...renderTitle(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(typeChecker)),
    ...renderSubSection('Type'),
    `\`${renderType(type, typeChecker)}\``,
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags()),
    ''
  ];
}
