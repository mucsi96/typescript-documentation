import { Symbol } from 'typescript';
import { DependencyContext } from './context';
import { getSymbolDependencies } from './symbol';

export function getModuleDependencies(
  symbol: Symbol,
  context: DependencyContext
): Symbol[] {
  const moduleExports: Symbol[] = [];

  symbol.exports?.forEach(exportedSymbol => {
    if (context.exportedSymbols.includes(exportedSymbol)) {
      moduleExports.push(exportedSymbol);
    }
  });

  return moduleExports.reduce(
    (dependencies, child) => [
      ...dependencies,
      ...getSymbolDependencies(child, context)
    ],
    moduleExports
  );
}
