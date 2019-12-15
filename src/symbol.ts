import { Context } from './context';
import { Symbol, Type, SymbolFlags } from 'typescript';
import { joinSections } from './markdown';
import {
  getDeclarationSourceLocation,
  inspectObject,
  findExactMatchingSymbolFlags
} from './utils';
import { renderVariable } from './variable';
import { renderFunction } from './function';
import { renderClass } from './class';
import { renderTypeDeclaration } from './typeDeclaration';
import { renderEnumeration } from './enumeration';

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

export function renderSymbol(symbol: Symbol, context: Context): string {
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
          /* istanbul ignore next */
          throw new Error(
            [error.message, getDeclarationSourceLocation(declaration)].join(
              '\n'
            )
          );
        }
      })
    );
  } else {
    return '';
  }
}
