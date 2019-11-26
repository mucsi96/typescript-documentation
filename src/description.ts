import { Reflection } from 'typedoc';

export function renderDescription(reflection: Reflection): string[] {
  if (reflection.comment) {
    return [reflection.comment.shortText];
  }

  return [];
}
