import { IntrinsicType, Type } from 'typedoc/dist/lib/models';

export function renderTypeInfo(type?: Type): string {
  if (type instanceof IntrinsicType) {
    return type.name;
  }

  return '';
}
