import {
  TypeFlags,
  Type,
  Symbol,
  ObjectFlags,
  TypeReference,
  __String,
  UnderscoreEscapedMap
} from 'typescript';
import {
  findExactMatchingTypeFlag,
  inspectObject,
  findMatchingTypeFlags,
  findMatchingObjectsFlags
} from './utils';
import { Context } from './context';
import { reference, listItem, inlineCode } from './markdown';

export function getSymbolsType(symbol: Symbol, context: Context): Type {
  const declarations = symbol.getDeclarations();

  /* istanbul ignore if */
  if (!declarations) {
    throw new Error(`No declaration found for symbol ${symbol.getName()}`);
  }

  return context.typeChecker.getTypeOfSymbolAtLocation(symbol, declarations[0]);
}

export function isFunctionSymbol(symbol: Symbol, context: Context): boolean {
  return !!getSymbolsType(symbol, context).getCallSignatures().length;
}

export function isOptionalType(type: Type): boolean {
  return (
    type.isUnion() &&
    type.types.some(type => type.getFlags() & TypeFlags.Undefined)
  );
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

function isReference(type: Type, context: Context): boolean {
  const isExportedTypeAlias =
    type.aliasSymbol && context.exportedSymbols.includes(type.aliasSymbol);
  const isExportedObject =
    !!(type.getFlags() & TypeFlags.Object) &&
    context.exportedSymbols.includes(type.symbol);

  return isExportedTypeAlias || isExportedObject;
}

function getTypeTitle(type: Type, context: Context): string {
  const flags = type.getFlags();
  const objectFlags = (type as TypeReference).objectFlags;

  console.log(findMatchingObjectsFlags(objectFlags));
  console.log(findMatchingTypeFlags(flags));

  if (type.aliasSymbol) {
    return type.aliasSymbol.getName();
  }

  if (flags & TypeFlags.Number) {
    return 'number';
  }

  if (flags & TypeFlags.String) {
    return 'string';
  }

  if (flags & TypeFlags.Boolean || isOptionalBoolean(type)) {
    return 'boolean';
  }

  if (flags & TypeFlags.Void) {
    return 'void';
  }

  if (flags & TypeFlags.Any) {
    return 'any';
  }

  if (flags & TypeFlags.Null) {
    return 'null';
  }

  if (type.isUnion()) {
    return (
      type.types
        .filter(type => !(type.getFlags() & TypeFlags.Undefined))
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .map(type => renderType(type, context))
        .join(' | ')
    );
  }

  if (
    flags & TypeFlags.EnumLiteral ||
    flags & TypeFlags.TypeParameter ||
    objectFlags & ObjectFlags.Interface ||
    objectFlags & ObjectFlags.Reference
  ) {
    return type.symbol && type.symbol.getName();
  }

  if (type.isStringLiteral()) {
    return `'${type.value}'`;
  }

  if (objectFlags & ObjectFlags.Anonymous) {
    return 'object';
  }

  /* istanbul ignore next */
  throw new Error(
    `Not supported type ${inspectObject(
      type
    )} with flags "${findExactMatchingTypeFlag(flags)}"`
  );
}

function renderTypeMembers(
  members: UnderscoreEscapedMap<Symbol>,
  context: Context
): string[] {
  let membersList: { name: string; type: Type }[] = [];

  members.forEach((value: Symbol, key: __String) => {
    membersList.push({
      name: key.toString(),
      type: getSymbolsType(value, context)
    });
  });

  return membersList.map(({ name, type }) =>
    listItem([name, ': ', renderType(type, context)].join(''))
  );
}

export function renderType(
  type: Type,
  context: Context,
  options: { isArray?: boolean } = {}
): string {
  const typeReference = type as TypeReference;
  const objectFlags = typeReference.objectFlags;
  const arrayType = isArrayType(type) && getArrayType(type);

  if (arrayType) {
    return renderType(arrayType, context, { isArray: true });
  }

  if (objectFlags & ObjectFlags.Anonymous && type.symbol.members) {
  }

  const title = getTypeTitle(type, context);
  const typeArguments = (typeReference.typeArguments || [])
    .map(typeArgument => renderType(typeArgument, context))
    .join(', ');

  const result = [
    isReference(type, context) ? reference(title) : title,
    ...(typeArguments ? [`\\<${typeArguments}\\>`] : []),
    ...(options.isArray ? ['[]'] : [])
  ].join('');

  return [
    result,
    ...(objectFlags & ObjectFlags.Anonymous &&
    !isReference(type, context) &&
    type.symbol.members
      ? renderTypeMembers(type.symbol.members, context)
      : [])
  ].join('\n');
}
