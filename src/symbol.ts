import { Symbol, SymbolFlags, Type, TypeFlags } from 'typescript';
import { getClassDependencies, renderClass } from './class';
import { DependencyContext, RenderContext } from './context';
import { renderEnumeration } from './enumeration';
import { getFunctionDependencies, renderFunction } from './function';
import { joinSections } from './markdown';
import { getModuleDependencies } from './module';
import { getTypeDependencies } from './type';
import { getSymbolsType } from './type/utils';
import { renderTypeDeclaration } from './typeDeclaration';
import {
  findExactMatchingSymbolFlags,
  getDeclarationSourceLocation,
  inspectObject,
  SupportError
} from './utils';
import { renderVariable } from './variable';

function renderDeclaration(
  symbol: Symbol,
  type: Type,
  context: RenderContext
): string {
  const flags = symbol.getFlags();

  if (flags & SymbolFlags.BlockScopedVariable) {
    return renderVariable(symbol, type, context);
  }

  if (flags & SymbolFlags.Function || flags & SymbolFlags.Method) {
    return renderFunction(symbol, type, context);
  }

  if (flags & SymbolFlags.Class) {
    return renderClass(symbol, context);
  }

  if (flags & SymbolFlags.Property || flags & SymbolFlags.Constructor) {
    return '';
  }

  if (flags & SymbolFlags.TypeAlias || flags & SymbolFlags.Interface) {
    return renderTypeDeclaration(symbol, type, context);
  }

  /* istanbul ignore else */
  if (flags & SymbolFlags.RegularEnum && type.isUnion()) {
    return renderEnumeration(symbol, type, context);
  }

  /* istanbul ignore next */
  throw new SupportError(
    `Unsupported symbol ${inspectObject(
      symbol
    )} with flags "${findExactMatchingSymbolFlags(flags)}"`
  );
}

export function getSymbolDependencies(
  symbol: Symbol,
  context: DependencyContext
): Symbol[] {
  if (context.resolutionPath.find(p => p === symbol)) {
    return [];
  }

  const flags = symbol.getFlags();
  const newContext = {
    ...context,
    resolutionPath: [...context.resolutionPath, symbol]
  };

  if (flags & SymbolFlags.Module) {
    return getModuleDependencies(symbol, newContext);
  }

  const declarations = symbol.getDeclarations() || [];

  return declarations.reduce<Symbol[]>((dependencies, declaration) => {
    const type = context.typeChecker.getTypeAtLocation(declaration);

    if (type.getFlags() & TypeFlags.Any || flags & SymbolFlags.TypeParameter) {
      return dependencies;
    }

    if (
      flags & SymbolFlags.Function ||
      flags & SymbolFlags.Method ||
      flags & SymbolFlags.Constructor
    ) {
      return [...dependencies, ...getFunctionDependencies(type, newContext)];
    }

    if (
      flags & SymbolFlags.FunctionScopedVariable ||
      flags & SymbolFlags.BlockScopedVariable ||
      flags & SymbolFlags.TypeAlias ||
      flags & SymbolFlags.TypeLiteral ||
      flags & SymbolFlags.Property ||
      flags & SymbolFlags.Interface ||
      flags & SymbolFlags.RegularEnum
    ) {
      return [
        ...dependencies,
        ...getTypeDependencies(
          getSymbolsType(symbol, context.typeChecker),
          newContext
        )
      ];
    }

    if (flags & SymbolFlags.Class) {
      return [...dependencies, ...getClassDependencies(symbol, newContext)];
    }

    /* istanbul ignore next */
    throw new SupportError(
      `Unsupported symbol ${inspectObject(
        symbol
      )} with flags "${findExactMatchingSymbolFlags(flags)}"`
    );
  }, []);
}

export function renderSymbol(symbol: Symbol, context: RenderContext): string {
  const declarations = symbol.getDeclarations();

  /* istanbul ignore else */
  if (declarations) {
    return joinSections(
      declarations.map<string>(declaration => {
        try {
          return renderDeclaration(
            symbol,
            context.typeChecker.getTypeAtLocation(declaration),
            context
          );
        } catch (error) {
          if (error instanceof SupportError) {
            /* istanbul ignore next */
            throw new Error(
              [error.message, getDeclarationSourceLocation(declaration)].join(
                '\n'
              )
            );
          } else {
            throw error;
          }
        }
      })
    );
  } else {
    return '';
  }
}
