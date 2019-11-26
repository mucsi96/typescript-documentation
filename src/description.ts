import { DeclarationReflection } from 'typedoc';

export function renderDescription(reflection: DeclarationReflection): string[] {
  if (reflection.comment) {
    return [reflection.comment.shortText];
  }

  return [];
}
