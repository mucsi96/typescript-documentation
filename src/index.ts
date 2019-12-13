import { createProgram, Symbol, TypeChecker, SymbolFlags, Type, CompilerOptions } from 'typescript';
import { renderVariable } from './variable';
import { renderFunction } from './function';
import { renderClass } from './class';
import { renderTypeDeclaration } from './typeDeclaration';
import { renderEnumeration } from './enumeration';
import {
  findExactMatchingSymbolFlags,
  createCompilerHost,
  getDeclarationSourceLocation,
  inspectObject
} from './utils';

function renderDeclaration(symbol: Symbol, type: Type, typeChecker: TypeChecker): string[] {
  const flags = symbol.getFlags();

  if (flags & SymbolFlags.BlockScopedVariable) {
    return renderVariable(symbol, type, typeChecker);
  }

  if (flags & SymbolFlags.Function) {
    return renderFunction(symbol, type, typeChecker);
  }

  if (flags & SymbolFlags.Class) {
    return renderClass(symbol, type, typeChecker);
  }

  if (flags & SymbolFlags.TypeAlias) {
    return renderTypeDeclaration(symbol, type, typeChecker);
  }

  /* istanbul ignore else */
  if (flags & SymbolFlags.RegularEnum) {
    return renderEnumeration(symbol, type, typeChecker);
  }

  /* istanbul ignore next */
  throw new Error(
    `Unsupported symbol ${inspectObject(symbol)} with flags "${findExactMatchingSymbolFlags(
      flags
    )}"`
  );
}

function renderSymbol(symbol: Symbol, typeChecker: TypeChecker): string[] {
  const declarations = symbol.getDeclarations();
  /* istanbul ignore else */
  if (declarations) {
    return declarations.reduce<string[]>((acc, declaration) => {
      try {
        const result = renderDeclaration(
          symbol,
          typeChecker.getTypeAtLocation(declaration),
          typeChecker
        );
        return [...acc, ...result];
      } catch (error) {
        /* istanbul ignore next */
        throw new Error([error.message, getDeclarationSourceLocation(declaration)].join('\n'));
      }
    }, []);
  } else {
    return [];
  }
}

export type Options = {
  compilerOptions: CompilerOptions;
  entry: string;
  sourceCode?: { [name: string]: string };
};

export function createDocumentation(options: Options): string {
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

  if (type) {
    const exportedSymbols = typeChecker.getExportsOfModule(type);

    return exportedSymbols
      .reduce<string[]>((acc, symbol) => [...acc, ...renderSymbol(symbol, typeChecker)], [])
      .join('\n');
  }

  return '';
}
