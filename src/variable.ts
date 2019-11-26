import { DeclarationReflection } from 'typedoc';
import { renderHeading } from './heading';
import { renderType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';

export function renderVariable(reflection: DeclarationReflection): string[] {
  return [
    ...renderHeading(reflection.name),
    ...renderDescription(reflection),
    '##### Type',
    ...renderType(reflection),
    ...renderExamples(reflection)
  ];
}
