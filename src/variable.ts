import { renderTitle } from './title';
import { renderType } from './type';
import { renderSubSection } from './subSection';
import { Symbol, Type } from 'typescript';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Context } from './context';

export function renderVariable(symbol: Symbol, type: Type, context: Context): string[] {
  return [
    ...renderTitle(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    ...renderSubSection('Type'),
    renderType(type, context),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags())
  ];
}
