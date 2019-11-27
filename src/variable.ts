import { DeclarationReflection } from 'typedoc';
import { renderTitle } from './title';
import { renderType } from './type';
import { renderDescription } from './description';
import { renderExamples } from './examples';
import { renderAdditionalLinks } from './additionalLinks';
import { renderSubSection } from './subSection';

export function renderVariable(reflection: DeclarationReflection): string[] {
  return [
    ...renderTitle(reflection.name),
    ...renderDescription(reflection),
    ...renderSubSection('Type'),
    `\`${renderType(reflection.type)}\``,
    ...renderExamples(reflection),
    ...renderAdditionalLinks(reflection),
    ''
  ];
}
