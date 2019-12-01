import { TypeFlags, Type, TypeChecker, UnionType } from 'typescript';

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

  // if (type instanceof IntrinsicType) {
  //   return type.name;
  // }
  // /* istanbul ignore else */
  // if (type instanceof UnionType) {
  //   return type.types
  //     .map(type => render(type))
  //     .filter(name => name !== 'undefined' && name !== 'false')
  //     .join(' | ');
  // }

  /* istanbul ignore next */
  throw new Error(`Not supported type ${typeChecker.typeToString(nonOptionalType)}`);
}
