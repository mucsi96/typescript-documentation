import { ObjectFlags, Type, TypeFlags, TypeReference } from 'typescript';
import { Context } from '../context';
import { findExactMatchingTypeFlag, inspectObject } from '../utils';
import { renderTypeDeclaration } from './declaration';
import { isOptionalBoolean } from './utils';

export function getTypeTitle(type: Type, context: Context): string {
  const flags = type.getFlags();
  const objectFlags = (type as TypeReference).objectFlags;

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
        .map((type, _index, types) =>
          renderTypeDeclaration(type, context, { noWrap: types.length === 1 })
        )
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

  /* istanbul ignore else */
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
