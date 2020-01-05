import { CompilerOptions, createProgram } from 'typescript';
import { spreadClassProperties } from './class';
import { joinSections } from './markdown';
import { getModuleDependencies } from './module';
import { renderSymbol } from './symbol';
import {
  createCompilerHost,
  getSymbolSection,
  isInternalSymbol
} from './utils';

export type Options = {
  compilerOptions: CompilerOptions;
  entry: string;
  sourceCode?: { [name: string]: string };
  getSectionLocation: (section: string) => string;
};

export type Documentation = Map<string, string>;

export function createDocumentation(options: Options): Documentation {
  const { compilerOptions, entry: entryFileName, sourceCode } = options;
  const program = createProgram({
    rootNames: [entryFileName],
    options: compilerOptions,
    ...(sourceCode && {
      host: createCompilerHost(sourceCode)
    })
  });

  const typeChecker = program.getTypeChecker();
  const entrySourceFile = program.getSourceFile(entryFileName);

  /* istanbul ignore next */
  if (!entrySourceFile) {
    throw new Error(`Cannot find entry ${entryFileName}`);
  }

  const entryModuleSymbol = typeChecker.getSymbolAtLocation(entrySourceFile);

  if (!entryModuleSymbol) {
    return new Map<string, string>();
  }
  const exportedSymbols = typeChecker
    .getExportsOfModule(entryModuleSymbol)
    .filter(symbol => !isInternalSymbol(symbol));

  const symbolsToRender = getModuleDependencies(entryModuleSymbol, {
    typeChecker,
    exportedSymbols,
    resolutionPath: []
  }).filter((child, index, all) => all.indexOf(child) === index);

  return spreadClassProperties(
    symbolsToRender,
    options.getSectionLocation
  ).reduce<Documentation>((acc, symbol) => {
    const section = getSymbolSection(symbol);
    const output = renderSymbol(symbol, {
      typeChecker,
      exportedSymbols: symbolsToRender,
      section,
      getSectionLocation: options.getSectionLocation
    });

    if (acc.has(section)) {
      acc.set(section, joinSections([acc.get(section) || '', output]));
    } else {
      acc.set(section, output);
    }

    return acc;
  }, new Map<string, string>());
}
