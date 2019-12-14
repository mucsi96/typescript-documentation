import { renderType } from './type';
import { Symbol, Type } from 'typescript';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Context } from './context';
import { heading, subSection, inlineCode } from './markdown';

export function renderVariable(
  symbol: Symbol,
  type: Type,
  context: Context
): string[] {
  return [
    heading(symbol.getName()),
    ...renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    subSection('Type'),
    inlineCode(renderType(type, context)),
    ...renderExamples(symbol.getJsDocTags()),
    ...renderAdditionalLinks(symbol.getJsDocTags())
  ];
}
