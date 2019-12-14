import { TypeFlags, Type, Symbol } from 'typescript';
import { findExactMatchingTypeFlag, inspectObject } from './utils';
import { Context } from './context';

function slugifyTypeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z\d]+/g, '');
}

export function getSymbolsType(symbol: Symbol, context: Context): Type {
  const declarations = symbol.getDeclarations();

  /* istanbul ignore if */
  if (!declarations) {
    throw new Error(`No declaration found for symbol ${symbol.getName()}`);
  }

  return context.typeChecker.getTypeOfSymbolAtLocation(symbol, declarations[0]);
}

export function isOptionalType(type: Type): boolean {
  return type.isUnion() && !!type.types.find(type => type.getFlags() & TypeFlags.Undefined);
}

export function isOptionalBoolean(type: Type): boolean {
  return (
    type.isUnion() &&
    type.types.length === 3 &&
    type.types.every(type => {
      const flags = type.getFlags();
      return flags & TypeFlags.Undefined || flags & TypeFlags.BooleanLiteral;
    })
  );
}

export function renderType(type: Type, context: Context): string {
  const flags = type.getFlags();
  const name = type.symbol && type.symbol.getName();

  if (flags & TypeFlags.Number) {
    return '`number`';
  }

  if (flags & TypeFlags.String) {
    return '`string`';
  }

  if (flags & TypeFlags.Boolean || isOptionalBoolean(type)) {
    return '`boolean`';
  }

  if (flags & TypeFlags.Void) {
    return '`void`';
  }

  if (flags & TypeFlags.Any) {
    return '`any`';
  }

  if (flags & TypeFlags.Null) {
    return '`null`';
  }

  if (flags & TypeFlags.EnumLiteral) {
    return `\`${name}\``;
  }

  if (type.isUnion()) {
    return type.types
      .filter(type => !(type.getFlags() & TypeFlags.Undefined))
      .map(type => renderType(type, context))
      .join(' | ');
  }

  if (type.aliasSymbol) {
    const aliasName = type.aliasSymbol.getName();

    if (context.exportedSymbols.includes(type.aliasSymbol)) {
      return `[\`${aliasName}\`](#${slugifyTypeName(aliasName)})`;
    } else {
      return `\`${aliasName}\``;
    }
  }

  if (flags & TypeFlags.Object) {
    if (type.symbol && context.exportedSymbols.includes(type.symbol)) {
      return `[\`${name}\`](#${slugifyTypeName(name)})`;
    } else {
      return `\`${name}\``;
    }
  }

  /* istanbul ignore else */
  if (type.isStringLiteral()) {
    return `\`'${type.value}'\``;
  }

  /* istanbul ignore next */
  throw new Error(
    `Not supported type ${inspectObject(type)} with flags "${findExactMatchingTypeFlag(flags)}"`
  );
}
