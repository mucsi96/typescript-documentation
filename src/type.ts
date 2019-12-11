import { TypeFlags, Type, TypeChecker, Symbol } from 'typescript';
import { findExactMatchingTypeFlag } from './utils';
import slugify from '@sindresorhus/slugify';

export function getSymbolsType(symbol: Symbol, typeChecker: TypeChecker): Type {
  const declarations = symbol.getDeclarations();

  /* istanbul ignore if */
  if (!declarations) {
    throw new Error(`No declaration found for symbol ${symbol.getName()}`);
  }

  return typeChecker.getTypeOfSymbolAtLocation(symbol, declarations[0]);
}

export function isOptionalType(type: Type): boolean {
  return type.isUnion() && !!type.types.find(type => type.getFlags() & TypeFlags.Undefined);
}

export function renderType(type: Type, typeChecker: TypeChecker): string {
  const flags = type.getFlags();
  const name = type.symbol && type.symbol.getName();

  if (flags & TypeFlags.Number) {
    return 'number';
  }

  if (flags & TypeFlags.String) {
    return 'string';
  }

  if (flags & TypeFlags.Void) {
    return 'void';
  }

  if (flags & TypeFlags.EnumLiteral) {
    return name;
  }

  if (type.isUnion()) {
    return type.types
      .filter(type => !(type.getFlags() & TypeFlags.Undefined))
      .map(type => renderType(type, typeChecker))
      .join(' | ');
  }

  /* istanbul ignore else */
  if (type.aliasSymbol) {
    const aliasName = type.aliasSymbol.getName();

    return `[${aliasName}](#${slugify(aliasName)})`;
  }

  /* istanbul ignore next */
  throw new Error(
    `Not supported type with name "${name}" and flags "${findExactMatchingTypeFlag(flags)}"`
  );
}
