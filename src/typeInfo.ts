import { IntrinsicType, Type, UnionType } from 'typedoc/dist/lib/models';

export function renderTypeInfo(type?: Type): string {
  if (type instanceof IntrinsicType) {
    return type.name;
  }
  /* istanbul ignore else */
  if (type instanceof UnionType) {
    return type.types
      .map(type => renderTypeInfo(type))
      .filter(name => name !== 'undefined' && name !== 'false')
      .join(' | ');
  }

  /* istanbul ignore next */
  throw new Error(`Not supported type ${type && type.type}`);
}
