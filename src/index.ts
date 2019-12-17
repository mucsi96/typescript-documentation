import { CompilerOptions, createProgram, Symbol } from 'typescript';
import { spreadClassProperties } from './class';
import { joinSections } from './markdown';
import { renderSymbol } from './symbol';
import { createCompilerHost, isInternalSymbol } from './utils';

export type Options = {
  compilerOptions: CompilerOptions;
  entry: string;
  sourceCode?: { [name: string]: string };
};

export type Documentation = Map<string, string>;

function getSymbolSection(symbol: Symbol): string {
  const sectionTag = symbol.getJsDocTags().find(tag => tag.name === 'section');

  return (sectionTag && sectionTag.text) || 'default';
}

export function createDocumentation(options: Options): Documentation {
  const { compilerOptions, entry, sourceCode } = options;
  const program = createProgram({
    rootNames: [entry],
    options: compilerOptions,
    ...(sourceCode && {
      host: createCompilerHost(sourceCode)
    })
  });

  const typeChecker = program.getTypeChecker();
  const root = program.getSourceFile(entry);

  /* istanbul ignore next */
  if (!root) {
    throw new Error(`Cannot find entry ${entry}`);
  }

  const type = typeChecker.getSymbolAtLocation(root);

  if (!type) {
    return new Map<string, string>();
  }

  const exportedSymbols = typeChecker
    .getExportsOfModule(type)
    .filter(symbol => !isInternalSymbol(symbol));

  return spreadClassProperties(exportedSymbols).reduce<Documentation>(
    (acc, symbol) => {
      const section = getSymbolSection(symbol);
      const output = renderSymbol(symbol, { typeChecker, exportedSymbols });

      if (acc.has(section)) {
        acc.set(section, joinSections([acc.get(section) || '', output]));
      } else {
        acc.set(section, output);
      }

      return acc;
    },
    new Map<string, string>()
  );
}
