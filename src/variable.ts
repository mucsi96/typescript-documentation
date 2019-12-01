import { renderTitle } from './title';
import { render } from './type';
import { renderSubSection } from './subSection';
import { TypeChecker, Declaration, Symbol } from 'typescript';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';

export function renderVariable(
  symbol: Symbol,
  declaration: Declaration,
  typeChecker: TypeChecker
): string[] {
  const type = typeChecker.getTypeAtLocation(declaration);

  return [
    ...renderTitle(symbol.getName()),
    ...renderDescription(symbol, typeChecker),
    ...renderSubSection('Type'),
    `\`${render(type, typeChecker)}\``,
    ...renderExamples(symbol),
    ...renderAdditionalLinks(symbol),
    ''
  ];
}
