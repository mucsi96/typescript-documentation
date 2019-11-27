import { DeclarationReflection } from 'typedoc';
import { renderVariable } from './variable';
import { renderFunction } from './function';
import { renderClass } from './class';

export function renderReflection(reflection: DeclarationReflection): string[] {
  switch (reflection.kindString) {
    case 'Class':
      return renderClass(reflection);
    case 'Function':
      return renderFunction(reflection);
    case 'Variable':
      return renderVariable(reflection);
    default:
      return [];
  }
}
