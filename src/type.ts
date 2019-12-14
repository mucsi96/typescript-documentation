import { TypeFlags, Type, Symbol, ObjectFlags, TypeReference } from 'typescript';
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
  return type.isUnion() && type.types.some(type => type.getFlags() & TypeFlags.Undefined);
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

function isArrayType(type: Type): boolean {
  const name = type.symbol && type.symbol.getName();

  return (
    !!(type.getFlags() & TypeFlags.Object) &&
    !!((type as TypeReference).objectFlags & ObjectFlags.Reference) &&
    name === 'Array'
  );
}

function getArrayType(type: Type): Type | undefined {
  const typeArguments = (type as TypeReference).typeArguments;

  return typeArguments && typeArguments[0];
}

function renderTypeName(
  name: string,
  options: { isArray?: boolean; isReference?: boolean } = {}
): string {
  const fullName = `\`${name}${options.isArray ? '[]' : ''}\``;

  if (options.isReference) {
    return `[${fullName}](#${slugifyTypeName(name)})`;
  }

  return fullName;
}

export function renderType(
  type: Type,
  context: Context,
  options: { isArray?: boolean } = {}
): string {
  const flags = type.getFlags();
  const name = type.symbol && type.symbol.getName();

  if (flags & TypeFlags.Number) {
    return renderTypeName('number', options);
  }

  if (flags & TypeFlags.String) {
    return renderTypeName('string', options);
  }

  if (flags & TypeFlags.Boolean || isOptionalBoolean(type)) {
    return renderTypeName('boolean', options);
  }

  if (flags & TypeFlags.Void) {
    return renderTypeName('void', options);
  }

  if (flags & TypeFlags.Any) {
    return renderTypeName('any', options);
  }

  if (flags & TypeFlags.Null) {
    return renderTypeName('null', options);
  }

  if (flags & TypeFlags.EnumLiteral) {
    return renderTypeName(name, options);
  }

  if (type.isUnion()) {
    return type.types
      .filter(type => !(type.getFlags() & TypeFlags.Undefined))
      .map(type => renderType(type, context))
      .join(' | ');
  }

  if (type.aliasSymbol) {
    return renderTypeName(type.aliasSymbol.getName(), {
      ...options,
      isReference: context.exportedSymbols.includes(type.aliasSymbol)
    });
  }

  if (isArrayType(type)) {
    const arrayType = getArrayType(type);

    if (arrayType) {
      return renderType(arrayType || [], context, { ...options, isArray: true });
    } else {
      return renderTypeName('', { isArray: true });
    }
  }

  if (flags & TypeFlags.Object) {
    return renderTypeName(name, {
      ...options,
      isReference: context.exportedSymbols.includes(type.symbol)
    });
  }

  /* istanbul ignore else */
  if (type.isStringLiteral()) {
    return renderTypeName(`'${type.value}'`, options);
  }

  /* istanbul ignore next */
  throw new Error(
    `Not supported type ${inspectObject(type)} with flags "${findExactMatchingTypeFlag(flags)}"`
  );
}
