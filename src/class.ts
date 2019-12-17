import { Symbol, SymbolFlags } from 'typescript';
import { renderAdditionalLinks } from './additionalLinks';
import { Context } from './context';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { heading, joinSections } from './markdown';
import { isInternalSymbol } from './utils';

export function spreadClassProperties(symbols: Symbol[]): Symbol[] {
  return symbols.reduce<Symbol[]>((acc, symbol) => {
    if (!(symbol.getFlags() & SymbolFlags.Class) || !symbol.members) {
      return [...acc, symbol];
    }

    const classInstanceName = [
      symbol.name.charAt(0).toLowerCase(),
      symbol.name.slice(1)
    ].join('');
    const members: Symbol[] = [];
    symbol.members.forEach(member => {
      if (!isInternalSymbol(member)) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        member.getName = (): string => `${classInstanceName}.${member.name}`;
        members.push(member);
      }
    });

    return [...acc, symbol, ...members];
  }, []);
}

export function renderClass(symbol: Symbol, context: Context): string {
  const name = symbol.getName();

  return joinSections([
    heading(name, 2),
    renderDescription(symbol.getDocumentationComment(context.typeChecker)),
    renderExamples(symbol.getJsDocTags()),
    renderAdditionalLinks(symbol.getJsDocTags())
  ]);
}
