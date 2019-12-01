import { TypeFlags, Type, TypeChecker, UnionType, Symbol } from 'typescript';
import { findExactMatchingTypeFlag } from './utils';

export function getSymbolsType(symbol: Symbol, typeChecker: TypeChecker): Type {
  const declarations = symbol.getDeclarations();

  if (!declarations) {
    throw new Error(`No declaration found for symbol ${symbol.getName()}`);
  }

  return typeChecker.getTypeOfSymbolAtLocation(symbol, declarations[0]);
}

export function isOptionalType(type: Type): boolean {
  return type.isUnion() && !!type.types.find(type => type.getFlags() & TypeFlags.Undefined);
}

function getNonOptionalType(type: Type): Type {
  if (type.isUnion()) {
    const filtered = type.types.filter(type => !(type.getFlags() & TypeFlags.Undefined));

    if (filtered === type.types) {
      return type;
    }

    if (filtered.length === 1) {
      return filtered[0];
    }

    return { ...type, types: filtered } as UnionType;
  }

  return type;
}

export function renderType(type: Type, typeChecker: TypeChecker): string {
  const nonOptionalType = getNonOptionalType(type);
  const flags = nonOptionalType.getFlags();

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

    if (!symbol) {
      throw new Error(`Symbol not found for ${typeChecker.typeToString(nonOptionalType)}`);
    }

    return symbol.getName();
  }

  /* istanbul ignore next */
  throw new Error(`Not supported type with flags ${findExactMatchingTypeFlag(flags)}`);
}
