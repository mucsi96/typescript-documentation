import { IntrinsicType, Type } from 'typedoc/dist/lib/models';

export function renderType(type?: Type): string {
  if (type instanceof IntrinsicType) {
    return type.name;
  }

  return '';
}
