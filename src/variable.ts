import { DeclarationReflection } from 'typedoc';
import { renderHeading } from './heading';
import { renderType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';

export function renderVariable(reflection: DeclarationReflection): string[] {
  return [
    ...renderHeading(reflection.name),
    ...renderDescription(reflection),
    '*TYPE*',
    ...renderType(reflection),
    ...renderExamples(reflection),
    ...renderAdditionalLinks(reflection)
  ];
}
