import {
  createProgram,
  Symbol,
  TypeChecker,
  SymbolFlags,
  Type,
  getPreEmitDiagnostics,
  flattenDiagnosticMessageText
} from 'typescript';
import { populateDefaultOptions, TOptions } from './options';
import { renderVariable } from './variable';
import { renderFunction } from './function';
import { renderClass } from './class';
import { renderTypeDeclaration } from './typeDeclaration';
import { renderEnumeration } from './enumeration';
import { createCompilerHost } from './compilerHost';

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

  if (flags & SymbolFlags.RegularEnum) {
    return renderEnumeration(symbol, type, typeChecker);
  }

  throw new Error(`Unsupported symbol ${typeChecker.symbolToString(symbol)}`);
}

function renderSymbol(symbol: Symbol, typeChecker: TypeChecker): string[] {
  const declarations = symbol.getDeclarations();
  if (declarations) {
    return declarations.reduce<string[]>(
      (acc, declaration) => [
        ...acc,
        ...renderDeclaration(symbol, typeChecker.getTypeAtLocation(declaration), typeChecker)
      ],
      []
    );
  }

  return [];
}

export function createDocumentation(options: TOptions): string {
  const { compilerOptions, entry, sourceCode } = populateDefaultOptions(options);

  const program = createProgram({
    rootNames: [entry],
    options: compilerOptions,
    ...(sourceCode && {
      host: createCompilerHost(sourceCode)
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
