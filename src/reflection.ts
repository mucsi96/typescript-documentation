import { DeclarationReflection } from 'typedoc';
import { renderVariable } from './variable';

export function renderReflection(reflection: DeclarationReflection): string[] {
  switch (reflection.kindString) {
    case 'Variable':
      return renderVariable(reflection);
    default:
      return [];
  }
}
