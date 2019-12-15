import {
  createProgram,
  Symbol,
  SymbolFlags,
  Type,
  CompilerOptions
} from 'typescript';
import { renderVariable } from './variable';
import { renderFunction } from './function';
import { renderClass } from './class';
import { renderTypeDeclaration } from './typeDeclaration';
import { renderEnumeration } from './enumeration';
import {
  findExactMatchingSymbolFlags,
  createCompilerHost,
  getDeclarationSourceLocation,
  inspectObject,
  isInternalSymbol
} from './utils';
import { Context } from './context';

function renderDeclaration(
  symbol: Symbol,
  type: Type,
  context: Context
): string {
  const flags = symbol.getFlags();

  if (flags & SymbolFlags.BlockScopedVariable) {
    return renderVariable(symbol, type, context);
  }

  if (flags & SymbolFlags.Function) {
    return renderFunction(symbol, type, context);
  }

  if (flags & SymbolFlags.Class) {
    return renderClass(symbol, type, context);
  }

  if (flags & SymbolFlags.TypeAlias || flags & SymbolFlags.Interface) {
    return renderTypeDeclaration(symbol, type, context);
  }

  /* istanbul ignore else */
  if (flags & SymbolFlags.RegularEnum && type.isUnion()) {
    return renderEnumeration(symbol, type, context);
  }

  /* istanbul ignore next */
  throw new Error(
    `Unsupported symbol ${inspectObject(
      symbol
    )} with flags "${findExactMatchingSymbolFlags(flags)}"`
  );
}

function renderSymbol(symbol: Symbol, context: Context): string {
  const declarations = symbol.getDeclarations();

  /* istanbul ignore else */
  if (declarations) {
    return declarations
      .map<string>(declaration => {
        try {
          return renderDeclaration(
            symbol,
            context.typeChecker.getTypeAtLocation(declaration),
            context
          );
        } catch (error) {
          /* istanbul ignore next */
          throw new Error(
            [error.message, getDeclarationSourceLocation(declaration)].join(
              '\n'
            )
          );
        }
      })
      .join('\n\n');
  } else {
    return '';
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
    const exportedSymbols = typeChecker
      .getExportsOfModule(type)
      .filter(symbol => !isInternalSymbol(symbol));

    return exportedSymbols
      .map(symbol => renderSymbol(symbol, { typeChecker, exportedSymbols }))
      .join('\n\n');
  }

  return '';
}
