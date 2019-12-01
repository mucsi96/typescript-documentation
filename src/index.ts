import {
  createProgram,
  createSourceFile,
  ScriptTarget,
  Symbol,
  SourceFile,
  TypeChecker,
  SymbolFlags
} from 'typescript';
import { populateDefaultOptions, TOptions } from './options';
import { renderVariable } from './variable';

function renderSymbol(symbol: Symbol, typeChecker: TypeChecker): string[] {
  const declarations = symbol.getDeclarations();
  if (declarations) {
    return declarations.reduce<string[]>((acc, declaration) => {
      if (symbol.getFlags() & SymbolFlags.BlockScopedVariable) {
        return [...acc, ...renderVariable(symbol, declaration, typeChecker)];
      }
      return acc;
    }, []);
  }

  return [];
}

export function createDocumentation(options: TOptions): string {
  const { compilerOptions, entry, sourceCode } = populateDefaultOptions(options);

  const program = createProgram({
    rootNames: [entry],
    options: compilerOptions,
    ...(sourceCode && {
      host: {
        getSourceFile: (name): SourceFile =>
          createSourceFile(name, (sourceCode && sourceCode[name]) || '', ScriptTarget.Latest),
        writeFile: (): void => {},
        getDefaultLibFileName: (): string => 'lib.d.ts',
        useCaseSensitiveFileNames: (): boolean => false,
        getCanonicalFileName: (filename): string => filename,
        getCurrentDirectory: (): string => '',
        getNewLine: (): string => '\n',
        getDirectories: (): string[] => [],
        fileExists: (): boolean => true,
        readFile: (): string => ''
      }
    })
  });

  const typeChecker = program.getTypeChecker();
  const root = program.getSourceFile(entry);

  if (!root) {
    throw new Error(`Cannot find entry ${entry}`);
  }

  const type = typeChecker.getSymbolAtLocation(root);

  if (type) {
    const exportedSymbols = typeChecker.getExportsOfModule(type);

    return exportedSymbols
      .reduce<string[]>((acc, symbol) => [...acc, ...renderSymbol(symbol, typeChecker)], [])
      .join('\n');
  }

  return '';
}
