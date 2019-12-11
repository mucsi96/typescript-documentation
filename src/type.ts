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
    const symbol = type.getSymbol();

    /* istanbul ignore if */
    if (!symbol) {
      throw new Error(`Symbol not found for ${typeChecker.typeToString(type)}`);
    }

    return symbol.getName();
  }

  if (type.isUnion()) {
    return type.types
      .filter(type => !(type.getFlags() & TypeFlags.Undefined))
      .map(type => renderType(type, typeChecker))
      .join(' | ');
  }

  /* istanbul ignore else */
  if (type.aliasSymbol) {
    const name = type.aliasSymbol.getName();

    return `[${name}](#${slugify(name)})`;
  }

  /* istanbul ignore next */
  throw new Error(`Not supported type with flags ${findExactMatchingTypeFlag(flags)}`);
}
