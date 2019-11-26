import { DeclarationReflection } from 'typedoc';
import { renderVariable } from './variable';
import { renderFunction } from './function';

export function renderReflection(reflection: DeclarationReflection): string[] {
  switch (reflection.kindString) {
    case 'Function':
      return renderFunction(reflection);
    case 'Variable':
      return renderVariable(reflection);
    default:
      return [];
  }
}
