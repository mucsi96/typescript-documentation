import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { Symbol, UnionType } from 'typescript';
import { renderType } from './type';
import { Context } from './context';
import {
  listItem,
  subSection,
  heading,
  joinLines,
  joinSections
} from './markdown';

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
    heading(symbol.getName()),
    renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    renderEnumerationItems(type, context),
    renderExamples(symbol.getJsDocTags()),
    renderAdditionalLinks(symbol.getJsDocTags())
  ]);
}
