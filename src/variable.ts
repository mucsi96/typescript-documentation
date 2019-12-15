import { Symbol, Type } from 'typescript';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Context } from './context';
import { heading, subSection, joinSections } from './markdown';
import { renderType } from './type';

export function renderVariable(
  symbol: Symbol,
  type: Type,
  context: Context
): string {
  return joinSections([
    heading(symbol.getName()),
    renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    subSection('Type'),
    renderType(type, context),
    renderExamples(symbol.getJsDocTags()),
    renderAdditionalLinks(symbol.getJsDocTags())
  ]);
}
