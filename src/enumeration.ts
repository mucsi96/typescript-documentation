import { Symbol, UnionType } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { Context } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import {
  heading,
  joinLines,
  joinSections,
  listItem,
  subSection
} from './markdown';
import { renderType } from './type';

function renderEnumerationItems(type: UnionType, context: Context): string {
  return joinSections([
    subSection('Possible values'),
    joinLines(type.types.map(type => listItem(renderType(type, context))))
  ]);
}

export function renderEnumeration(
  symbol: Symbol,
  type: UnionType,
  context: Context
): string {
  return joinSections([
    heading(symbol.getName(), 2),
    renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    renderEnumerationItems(type, context),
    renderExamples(symbol.getJsDocTags()),
    renderAdditionalLinks(symbol.getJsDocTags())
  ]);
}
