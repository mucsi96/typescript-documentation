import { DeclarationReflection } from 'typedoc';
import { IntrinsicType } from 'typedoc/dist/lib/models';

export function renderType(reflection: DeclarationReflection): string[] {
  if (reflection.type instanceof IntrinsicType) {
    return [`\`${reflection.type.name}\``];
  }

  return [];
}
